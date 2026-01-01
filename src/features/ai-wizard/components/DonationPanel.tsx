import Button from '../../../components/Button'
import EditableText from '../../../components/EditableText'
import { TrashIcon, DonationIcon } from '../../../components/icons'
import styles from './DonationPanel.module.css'

type DonationPanelProps = {
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onDelete: () => void
}

const DonationPanel = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  onDelete,
}: DonationPanelProps) => {
  return (
    <div className={styles.panel} data-testid="donation-panel">
      <div className={styles.fields}>
        <EditableText
          value={title}
          onSave={onTitleChange}
          label="Donation title"
          variant="donation"
        />
        <EditableText
          value={description}
          onSave={onDescriptionChange}
          label="Donation description"
          variant="donation"
        />
      </div>
      <div className={styles.actions}>
        <Button className={styles.donateButton} size="sm" variant="secondary">
          Donate Now
        </Button>
      </div>
      <button className={styles.delete} type="button" onClick={onDelete} aria-label="Delete donation panel">
        <TrashIcon />
      </button>
    </div>
  )
}

export default DonationPanel
