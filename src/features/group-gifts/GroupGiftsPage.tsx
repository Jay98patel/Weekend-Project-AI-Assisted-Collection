import TopNav from '../../components/TopNav'
import Button from '../../components/Button'
import { SparkleIcon, StarIcon } from '../../components/icons'
import { useNavigate } from 'react-router-dom'
import styles from './GroupGiftsPage.module.css'

type TemplateCard = {
  title: string
  author: string
  imageClass: string
  featured?: boolean
}

const templates: TemplateCard[] = [
  { title: 'Wedding Gift', author: 'By: Cheddar Up', imageClass: 'imageWedding' },
  { title: 'Secret! Baby Shower + Gift', author: 'By: Cheddar Up', imageClass: 'imageBaby' },
  { title: 'Volleyball Coach Gift', author: 'By: Cheddar Up', imageClass: 'imageVolley' },
  { title: 'Coworker Retirement Lunch + Gift', author: 'By: Cheddar Up', imageClass: 'imageRetirement' },
  { title: 'Staff Appreciation Superheroes', author: 'By: Cheddar Up', imageClass: 'imageStaff' },
  { title: 'Secret Santa Sign Up Sheet', author: 'By: Cheddar Up', imageClass: 'imageSanta', featured: true },
  { title: 'End-of-Year Staff Giving', author: 'By: Cheddar Up', imageClass: 'imageGiving', featured: true },
  { title: 'Birthday surprises!', author: 'By: Cheddar Up', imageClass: 'imageBirthday' },
]

const GroupGiftsPage = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <TopNav left={{ label: 'Previous', to: '/dashboard' }} right={{ label: 'Back to Dashboard', to: '/dashboard' }} />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <h1>Collection: Group Gifts</h1>
            <p>
              Collecting money for group gift is now easier than ever. Jump start your
              collection from the options below:
            </p>
          </div>

          <section className={styles.createSection}>
            <div className={styles.createCards}>
              <div className={styles.createCard}>
                <h3>Create from scratch</h3>
                <p>
                  You can jump right in and start building your collection from scratch.
                  Customize it exactly how you like!
                </p>
                <Button variant="primary" size="sm">Get Started</Button>
              </div>
              <div className={styles.createCard}>
                <h3>
                  Use AI to create <span className={styles.sparkle}><SparkleIcon /></span>
                </h3>
                <p>
                  Use our super cool new AI builder that can create a layout for you or
                  recommend existing templates
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate('/collections/group-gifts/ai?step=input')}
                  className={styles.tryAiButton}
                >
                  Try AI Creator
                </Button>
              </div>
            </div>
            <div className={styles.previewStack}>
              <div className={styles.previewCircle} />
              <div className={styles.previewCardSmall}>
                <div className={styles.previewHeader}>
                  <span>Build</span>
                  <span>Share</span>
                  <span>Manage</span>
                </div>
                <div className={styles.previewBody}>
                  <div className={styles.previewThumb} />
                  <div className={styles.previewText}>
                    <strong>Baby gift for Jill and Dan</strong>
                    <span>Contribution</span>
                  </div>
                  <Button variant="secondary" size="sm">Save</Button>
                </div>
              </div>
              <div className={styles.previewCardLarge}>
                <div className={styles.previewHeader}>
                  <span>Build</span>
                  <span>Share</span>
                  <span>Manage</span>
                </div>
                <div className={styles.previewThumbLarge} />
                <div className={styles.previewTotal}>$475.00</div>
                <Button variant="primary" size="sm">Withdraw</Button>
              </div>
            </div>
          </section>

          <section className={styles.templatesSection}>
            <div className={styles.templatesHeader}>
              <span>READY TO USE TEMPLATES</span>
              <button className={styles.sortButton} type="button">
                Sort: Free Templates
              </button>
            </div>
            <div className={styles.templatesGrid}>
              {templates.map((template) => (
                <div className={styles.templateCard} key={template.title}>
                  <div className={`${styles.templateImage} ${styles[template.imageClass]}`}>
                    {template.featured ? <span className={styles.star}><StarIcon /></span> : null}
                  </div>
                  <div className={styles.templateBody}>
                    <h4>{template.title}</h4>
                    <p>{template.author}</p>
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

export default GroupGiftsPage
