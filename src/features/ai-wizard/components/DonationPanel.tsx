import Button from '../../../components/Button'
import { TrashIcon } from '../../../components/icons'
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
        <input
          className={styles.titleInput}
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          aria-label="Donation title"
        />
        <textarea
          className={styles.descriptionInput}
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
          aria-label="Donation description"
          rows={2}
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
