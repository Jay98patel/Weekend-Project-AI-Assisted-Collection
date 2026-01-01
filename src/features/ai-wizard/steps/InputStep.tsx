import TopNav from '../../../components/TopNav'
import Chip from '../../../components/Chip'
import PromptInput from '../components/PromptInput'
import { useWizard } from '../WizardContext'
import styles from './InputStep.module.css'

type InputStepProps = {
  onSubmit: (prompt: string) => void
}

const suggestions = [
  { label: 'Christmas', prompt: 'I am collecting a group gift for Christmas' },
  { label: 'Baby Shower', prompt: 'I am collecting a group gift for a baby shower' },
  { label: 'Retirement', prompt: 'I am collecting a group gift for a retirement' },
  { label: 'Staff Giving', prompt: 'I am collecting a group gift for staff giving' },
]

const InputStep = ({ onSubmit }: InputStepProps) => {
  const { state, dispatch } = useWizard()

  const handleChipClick = (label: string, prompt: string) => {
    dispatch({ type: 'setCategory', category: label })
    dispatch({ type: 'setPrompt', prompt })
  }

  return (
    <div className={styles.page}>
      <TopNav
        left={{ label: 'Previous', to: '/collections/group-gifts' }}
        right={{ label: 'Back to Dashboard', to: '/dashboard' }}
      />
      <main className={styles.main}>
        <div className={styles.center}>
          <h1 className={styles.heading}>Hi Molly, I'll help you get started!</h1>
          <p className={styles.subtext}>
            Tell us about the group gift you're collecting for:
          </p>
          <div className={styles.inputWrap}>
            <PromptInput
              value={state.userPrompt}
              onChange={(value) => dispatch({ type: 'setPrompt', prompt: value })}
              onSubmit={() => onSubmit(state.userPrompt)}
              placeholder="I'm collecting a group gift for..."
              size="center"
              autoFocus
            />
          </div>
          <div className={styles.chips}>
            {suggestions.map((chip) => (
              <Chip
                key={chip.label}
                selected={state.category === chip.label}
                onClick={() => handleChipClick(chip.label, chip.prompt)}
              >
                {chip.label}
              </Chip>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default InputStep
