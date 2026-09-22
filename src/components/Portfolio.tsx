import { PORTFOLIO_DATA } from '../config/site';
import { useReveal } from '../hooks';
import styles from './Portfolio.module.css';

function PortfolioCard({
  title, category, description, tags, accent, features, url, aiPotential, index,
}: typeof PORTFOLIO_DATA[number] & { index: number }) {

  // Extract hostname for display in browser bar
  const displayUrl = url.replace('https://', '');

  return (
    <article
      className={`${styles.card} reveal reveal-delay-${Math.min(index + 1, 3)}`}
      aria-label={`${title} portfolio project`}
    >
      {/* Browser mockup preview */}
      <div className={styles.preview} style={{ background: `rgba(${hexToRgb(accent)}, 0.08)` }}>
        <div className={styles.browser}>
          <div className={styles.browserBar}>
            <span /><span /><span />
            <div className={styles.browserUrl}>{displayUrl}</div>
          </div>
          <div className={styles.browserContent}>
            <div className={styles.browserNav} />
            <div className={styles.browserHero} style={{ background: `rgba(${hexToRgb(accent)}, 0.15)` }}>
              <div className={styles.browserTitle} style={{ background: accent, opacity: 0.5 }} />
              <div className={styles.browserSub} />
              <div className={styles.browserBtn} style={{ background: accent, opacity: 0.7 }} />
            </div>
            <div className={styles.browserCards}>
              {[0,1,2].map(i => (
                <div key={i} className={styles.browserCard}>
                  <div className={styles.browserCardImg} style={{ background: `rgba(${hexToRgb(accent)}, 0.2)` }} />
                  <div className={styles.browserCardLine} />
                  <div className={styles.browserCardLineSm} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Depth accent */}
        <div className={styles.previewGlow} style={{ background: `radial-gradient(circle, rgba(${hexToRgb(accent)}, 0.2), transparent 70%)` }} aria-hidden="true" />
      </div>

      <div className={styles.body}>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        <ul className={styles.features}>
          {features.map((f) => (
            <li key={f} className={styles.feature}>
              <span className={styles.featureCheck} style={{ color: accent }} aria-hidden="true">✓</span>
              {f}
            </li>
          ))}
        </ul>

        {aiPotential && aiPotential.length > 0 && (
          <div className={styles.aiPotential}>
            <span className={styles.aiPotentialLabel}>AI Potential:</span>
            {aiPotential.map((a) => (
              <span key={a} className={styles.aiTag}>{a}</span>
            ))}
            <span className={styles.aiDemo}>Demo</span>
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.tags}>
            {tags.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
          <a
            href={url}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${title} live website`}
          >
            View Live Site
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return `${r},${g},${b}`;
}

export default function Portfolio() {
  const sectionRef = useReveal();

  return (
    <section className={`section ${styles.section}`} id="portfolio" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">Our Work</div>
          <h2 className="section-title">See What We Can Build.</h2>
          <p className="section-sub">
            Every project is designed to help a business grow online. Here is a selection of recent work.
          </p>
        </div>

        <div className={styles.grid}>
          {PORTFOLIO_DATA.map((p, i) => (
            <PortfolioCard key={p.id} {...p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
