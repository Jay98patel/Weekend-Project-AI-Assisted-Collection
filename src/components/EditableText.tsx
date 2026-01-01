import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { CheckIcon, XIcon } from './icons'
import styles from './EditableText.module.css'

type EditableTextProps = {
  value: string
  onSave: (value: string) => void
  label: string
  multiline?: boolean
  variant?: 'title' | 'body'
}

const EditableText = ({
  value,
  onSave,
  label,
  multiline = false,
  variant = 'body',
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isEditing) {
      setDraft(value)
    }
  }, [value, isEditing])

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const startEdit = () => {
    setIsEditing(true)
  }

  const cancelEdit = () => {
    setDraft(value)
    setIsEditing(false)
    buttonRef.current?.focus()
  }

  const saveEdit = () => {
    const nextValue = draft.trim() || value
    onSave(nextValue)
    setIsEditing(false)
    buttonRef.current?.focus()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      cancelEdit()
    }
    if (!multiline && event.key === 'Enter') {
      event.preventDefault()
      saveEdit()
    }
    if (multiline && event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault()
      saveEdit()
    }
  }

  return (
    <div className={styles.wrapper}>
      {isEditing ? (
        <>
          {multiline ? (
            <textarea
              ref={inputRef}
              className={`${styles.input} ${styles[variant]}`}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label={label}
              rows={3}
            />
          ) : (
            <input
              ref={inputRef}
              className={`${styles.input} ${styles[variant]}`}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label={label}
            />
          )}
          <div className={styles.actions}>
            <button className={styles.confirm} type="button" onClick={saveEdit} aria-label="Save">
              <CheckIcon />
            </button>
            <button className={styles.cancel} type="button" onClick={cancelEdit} aria-label="Cancel">
              <XIcon />
            </button>
          </div>
        </>
      ) : (
        <button
          ref={buttonRef}
          type="button"
          onClick={startEdit}
          className={`${styles.display} ${styles[variant]}`}
          aria-label={label}
        >
          {value}
        </button>
      )}
    </div>
  )
}

export default EditableText
