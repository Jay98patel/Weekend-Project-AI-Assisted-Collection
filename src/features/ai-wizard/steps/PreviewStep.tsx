import TopNav from '../../../components/TopNav'
import PromptInput from '../components/PromptInput'
import FeedbackPill from '../components/FeedbackPill'
import { useWizard } from '../WizardContext'
import styles from './PreviewStep.module.css'

type PreviewStepProps = {
  onClear: () => void
}

const PreviewStep = ({ onClear }: PreviewStepProps) => {
  const { state, dispatch } = useWizard()

  return (
    <div className={styles.page}>
      <TopNav
        left={{ label: 'Previous', to: '/collections/group-gifts/ai?step=input' }}
        right={{ label: 'Back to Dashboard', to: '/dashboard' }}
      />
      <main className={styles.main}>
        <h1 className="sr-only">Preview loading</h1>
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
          {state.feedback ? <FeedbackPill text={state.feedback} /> : <div className={styles.feedbackSkeleton} />}
        </div>
        <div className={styles.skeletonCard} data-testid="preview-skeleton">
          <div className={styles.skeletonHero} />
          <div className={styles.skeletonBody}>
            <div className={styles.skeletonLine} />
            <div className={styles.skeletonLineWide} />
          </div>
        </div>
        <div className={styles.skeletonDonation}>
          <div className={styles.skeletonDonationContent} />
        </div>

      </main>
    </div>
  )
}

export default PreviewStep
