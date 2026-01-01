import { ButtonHTMLAttributes } from 'react'
import styles from './Chip.module.css'

type ChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean
}

const Chip = ({ selected = false, className, type = 'button', ...rest }: ChipProps) => {
  const classes = [styles.chip, selected ? styles.selected : '', className]
    .filter(Boolean)
    .join(' ')

  return <button className={classes} aria-pressed={selected} type={type} {...rest} />
}

export default Chip
