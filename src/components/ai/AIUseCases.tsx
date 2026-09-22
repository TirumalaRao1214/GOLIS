import { useState } from 'react';
import { useReveal } from '../../hooks';
import { AI_USE_CASES_DATA } from '../../config/site';
import styles from './AIUseCases.module.css';

export default function AIUseCases() {
  const ref = useReveal();
  const [active, setActive] = useState(0);

  const current = AI_USE_CASES_DATA[active];

  return (
    <section className={`section ${styles.section}`} id="ai-use-cases" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">Real Examples</div>
          <h2 className="section-title">Real Business<br />Use Cases</h2>
          <p className="section-sub">
            See how AI can work inside specific businesses — from answering customer questions
            to capturing leads and processing enquiries.
          </p>
        </div>

        <div className={`${styles.inner} reveal`}>
          {/* Industry tabs */}
          <div className={styles.tabs} role="tablist" aria-label="Industry use cases">
            {AI_USE_CASES_DATA.map((uc, i) => (
              <button
                key={uc.id}
                role="tab"
                aria-selected={active === i}
                className={`${styles.tab} ${active === i ? styles.tabActive : ''}`}
                onClick={() => setActive(i)}
                type="button"
                style={{ '--tab-accent': uc.accent } as React.CSSProperties}
              >
                <span className={styles.tabIcon} aria-hidden="true">{uc.icon}</span>
                <span className={styles.tabLabel}>{uc.industry}</span>
              </button>
            ))}
          </div>

          {/* Conversation display */}
          <div
            className={styles.demo}
            role="tabpanel"
            aria-label={`${current.industry} AI demo`}
            style={{ '--demo-accent': current.accent } as React.CSSProperties}
          >
            <div className={styles.demoHeader}>
              <span className={styles.demoIcon} aria-hidden="true">{current.icon}</span>
              <span className={styles.demoTitle}>{current.industry}</span>
              <span className={styles.aiLabel}>AI Assistant Active</span>
            </div>

            <div className={styles.conversation}>
              {/* Customer message */}
              <div className={styles.customerMsg}>
                <div className={styles.customerAvatar} aria-hidden="true">C</div>
                <div className={styles.bubble}>{current.customerQuery}</div>
              </div>

              {/* AI response */}
              <div className={styles.aiMsg}>
                <div className={styles.aiAvatar} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="8" y="8" width="8" height="8" />
                    <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                  </svg>
                </div>
                <div className={styles.aiResponse}>
                  <div className={styles.aiResponseLabel}>AI is working...</div>
                  <ul className={styles.actionList}>
                    {current.aiActions.map((action, i) => (
                      <li
                        key={i}
                        className={styles.actionItem}
                        style={{ animationDelay: `${i * 0.15}s` } as React.CSSProperties}
                      >
                        <span className={styles.actionCheck} aria-hidden="true">✓</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
