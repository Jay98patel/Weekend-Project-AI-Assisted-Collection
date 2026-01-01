import TopNav from '../../components/TopNav'
import Button from '../../components/Button'
import { SparkleIcon, StarIcon } from '../../components/icons'
import { useNavigate } from 'react-router-dom'
import styles from './GroupGiftsPage.module.css'


import WeddingGiftImg from '../../assets/images/wedding-gift.png'
import BabyShowerImg from '../../assets/images/secrete-baby-shower-gift.png'
import VolleyballImg from '../../assets/images/volleyball-coach-gift.png'
import RetirementImg from '../../assets/images/coworker-retirement.png'
import StaffImg from '../../assets/images/staff-appreciation.png'
import SecretSantaImg from '../../assets/images/secrete-santa-signup-sheet.png'
import EndYearImg from '../../assets/images/end-of-year-staff-giving.png'
import BirthdayImg from '../../assets/images/birthday-surprise.png'

import GirlImg from '../../assets/images/girl.png'
import BearImg from '../../assets/images/bear.png'
import SelectedBearImg from '../../assets/images/selected-bear.png'

type TemplateCard = {
  title: string
  author: string
  image: string
  featured?: boolean
}

const templates: TemplateCard[] = [
  { title: 'Wedding Gift', author: 'By: Cheddar Up', image: WeddingGiftImg },
  { title: 'Secret! Baby Shower + Gift', author: 'By: Cheddar Up', image: BabyShowerImg },
  { title: 'Volleyball Coach Gift', author: 'By: Cheddar Up', image: VolleyballImg },
  { title: 'Coworker Retirement Lunch + Gift', author: 'By: Cheddar Up', image: RetirementImg },
  { title: 'Staff Appreciation Superheroes', author: 'By: Cheddar Up', image: StaffImg },
  { title: 'Secret Santa Sign Up Sheet', author: 'By: Cheddar Up', image: SecretSantaImg, featured: true },
  { title: 'End-of-Year Staff Giving', author: 'By: Cheddar Up', image: EndYearImg, featured: true },
  { title: 'Birthday surprises!', author: 'By: Cheddar Up', image: BirthdayImg },
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
            <div className={styles.leftColumn}>
              <div className={styles.sectionLabel}>CREATE FROM SCRATCH</div>
              <div className={styles.createCards}>
                <div className={styles.createCard}>
                  <h3>Create from scratch</h3>
                  <p>
                    You can jump right in and start building your collection from scratch.
                    Customize it exactly how you like!
                  </p>
                  <Button variant="primary" size="sm" className={styles.getStartedButton}>Get Started</Button>
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
            </div>
            
            <div className={styles.previewStack}>
              <div className={styles.girlContainer}>
                <img src={GirlImg} alt="" className={styles.girlImage} />
              </div>

              <div className={styles.previewCardsRow}>
                <div className={styles.previewCard}>
                  <div className={styles.cardHeader}>
                    <span className={styles.activeTab}>Build</span>
                    <span>Share</span>
                    <span>Manage</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.purpleHero}>
                      <img src={BearImg} alt="Bear" className={styles.bearImg} />
                    </div>
                    <div className={styles.cardContent}>
                      <h4>Baby gift for<br />Jill and Dan</h4>
                      <p className={styles.contributionLabel}>Contribution:</p>
                      <div className={styles.radioOption}>
                        <div className={styles.radioUnchecked} />
                        <span>Exact Amount</span>
                      </div>
                      <div className={styles.radioOption}>
                        <div className={styles.radioChecked}><span className={styles.checkIcon}>✓</span></div>
                        <span>Any Amount</span>
                      </div>
                      <Button variant="secondary" size="sm" className={styles.saveBtn}>Save</Button>
                    </div>
                  </div>
                </div>

                <div className={styles.previewCard}>
                  <div className={styles.cardHeader}>
                    <span>Build</span>
                    <span>Share</span>
                    <span className={styles.activeTab}>Manage</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.purpleHero}>
                      <img src={SelectedBearImg} alt="Bear" className={styles.bearImg} />
                    </div>
                    <div className={styles.cardContent}>
                      <p className={styles.officeLabel}>From the office</p>
                      <div className={styles.priceTag}>$475.00</div>
                      
                      <div className={styles.avatarsRow}>
                         <div className={styles.avatarImg} /> 
                         <div className={styles.avatarImg} /> 
                         <div className={styles.avatarImg} /> 
                         <div className={styles.avatarCount}>+36</div>
                      </div>

                      <Button variant="primary" size="sm" className={styles.withdrawBtn}>Withdraw</Button>
                    </div>
                  </div>
                </div>
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
                  <div className={styles.templateImage}>
                    <img src={template.image} alt={template.title} />
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
