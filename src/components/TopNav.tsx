import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from './icons'
import LogoMark from './LogoMark'
import styles from './TopNav.module.css'

type NavLink = {
  label: string
  to: string
}

type TopNavProps = {
  left?: NavLink
  right?: NavLink
  showLogo?: boolean
}

const TopNav = ({ left, right, showLogo = true }: TopNavProps) => {
  return (
    <header className={styles.nav}>
      <nav className={styles.inner} aria-label="Primary">
        <div className={styles.left}>
          {left ? (
            <Link className={styles.link} to={left.to}>
              <ChevronLeftIcon className={styles.icon} />
              <span>{left.label}</span>
            </Link>
          ) : null}
        </div>
        <div className={styles.right}>
          {right ? (
            <Link className={styles.link} to={right.to}>
              <span>{right.label}</span>
            </Link>
          ) : null}
          {showLogo ? <LogoMark className={styles.logo} variant="mono" /> : null}
        </div>
      </nav>
    </header>
  )
}

export default TopNav
