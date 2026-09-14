import { useEffect, useState } from 'react';
import { PROCESS_DATA } from '../config/site';
import { useReveal } from '../hooks';
import styles from './Process.module.css';

export default function Process() {
  const sectionRef = useReveal();
  const [activeStep, setActiveStep] = useState(0);

  // Auto-advance steps based on scroll
  useEffect(() => {
    const steps = document.querySelectorAll(`.${styles.step}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt((e.target as HTMLElement).dataset.index || '0');
            setActiveStep(idx);
          }
        });
      },
      { threshold: 0.6 }
    );
    steps.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`section ${styles.section}`} id="process" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">How It Works</div>
          <h2 className="section-title">From Idea to Online.</h2>
          <p className="section-sub">
            A straightforward process from your first conversation to a live website.
          </p>
        </div>

        <div className={styles.timeline}>
          {/* Connecting line */}
          <div className={styles.line} aria-hidden="true">
            <div
              className={styles.lineProgress}
              style={{ width: `${((activeStep + 1) / PROCESS_DATA.length) * 100}%` }}
            />
          </div>

          {PROCESS_DATA.map((p, i) => (
            <div
              key={p.step}
              className={`${styles.step} ${i <= activeStep ? styles.stepActive : ''} reveal reveal-delay-${i + 1}`}
              data-index={i}
            >
              <div className={styles.stepDot}>
                <span className={styles.stepNum}>{p.step}</span>
              </div>
              <div className={styles.stepBody}>
                <h3 className={styles.stepTitle}>{p.title}</h3>
                <p className={styles.stepDesc}>{p.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step detail cards */}
        <div className={styles.cards}>
          {PROCESS_DATA.map((p, i) => (
            <div
              key={p.step}
              className={`${styles.card} reveal reveal-delay-${i + 1}`}
            >
              <div className={styles.cardNum}>{p.step}</div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
