import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'

export type Template = {
  id: string
  title: string
  description: string
  image: string
  category: string
}

type ApiStatus = 'idle' | 'loading' | 'success' | 'error'

type WizardState = {
  userPrompt: string
  category: string | null
  apiStatus: ApiStatus
  templates: Template[]
  feedback: string
  selectedTemplateId: string | null
  isCustomDonationEnabled: boolean
  donationTitle: string
  donationDescription: string
  errorMessage: string
}

type WizardAction =
  | { type: 'setPrompt'; prompt: string }
  | { type: 'setCategory'; category: string | null }
  | { type: 'setApiStatus'; status: ApiStatus }
  | { type: 'setTemplates'; templates: Template[]; feedback: string }
  | { type: 'setSelectedTemplate'; templateId: string | null }
  | { type: 'setCustomDonationEnabled'; enabled: boolean }
  | { type: 'setDonationTitle'; title: string }
  | { type: 'setDonationDescription'; description: string }
  | { type: 'setTemplateContent'; id: string; title?: string; description?: string; image?: string }
  | { type: 'setError'; message: string }
  | { type: 'resetError' }

const defaultState: WizardState = {
  userPrompt: '',
  category: null,
  apiStatus: 'idle',
  templates: [
    {
      id: 'wedding-1',
      title: 'Group Gift Collection',
      description:
        'Contribute to a meaningful group gift that celebrates someone special and brings everyone together.',
      image:
        'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000',
      category: 'wedding',
    },
    {
      id: 'wedding-2',
      title: 'Honeymoon Fund',
      description:
        'Help the happy couple start their life together with an unforgettable honeymoon experience.',
      image:
        'https://images.unsplash.com/photo-1530021356-8968600d3d52?auto=format&fit=crop&q=80&w=2000',
      category: 'wedding',
    },
  ],
  feedback: '',
  selectedTemplateId: null,
  isCustomDonationEnabled: false,
  donationTitle: 'Donation Title',
  donationDescription: 'Donation description',
  errorMessage: '',
}

const STORAGE_KEY = 'ai-wizard-state'

const reducer = (state: WizardState, action: WizardAction): WizardState => {
  switch (action.type) {
    case 'setPrompt':
      return { ...state, userPrompt: action.prompt }
    case 'setCategory':
      return { ...state, category: action.category }
    case 'setApiStatus':
      return { ...state, apiStatus: action.status }
    case 'setTemplates':
      return {
        ...state,
        templates: action.templates,
        feedback: action.feedback,
        selectedTemplateId: action.templates[0]?.id ?? null,
        apiStatus: 'success',
        errorMessage: '',
        isCustomDonationEnabled: false,
        donationTitle: defaultState.donationTitle,
        donationDescription: defaultState.donationDescription,
      }
    case 'setSelectedTemplate':
      return { ...state, selectedTemplateId: action.templateId }
    case 'setCustomDonationEnabled':
      return {
        ...state,
        isCustomDonationEnabled: action.enabled,
        donationTitle: action.enabled ? state.donationTitle : defaultState.donationTitle,
        donationDescription: action.enabled
          ? state.donationDescription
          : defaultState.donationDescription,
      }
    case 'setDonationTitle':
      return { ...state, donationTitle: action.title }
    case 'setDonationDescription':
      return { ...state, donationDescription: action.description }
    case 'setTemplateContent':
      return {
        ...state,
        templates: state.templates.map((template) =>
          template.id === action.id
            ? {
                ...template,
                title: action.title ?? template.title,
                description: action.description ?? template.description,
                image: action.image ?? template.image,
              }
            : template
        ),
      }
    case 'setError':
      return { ...state, apiStatus: 'error', errorMessage: action.message }
    case 'resetError':
      return { ...state, errorMessage: '' }
    default:
      return state
  }
}

type WizardContextValue = {
  state: WizardState
  dispatch: Dispatch<WizardAction>
}

const WizardContext = createContext<WizardContextValue | undefined>(undefined)

const initState = () => {
  if (typeof window === 'undefined') {
    return defaultState
  }
  const stored = window.sessionStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return defaultState
  }
  try {
    const parsed = JSON.parse(stored) as WizardState
    const apiStatus = parsed.apiStatus === 'loading' ? 'idle' : parsed.apiStatus
    return { ...defaultState, ...parsed, apiStatus, errorMessage: '' }
  } catch {
    return defaultState
  }
}

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, defaultState, initState)

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.warn('Failed to save wizard state to session storage:', error)
    }
  }, [state])

  return (
    <WizardContext.Provider value={{ state, dispatch }}>
      {children}
    </WizardContext.Provider>
  )
}

export const useWizard = () => {
  const context = useContext(WizardContext)
  if (!context) {
    throw new Error('WizardProvider is missing')
  }
  return context
}
