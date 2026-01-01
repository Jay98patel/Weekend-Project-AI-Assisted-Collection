import Button from '../../../components/Button'
import EditableText from '../../../components/EditableText'
import type { Template } from '../WizardContext'
import styles from './TemplatePreviewCard.module.css'

type TemplatePreviewCardProps = {
  template: Template
  onTitleSave: (value: string) => void
  onDescriptionSave: (value: string) => void
}

const TemplatePreviewCard = ({
  template,
  onTitleSave,
  onDescriptionSave,
}: TemplatePreviewCardProps) => {
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
        <img src={template.image} alt="Template preview" />
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
