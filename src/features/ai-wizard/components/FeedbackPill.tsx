import styles from './FeedbackPill.module.css'

type FeedbackPillProps = {
  text: string
}

const FeedbackPill = ({ text }: FeedbackPillProps) => {
  return <div className={styles.pill}>{text}</div>
}

export default FeedbackPill
