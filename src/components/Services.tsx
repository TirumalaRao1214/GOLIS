import { useRef, useState } from 'react';
import type { ReactElement } from 'react';
import { SERVICES_DATA } from '../config/site';
import { useReveal } from '../hooks';
import styles from './Services.module.css';

const ICONS: Record<string, ReactElement> = {
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.5 2a2.5 2.5 0 015 0" />
      <path d="M4.5 7.5A2.5 2.5 0 012 10v4a8 8 0 0016 0v-4a2.5 2.5 0 01-2.5-2.5" />
      <path d="M4.5 7.5h15" />
      <circle cx="8" cy="14" r="1" fill="currentColor" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
    </svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" rx="2"/>
      <rect x="8" y="8" width="8" height="8"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  message: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M20 12h2M2 12h2M19.07 19.07l-1.41-1.41M5.34 5.34L3.93 3.93M12 20v2M12 2v2"/>
    </svg>
  ),
};

function ServiceCard({
  number, title, description, icon, index,
}: {
  number: string; title: string; description: string; icon: string; index: number;
}) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    setTilt({ x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className={`${styles.card} reveal reveal-delay-${Math.min(index + 1, 4)}`}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <div className={styles.cardInner}>
        <div className={styles.number}>{number}</div>
        <div className={styles.iconWrap}>
          {ICONS[icon]}
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>
        <div className={styles.arrow} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
      <div className={styles.cardGlow} aria-hidden="true" />
    </div>
  );
}

export default function Services() {
  const sectionRef = useReveal();

  return (
    <section className={`section ${styles.section}`} id="services" ref={sectionRef}>
      <div className="container">
        <div className={`section-header reveal`}>
          <div className="eyebrow">Websites</div>
          <h2 className="section-title">
            Everything Your Business<br />Needs to Grow Online
          </h2>
          <p className="section-sub">
            From your first website to AI-powered business applications — GOLIS builds what your business needs.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES_DATA.map((s, i) => (
            <ServiceCard key={s.id} {...s} index={i} />
          ))}
        </div>

        <div className={`${styles.cta} reveal`}>
          <a
            href="#contact"
            className="btn btn-primary btn-lg"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          >
            Get a Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
