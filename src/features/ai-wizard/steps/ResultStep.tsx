import { useMemo } from 'react'
import TopNav from '../../../components/TopNav'
import PromptInput from '../components/PromptInput'
import FeedbackPill from '../components/FeedbackPill'
import { DonationIcon } from '../../../components/icons'
import { useWizard } from '../WizardContext'
import TemplatePreviewCard from '../components/TemplatePreviewCard'
import DonationPanel from '../components/DonationPanel'
import Button from '../../../components/Button'
import styles from './ResultStep.module.css'

type ResultStepProps = {
  onRetry: () => void
  onClear: () => void
}

const ResultStep = ({ onRetry, onClear }: ResultStepProps) => {
  const { state, dispatch } = useWizard()

  const selectedTemplate = useMemo(() => {
    return (
      state.templates.find((template) => template.id === state.selectedTemplateId) ??
      state.templates[0]
    )
  }, [state.templates, state.selectedTemplateId])

  const handleAddDonation = () => {
    dispatch({ type: 'setCustomDonationEnabled', enabled: true })
  }

  const handleRemoveDonation = () => {
    dispatch({ type: 'setCustomDonationEnabled', enabled: false })
  }

  return (
    <div className={styles.page}>
      <TopNav
        left={{ label: 'Previous', to: '/collections/group-gifts/ai?step=input' }}
        right={{ label: 'Back to Dashboard', to: '/dashboard' }}
      />
      <main className={styles.main}>
        <h1 className="sr-only">Collection result</h1>
        <div className={styles.promptRow}>
          <PromptInput
            value={state.userPrompt}
            onChange={(value) => dispatch({ type: 'setPrompt', prompt: value })}
            placeholder="I need a page that will help me collect donations for a wedding gift"
            showClear
            onClear={onClear}
            size="compact"
            autoFocus
          />
        </div>
        <div className={styles.feedbackRow}>
          {state.apiStatus === 'success' && state.feedback ? (
            <FeedbackPill text={state.feedback} />
          ) : null}
        </div>
        {state.apiStatus === 'error' ? (
          <div className={styles.errorBox} role="alert">
            <p>Something went wrong. Please try again.</p>
            <Button variant="primary" size="sm" onClick={onRetry}>
              Retry
            </Button>
          </div>
        ) : null}
        {state.apiStatus === 'success' && selectedTemplate ? (
          <>
            <TemplatePreviewCard
              template={selectedTemplate}
              onTitleSave={(value) =>
                dispatch({ type: 'setTemplateContent', id: selectedTemplate.id, title: value })
              }
              onDescriptionSave={(value) =>
                dispatch({
                  type: 'setTemplateContent',
                  id: selectedTemplate.id,
                  description: value,
                })
              }
              onImageSave={(value) =>
                dispatch({
                  type: 'setTemplateContent',
                  id: selectedTemplate.id,
                  image: value,
                })
              }
            />
            {!state.isCustomDonationEnabled ? (
              <button
                className={styles.addDonation}
                type="button"
                onClick={handleAddDonation}
                data-testid="add-donation"
              >
                <DonationIcon />
                <span>Add custom donation</span>
              </button>
            ) : null}
            {state.isCustomDonationEnabled ? (
              <DonationPanel
                title={state.donationTitle}
                description={state.donationDescription}
                onTitleChange={(value) => dispatch({ type: 'setDonationTitle', title: value })}
                onDescriptionChange={(value) =>
                  dispatch({ type: 'setDonationDescription', description: value })
                }
                onDelete={handleRemoveDonation}
              />
            ) : null}
          </>
        ) : null}
      </main>
    </div>
  )
}

export default ResultStep
