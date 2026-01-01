import TopNav from '../../../components/TopNav'
import LogoMark from '../../../components/LogoMark'
import PromptInput from '../components/PromptInput'
import { useWizard } from '../WizardContext'
import styles from './LoadingStep.module.css'

type LoadingStepProps = {
  onClear: () => void
}

const LoadingStep = ({ onClear }: LoadingStepProps) => {
  const { state, dispatch } = useWizard()

  return (
    <div className={styles.page}>
      <TopNav
        left={{ label: 'Previous', to: '/collections/group-gifts/ai?step=input' }}
        right={{ label: 'Back to Dashboard', to: '/dashboard' }}
      />
      <main className={styles.main}>
        <h1 className="sr-only">Generating collection</h1>
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
        <div className={styles.logoWrap} data-testid="loading-logo">
          <LogoMark className={styles.logo} size={90} variant="color" />
        </div>
      </main>
    </div>
  )
}

export default LoadingStep
