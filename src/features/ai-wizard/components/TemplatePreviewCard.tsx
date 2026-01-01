import { useRef, type ChangeEvent } from 'react'
import Button from '../../../components/Button'
import EditableText from '../../../components/EditableText'
import type { Template } from '../WizardContext'
import styles from './TemplatePreviewCard.module.css'

type TemplatePreviewCardProps = {
  template: Template
  onTitleSave: (value: string) => void
  onDescriptionSave: (value: string) => void
  onImageSave: (image: string) => void
}

const TemplatePreviewCard = ({
  template,
  onTitleSave,
  onDescriptionSave,
  onImageSave,
}: TemplatePreviewCardProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        onImageSave(result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.actions}>
        <Button className={styles.previewButton} variant="secondary" size="md">
          Preview
        </Button>
        <Button className={styles.tryButton} variant="primary" size="md">
          Try this out
        </Button>
      </div>
      <div className={styles.hero}>
        <button 
          type="button" 
          onClick={handleImageClick} 
          className={styles.heroButton}
          aria-label="Change banner image"
        >
          <img src={template.image} alt="Template preview" />
          <div className={styles.editOverlay}>
            <span>Click to change image</span>
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          aria-hidden="true"
        />
      </div>
      <div className={styles.content}>
        <EditableText
          value={template.title}
          onSave={onTitleSave}
          label="Edit title"
          variant="title"
        />
        <EditableText
          value={template.description}
          onSave={onDescriptionSave}
          label="Edit description"
          variant="description"
          multiline
        />
      </div>
    </div>
  )
}

export default TemplatePreviewCard
