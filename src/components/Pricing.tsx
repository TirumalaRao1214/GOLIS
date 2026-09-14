import { PRICING_DATA } from '../config/site';
import { useReveal } from '../hooks';
import styles from './Pricing.module.css';

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function PricingCard({ plan, index }: { plan: typeof PRICING_DATA[number]; index: number }) {
  const handleNav = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div
      className={`${styles.card} ${plan.popular ? styles.popular : ''} reveal reveal-delay-${index + 1}`}
    >
      {plan.popular && <div className={styles.badge}>Most Popular</div>}

      <div className={styles.header}>
        <div className={styles.name}>{plan.name}</div>
        <div className={styles.priceNote}>{plan.priceNote}</div>
        <div className={styles.price}>{plan.price}</div>
      </div>

      <ul className={styles.features} aria-label={`${plan.name} plan features`}>
        {plan.features.map((f) => (
          <li key={f} className={styles.feature}>
            <span className={styles.check}><CheckIcon /></span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`btn ${plan.ctaVariant === 'solid' ? 'btn-primary' : 'btn-ghost'} ${styles.cta}`}
        onClick={(e) => { e.preventDefault(); handleNav(); }}
      >
        {plan.cta}
      </a>
    </div>
  );
}

export default function Pricing() {
  const ref = useReveal();

  return (
    <section className={`section ${styles.section}`} id="pricing" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">Transparent Pricing</div>
          <h2 className="section-title">Simple Packages.<br />Flexible Solutions.</h2>
          <p className="section-sub">
            Every business is different. Our packages are starting points — we'll tailor the right solution for you.
          </p>
        </div>

        <div className={styles.grid}>
          {PRICING_DATA.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        <p className={`${styles.note} reveal`}>
          Final pricing depends on project requirements.{' '}
          <a href="#contact" className={styles.noteLink} onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Get a custom quote →
          </a>
        </p>
      </div>
    </section>
  );
}
