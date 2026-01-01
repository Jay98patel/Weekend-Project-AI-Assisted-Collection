import { Link } from 'react-router-dom'
import GiftIcon from '../../assets/icons/gift.svg'
import FormIcon from '../../assets/icons/form.svg'
import RecurringPaymentsIcon from '../../assets/icons/recurring-payments.svg'
import EventTicketsIcon from '../../assets/icons/event-tickets.svg'
import CustomAllInOneIcon from '../../assets/icons/custom-all-in-one.svg'
import FlatDonationsIcon from '../../assets/icons/flat-donations.svg'
import ProductSalesIcon from '../../assets/icons/product-sales.svg'
import ActivityBasedIcon from '../../assets/icons/activity-based.svg'
import LearnMoreIcon from '../../assets/icons/learn-more.svg'
import OnlineShopIcon from '../../assets/icons/online-shop.svg'
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
    icon: OnlineShopIcon,
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
    icon: RecurringPaymentsIcon,
  },
  {
    title: 'Event Tickets',
    description: 'Sell tickets and accept payments',
    pro: true,
    icon: EventTicketsIcon,
  },
  {
    title: 'Custom All-in-One',
    description: 'Sell or collect anything (items, tickets, forms, etc.)',
    pro: true,
    icon: CustomAllInOneIcon,
  },
]

const fundraiserTiles: Tile[] = [
  {
    title: 'Flat Donations',
    description: 'Supporters to contribute a one-time donation',
    icon: FlatDonationsIcon,
  },
  {
    title: 'Product Sales',
    description: 'Supporters purchase from an online sales catalog',
    icon: ProductSalesIcon,
  },
  {
    title: 'Activity-based "Athon"',
    description: 'Supporters pledge amount per participant activity',
    icon: ActivityBasedIcon,
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
                    <div className={styles.cardHeader}>
                      <div className={styles.icon}>
                        {tile.icon ? (
                          <img src={tile.icon} alt="" width={24} height={24} />
                        ) : (
                          <span className={styles.iconMark} />
                        )}
                      </div>
                      <div className={styles.cardTitleRow}>
                        <h3>{tile.title}</h3>
                        {tile.pro ? <span className={styles.proPill}>Pro plan</span> : null}
                      </div>
                    </div>
                    <p className={styles.description}>{tile.description}</p>
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
                <img src={LearnMoreIcon} alt="" className={styles.infoDot} />
                Learn more
              </button>
            </div>
            <div className={styles.grid}>
              {fundraiserTiles.map((tile) => (
                <div className={styles.card} key={tile.title}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconAlt}>
                      {tile.icon ? (
                        <img src={tile.icon} alt="" width={32} height={32} />
                      ) : (
                        <span className={styles.iconMarkAlt} />
                      )}
                    </div>
                    <div className={styles.cardTitleRow}>
                      <h3>{tile.title}</h3>
                    </div>
                  </div>
                  <p className={styles.description}>{tile.description}</p>
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
