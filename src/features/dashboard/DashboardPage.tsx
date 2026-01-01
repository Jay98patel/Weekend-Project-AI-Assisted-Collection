import { Link } from 'react-router-dom'
import GiftIcon from '../../assets/icons/gift.svg'
import FormIcon from '../../assets/icons/form.svg'
import TopNav from '../../components/TopNav'
import styles from './DashboardPage.module.css'

type Tile = {
  title: string
  description: string
  pro?: boolean
  to?: string
  icon?: string
}

const collectionTiles: Tile[] = [
  {
    title: 'Online Shop',
    description: 'Sell items online to optimize sales',
  },
  {
    title: 'Group Gifts',
    description: 'Easily collect money for group gifts',
    to: '/collections/group-gifts',
    icon: GiftIcon,
  },
  {
    title: 'Forms',
    description: 'Sign ups, forms, and waivers without payments',
    icon: FormIcon,
  },
  {
    title: 'Recurring Payments',
    description: 'Membership registration or subscription dues',
  },
  {
    title: 'Event Tickets',
    description: 'Sell tickets and accept payments',
    pro: true,
  },
  {
    title: 'Custom All-in-One',
    description: 'Sell or collect anything (items, tickets, forms, etc.)',
    pro: true,
  },
]

const fundraiserTiles: Tile[] = [
  {
    title: 'Flat Donations',
    description: 'Supporters to contribute a one-time donation',
  },
  {
    title: 'Product Sales',
    description: 'Supporters purchase from an online sales catalog',
  },
  {
    title: 'Activity-based "Athon"',
    description: 'Supporters pledge amount per participant activity',
  },
]

const DashboardPage = () => {
  return (
    <div className={styles.page}>
      <TopNav left={{ label: 'Back to Dashboard', to: '/dashboard' }} showLogo />
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.heading}>What would you like to build today?</h1>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>COLLECTION</span>
            </div>
            <div className={styles.grid}>
              {collectionTiles.map((tile) => {
                const cardContent = (
                  <>
                    <div className={styles.icon}>
                      {tile.icon ? (
                        <img src={tile.icon} alt="" width={24} height={24} />
                      ) : (
                        <span className={styles.iconMark} />
                      )}
                    </div>
                    <div className={styles.cardText}>
                      <div className={styles.cardTitleRow}>
                        <h3>{tile.title}</h3>
                        {tile.pro ? <span className={styles.proPill}>Pro plan</span> : null}
                      </div>
                      <p>{tile.description}</p>
                    </div>
                  </>
                )

                return tile.to ? (
                  <Link className={styles.card} key={tile.title} to={tile.to}>
                    {cardContent}
                  </Link>
                ) : (
                  <div className={styles.card} key={tile.title}>
                    {cardContent}
                  </div>
                )
              })}
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>FUNDRAISER</span>
              <button className={styles.learnMore} type="button">
                <span className={styles.infoDot}>?</span>
                Learn more
              </button>
            </div>
            <div className={styles.grid}>
              {fundraiserTiles.map((tile) => (
                <div className={styles.card} key={tile.title}>
                  <div className={styles.iconAlt}>
                    <span className={styles.iconMarkAlt} />
                  </div>
                  <div className={styles.cardText}>
                    <div className={styles.cardTitleRow}>
                      <h3>{tile.title}</h3>
                    </div>
                    <p>{tile.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
