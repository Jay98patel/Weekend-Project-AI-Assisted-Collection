import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { DoneIcon, CancelIcon } from './icons'
import styles from './EditableText.module.css'

type EditableTextProps = {
  value: string
  onSave: (value: string) => void
  label: string
  multiline?: boolean
  variant?: 'title' | 'description' | 'donation' | 'body'
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

  if (variant === 'title') {
    return (
      <div className={styles.wrapper}>
        {isEditing ? (
          <div className={styles.titleInputWrapper}>
            <input
              ref={inputRef as React.Ref<HTMLInputElement>}
              className={styles.titleInput}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label={label}
            />
            <div className={styles.titleActions}>
              <button className={`${styles.iconButton} ${styles.confirm}`} type="button" onClick={saveEdit} aria-label="Save">
                <DoneIcon />
              </button>
              <button className={`${styles.iconButton} ${styles.cancel}`} type="button" onClick={cancelEdit} aria-label="Cancel">
                <CancelIcon />
              </button>
            </div>
          </div>
        ) : (
          <button
            ref={buttonRef}
            type="button"
            onClick={startEdit}
            className={`${styles.display} ${styles.title}`}
            aria-label={label}
          >
            {value}
          </button>
        )}
      </div>
    )
  }

  if (variant === 'description') {
    return (
      <div className={styles.wrapper}>
        {isEditing ? (
          <div className={styles.descriptionWrapper}>
            <textarea
              ref={inputRef as React.Ref<HTMLTextAreaElement>}
              className={styles.descriptionInput}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label={label}
              rows={4}
            />
            <div>
              <button className={styles.saveButton} type="button" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        ) : (
          <button
            ref={buttonRef}
            type="button"
            onClick={startEdit}
            className={`${styles.display} ${styles.body}`}
            aria-label={label}
          >
            {value}
          </button>
        )}
      </div>
    )
  }

  if (variant === 'donation') {
    return (
      <div className={styles.wrapper}>
        {isEditing ? (
          <div className={styles.donationWrapper}>
            {multiline ? (
              <textarea
                ref={inputRef as React.Ref<HTMLTextAreaElement>}
                className={styles.donationInput}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={onKeyDown}
                aria-label={label}
                rows={3}
              />
            ) : (
              <input
                ref={inputRef as React.Ref<HTMLInputElement>}
                className={styles.donationInput}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={onKeyDown}
                aria-label={label}
              />
            )}
            <div className={styles.titleActions}>
              <button className={`${styles.iconButton} ${styles.confirm}`} type="button" onClick={saveEdit} aria-label="Save">
                <DoneIcon style={{ width: 22, height: 22 }} />
              </button>
              <button className={`${styles.iconButton} ${styles.cancel}`} type="button" onClick={cancelEdit} aria-label="Cancel">
                <CancelIcon style={{ width: 22, height: 22 }} />
              </button>
            </div>
          </div>
        ) : (
          <button
            ref={buttonRef}
            type="button"
            onClick={startEdit}
            className={`${styles.display} ${styles[variant]}`}
            aria-label={label}
          >
            {value || <span style={{ color: '#999', fontStyle: 'italic' }}>Click to edit</span>}
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {isEditing ? (
        <>
          {multiline ? (
            <textarea
              ref={inputRef as React.Ref<HTMLTextAreaElement>}
              className={`${styles.input} ${styles[variant]}`}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label={label}
              rows={3}
            />
          ) : (
            <input
              ref={inputRef as React.Ref<HTMLInputElement>}
              className={`${styles.input} ${styles[variant]}`}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onKeyDown}
              aria-label={label}
            />
          )}
           <div className={styles.titleActions}>
            <button className={`${styles.iconButton} ${styles.confirm}`} type="button" onClick={saveEdit} aria-label="Save">
              <DoneIcon />
            </button>
            <button className={`${styles.iconButton} ${styles.cancel}`} type="button" onClick={cancelEdit} aria-label="Cancel">
              <CancelIcon />
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
          {value || <span style={{ color: '#999', fontStyle: 'italic' }}>Click to edit</span>}
        </button>
      )}
    </div>
  )
}

export default EditableText

