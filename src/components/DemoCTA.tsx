import { useReveal } from '../hooks';
import styles from './DemoCTA.module.css';

export default function DemoCTA() {
  const ref = useReveal();

  const handleNav = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={`section ${styles.section}`} id="demo" ref={ref}>
      <div className="container">
        <div className={`${styles.inner} reveal`}>
          <div className={styles.content}>
            <div className="eyebrow">Free Website Demo</div>
            <h2 className={styles.title}>Want to See Your<br />Business Online?</h2>
            <p className={styles.text}>
              Tell us about your business and GOLIS can create a quick homepage concept to show
              you how your online presence could look.
            </p>
            <a href="#contact" className={`btn btn-primary btn-lg`} onClick={(e) => { e.preventDefault(); handleNav(); }}>
              Request a Free Website Demo
            </a>
          </div>

          <div className={styles.visual} aria-hidden="true">
            <div className={styles.browser}>
              <div className={styles.browserBar}>
                <span /><span /><span />
                <div className={styles.url}>yourbusiness.com</div>
              </div>
              <div className={styles.browserBody}>
                <div className={styles.heroSection}>
                  <div className={styles.brandBadge}>Your Business</div>
                  <div className={styles.h1Line} />
                  <div className={styles.pLine} />
                  <div className={styles.pLineSm} />
                  <div className={styles.ctaRow}>
                    <div className={styles.ctaBtn} />
                    <div className={styles.ctaBtnOut} />
                  </div>
                </div>
                <div className={styles.cardsRow}>
                  {[0,1,2].map(i => (
                    <div key={i} className={styles.card}>
                      <div className={styles.cardImg} />
                      <div className={styles.cardLine} />
                      <div className={styles.cardLineSm} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.glow} />
          </div>
        </div>
      </div>
    </section>
  );
}
