import { TRUST_FEATURES } from '../config/site';
import { useReveal } from '../hooks';
import styles from './Trust.module.css';

const ICONS = ['◉', '◈', '◎', '◉', '◈', '◎'];

export default function Trust() {
  const ref = useReveal();

  return (
    <section className={`section ${styles.section}`} id="trust" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">Built Right</div>
          <h2 className="section-title">Built for Businesses<br />That Want to Grow.</h2>
        </div>

        <div className={styles.grid}>
          {TRUST_FEATURES.map((f, i) => (
            <div key={f} className={`${styles.item} reveal reveal-delay-${Math.min(i+1,4)}`}>
              <div className={styles.icon} aria-hidden="true">{ICONS[i]}</div>
              <span className={styles.label}>{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
