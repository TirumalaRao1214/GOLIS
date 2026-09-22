import { useReveal } from '../../hooks';
import { AI_PRICING_DATA, SITE_CONFIG } from '../../config/site';
import { buildWhatsAppUrl } from '../../hooks';
import styles from './AIPricing.module.css';

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AIPricing() {
  const ref = useReveal();

  return (
    <section className={`section ${styles.section}`} id="ai-pricing" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">AI Pricing</div>
          <h2 className="section-title">AI Solution<br />Packages</h2>
          <p className="section-sub">
            AI solutions are priced based on your specific use case and requirements.
            We provide a custom proposal after understanding your business needs.
          </p>
        </div>

        <div className={styles.grid}>
          {AI_PRICING_DATA.map((plan, i) => {
            const waMessage = `Hi GOLIS, I am interested in the ${plan.name} AI package. Please tell me more.`;
            const waUrl = buildWhatsAppUrl(SITE_CONFIG.contact.whatsapp, waMessage);

            return (
              <div
                key={plan.id}
                className={`${styles.card} ${plan.popular ? styles.popular : ''} reveal reveal-delay-${i + 1}`}
              >
                {plan.popular && <div className={styles.badge}>Most Popular</div>}

                <div className={styles.header}>
                  <div className={styles.name}>{plan.name}</div>
                  <div className={styles.subtitle}>{plan.subtitle}</div>
                  <div className={styles.priceNote}>{plan.priceNote}</div>
                </div>

                <div className={styles.suitableLabel}>Suitable for:</div>
                <ul className={styles.features} aria-label={`${plan.name} suitable for`}>
                  {plan.suitable.map((f) => (
                    <li key={f} className={styles.feature}>
                      <span className={styles.check}><CheckIcon /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waUrl}
                  className={`btn ${plan.ctaVariant === 'solid' ? 'btn-primary' : 'btn-ghost'} ${styles.cta}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>

        <p className={`${styles.note} reveal`}>
          AI pricing depends on use case complexity, integrations and scale.{' '}
          <a
            href={buildWhatsAppUrl(SITE_CONFIG.contact.whatsapp, 'Hi GOLIS, I would like to get a custom AI solution proposal for my business.')}
            className={styles.noteLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get an AI Solution Proposal →
          </a>
        </p>
      </div>
    </section>
  );
}
