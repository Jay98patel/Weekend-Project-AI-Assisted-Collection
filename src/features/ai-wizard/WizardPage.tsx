import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useWizard } from './WizardContext'
import InputStep from './steps/InputStep'
import LoadingStep from './steps/LoadingStep'
import PreviewStep from './steps/PreviewStep'
import ResultStep from './steps/ResultStep'
import styles from './WizardPage.module.css'

type WizardStep = 'input' | 'loading' | 'preview' | 'result'

type SubmittedPayload = {
  prompt: string
  category: string | null
}

const stepOrder: WizardStep[] = ['input', 'loading', 'preview', 'result']

const WizardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { state, dispatch } = useWizard()
  const requestIdRef = useRef(0)
  const previewStartRef = useRef<number | null>(null)
  const loadingTimeoutRef = useRef<number | null>(null)
  const controllerRef = useRef<AbortController | null>(null)
  const submittedRef = useRef<SubmittedPayload | null>(null)
  const hasRequestedRef = useRef(false)

  const stepParam = searchParams.get('step')
  const step = useMemo<WizardStep>(() => {
    if (stepParam && stepOrder.includes(stepParam as WizardStep)) {
      return stepParam as WizardStep
    }
    return 'input'
  }, [stepParam])

  const setStep = useCallback(
    (next: WizardStep, replace = false) => {
      const nextParams = new URLSearchParams(searchParams)
      nextParams.set('step', next)
      setSearchParams(nextParams, { replace })
    },
    [searchParams, setSearchParams]
  )

  useEffect(() => {
    if (!stepParam || !stepOrder.includes(stepParam as WizardStep)) {
      setStep('input', true)
    }
  }, [stepParam, setStep])

  const startGeneration = useCallback(
    async (prompt: string, category: string | null) => {
      if (!prompt.trim()) {
        setStep('input', true)
        return
      }

      requestIdRef.current += 1
      const requestId = requestIdRef.current
      controllerRef.current?.abort()
      const controller = new AbortController()
      controllerRef.current = controller

      dispatch({ type: 'setApiStatus', status: 'loading' })
      dispatch({ type: 'resetError' })

      try {
        const response = await fetch('/api/ai/generate-collection', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userPrompt: prompt,
            category: category ?? undefined,
          }),
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Request failed')
        }

        const data = await response.json()
        if (requestId !== requestIdRef.current) {
          return
        }
        dispatch({ type: 'setTemplates', templates: data.templates, feedback: data.feedback })
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }
        dispatch({ type: 'setError', message: 'Something went wrong. Please try again.' })
      }
    },
    [dispatch, setStep]
  )

  useEffect(() => {
    if (step !== 'loading') {
      hasRequestedRef.current = false
      return
    }

    if (hasRequestedRef.current) {
      return
    }

    hasRequestedRef.current = true
    const payload = submittedRef.current ?? {
      prompt: state.userPrompt,
      category: state.category,
    }
    startGeneration(payload.prompt, payload.category)

    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current)
    }
    loadingTimeoutRef.current = window.setTimeout(() => {
      setStep('preview')
    }, 600)

    return () => {
      if (loadingTimeoutRef.current) {
        window.clearTimeout(loadingTimeoutRef.current)
      }
    }
  }, [setStep, startGeneration, state.category, state.userPrompt, step])

  useEffect(() => {
    if (step === 'preview') {
      previewStartRef.current = Date.now()
    }
  }, [step])

  useEffect(() => {
    if (step !== 'preview') {
      return
    }
    if (state.apiStatus !== 'success' && state.apiStatus !== 'error') {
      return
    }

    const started = previewStartRef.current ?? Date.now()
    const elapsed = Date.now() - started
    const delay = Math.max(400 - elapsed, 0)

    const timeout = window.setTimeout(() => {
      setStep('result')
    }, delay)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [setStep, state.apiStatus, step])

  const handleSubmit = useCallback(
    (prompt: string) => {
      submittedRef.current = { prompt, category: state.category }
      dispatch({ type: 'setPrompt', prompt })
      setStep('loading')
    },
    [dispatch, setStep, state.category]
  )

  const handleRetry = useCallback(() => {
    submittedRef.current = { prompt: state.userPrompt, category: state.category }
    setStep('loading')
  }, [setStep, state.category, state.userPrompt])

  const handleClear = useCallback(() => {
    dispatch({ type: 'setPrompt', prompt: '' })
    dispatch({ type: 'setCategory', category: null })
  }, [dispatch])

  return (
    <div className={styles.page}>
      {step === 'input' ? <InputStep onSubmit={handleSubmit} /> : null}
      {step === 'loading' ? <LoadingStep onClear={handleClear} /> : null}
      {step === 'preview' ? <PreviewStep onClear={handleClear} /> : null}
      {step === 'result' ? <ResultStep onRetry={handleRetry} onClear={handleClear} /> : null}
    </div>
  )
}

export default WizardPage
