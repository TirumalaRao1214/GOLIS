import { useState } from 'react';
import { AI_DEMO_CARDS } from '../../config/site';
import { useReveal } from '../../hooks';
import type { DemoType } from '../../services/ai/aiDemoService';
import AIDemoModal from './AIDemoModal';
import styles from './AILab.module.css';

function LabIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'chat':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          <circle cx="9" cy="10" r="1" fill="currentColor" />
          <circle cx="13" cy="10" r="1" fill="currentColor" />
          <circle cx="17" cy="10" r="1" fill="currentColor" />
        </svg>
      );
    case 'target':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'cpu':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <rect x="8" y="8" width="8" height="8" />
          <line x1="9" y1="1" x2="9" y2="4" />
          <line x1="15" y1="1" x2="15" y2="4" />
          <line x1="9" y1="20" x2="9" y2="23" />
          <line x1="15" y1="20" x2="15" y2="23" />
          <line x1="20" y1="9" x2="23" y2="9" />
          <line x1="20" y1="14" x2="23" y2="14" />
          <line x1="1" y1="9" x2="4" y2="9" />
          <line x1="1" y1="14" x2="4" y2="14" />
        </svg>
      );
    case 'brain':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.5 2a2.5 2.5 0 015 0M12 2v4" />
          <path d="M4.5 7.5A2.5 2.5 0 012 10v4a8 8 0 0016 0v-4a2.5 2.5 0 01-2.5-2.5" />
          <path d="M4.5 7.5h15" />
          <line x1="8" y1="14" x2="8" y2="14" />
          <line x1="12" y1="14" x2="12" y2="14" />
          <line x1="16" y1="14" x2="16" y2="14" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
}

export default function AILab() {
  const ref = useReveal();
  const [activeDemo, setActiveDemo] = useState<{
    type: DemoType;
    title: string;
  } | null>(null);

  return (
    <section className={`section ${styles.section}`} id="ai-lab" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">GOLIS AI LAB</div>
          <h2 className="section-title">Experience AI<br />Before You Buy It</h2>
          <p className="section-sub">
            Explore interactive examples of how AI can work inside a real business.
          </p>
        </div>

        <div className={styles.grid}>
          {AI_DEMO_CARDS.map((card, i) => (
            <div
              key={card.id}
              className={`${styles.card} reveal reveal-delay-${Math.min(i + 1, 4)}`}
            >
              <div className={styles.iconWrap}>
                <LabIcon icon={card.icon} />
              </div>
              <h3 className={styles.title}>{card.title}</h3>
              <p className={styles.desc}>{card.description}</p>
              <button
                className={styles.tryBtn}
                onClick={() => setActiveDemo({ type: card.demoType, title: card.title })}
                type="button"
              >
                Try Demo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
              <div className={styles.badge}>Demo</div>
            </div>
          ))}
        </div>
      </div>

      {activeDemo && (
        <AIDemoModal
          isOpen={!!activeDemo}
          onClose={() => setActiveDemo(null)}
          demoType={activeDemo.type}
          title={activeDemo.title}
        />
      )}
    </section>
  );
}
