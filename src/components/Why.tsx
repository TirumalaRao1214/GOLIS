import { useReveal } from '../hooks';
import { WHY_NODES } from '../config/site';
import styles from './Why.module.css';

const BENEFITS = [
  {
    title: 'Business-Focused Design',
    desc: 'We design around your customers and business objectives.',
    icon: '◈',
  },
  {
    title: 'Mobile-First',
    desc: 'Your website looks great on every device — phone, tablet and desktop.',
    icon: '◉',
  },
  {
    title: 'Easy Communication',
    desc: 'Make it simple for customers to call, message or enquire.',
    icon: '◎',
  },
  {
    title: 'Modern Technology',
    desc: 'Reliable, fast, modern development for dependable experiences.',
    icon: '◈',
  },
  {
    title: 'Scalable Foundation',
    desc: 'Start simple and expand your digital presence as you grow.',
    icon: '◉',
  },
  {
    title: 'Direct Support',
    desc: 'Talk directly with the team building your website. No middlemen.',
    icon: '◎',
  },
];

export default function Why() {
  const sectionRef = useReveal();

  return (
    <section className={`section ${styles.section}`} id="why" ref={sectionRef}>
      <div className="container">
        <div className={`section-header reveal`}>
          <div className="eyebrow">Why GOLIS</div>
          <h2 className="section-title">More Than Just a Website.</h2>
          <p className="section-sub">
            Your website should be a digital asset for your business — not just an online brochure.
          </p>
        </div>

        {/* Ecosystem visual */}
        <div className={`${styles.ecosystem} reveal`} aria-label="Business ecosystem nodes">
          <div className={styles.center}>
            <div className={styles.centerOrb}>
              <span className={styles.centerLabel}>GOLIS</span>
            </div>
          </div>
          {WHY_NODES.map((node, i) => (
            <div
              key={node}
              className={styles.node}
              style={{
                '--angle': `${(i / WHY_NODES.length) * 360}deg`,
                '--delay': `${i * 0.15}s`,
              } as React.CSSProperties}
            >
              <div className={styles.nodeDot} />
              <span className={styles.nodeLabel}>{node}</span>
            </div>
          ))}
          <div className={styles.orbitRing} aria-hidden="true" />
        </div>

        {/* Benefits grid */}
        <div className={styles.grid}>
          {BENEFITS.map((b, i) => (
            <div
              key={b.title}
              className={`${styles.card} reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className={styles.cardIcon} aria-hidden="true">{b.icon}</div>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardDesc}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
