import { FormEvent } from 'react'
import { XIcon } from '../../../components/icons'
import styles from './PromptInput.module.css'

type PromptInputProps = {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
  placeholder?: string
  showClear?: boolean
  onClear?: () => void
  size?: 'center' | 'compact'
  disabled?: boolean
  autoFocus?: boolean
}

const PromptInput = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  showClear = false,
  onClear,
  size = 'center',
  disabled = false,
  autoFocus = false,
}: PromptInputProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit?.()
  }

  return (
    <form className={`${styles.form} ${styles[size]}`} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Prompt input"
        disabled={disabled}
        autoFocus={autoFocus}
      />
      {showClear && value.length > 0 ? (
        <button
          type="button"
          className={styles.clear}
          onClick={onClear}
          aria-label="Clear prompt"
        >
          <XIcon />
        </button>
      ) : null}
    </form>
  )
}

export default PromptInput
