import { useReveal } from '../hooks';
import styles from './About.module.css';

const JOURNEY = [
  'Website',
  'AI-Powered Website',
  'WhatsApp Automation',
  'AI Chatbot / Agent',
  'Custom Application',
  'Full Business Automation',
];

const CAPABILITIES = [
  'Modern Web Development',
  'AI Solutions',
  'Business Automation',
  'API Integration',
  'Custom Software',
  'Mobile Applications',
];

export default function About() {
  const ref = useReveal();

  return (
    <section className={`section ${styles.section}`} id="about" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.content}>
            <div className={`reveal`}>
              <div className="eyebrow">About GOLIS</div>
              <h2 className="section-title">Technology That Makes<br />Business Smarter.</h2>
              <p className={styles.text}>
                GOLIS builds digital experiences, business applications and AI-powered automation
                for businesses that want to grow, simplify operations and serve customers better.
                We work with you as a long-term technology partner — not just a one-off developer.
              </p>
              <p className={styles.text}>
                Your business can start with a website today and evolve into a fully automated,
                AI-powered operation over time.
              </p>
              <div className={styles.capabilities}>
                {CAPABILITIES.map((c) => (
                  <span key={c} className={styles.capTag}>{c}</span>
                ))}
              </div>
            </div>

            <div className={`${styles.journey} reveal`}>
              <div className={styles.journeyLabel}>Your Digital Journey</div>
              {JOURNEY.map((step, i) => (
                <div key={step} className={styles.journeyStep}>
                  <div className={styles.journeyDot} />
                  {i < JOURNEY.length - 1 && <div className={styles.journeyLine} />}
                  <span className={styles.journeyText}>{step}</span>
                </div>
              ))}
            </div>

            <div className="reveal">
              <a
                href="#contact"
                className="btn btn-primary btn-lg"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Work With GOLIS
              </a>
            </div>
          </div>

          <div className={`${styles.visual} reveal`}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.statNum}>100%</div>
                <div className={styles.statLabel}>Mobile-First</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>7–14</div>
                <div className={styles.statLabel}>Day Delivery</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.statNum}>∞</div>
                <div className={styles.statLabel}>Scalability</div>
              </div>
            </div>

            <div className={styles.industries}>
              {[
                'Restaurants','Cafes','Salons','Spas','Gyms',
                'Clinics','Real Estate','Boutiques','Jewellery',
                'Photographers','Event Planners','Coaching',
              ].map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
