import { useState } from 'react';
import { FAQ_DATA } from '../config/site';
import { useReveal } from '../hooks';
import styles from './FAQ.module.css';

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.item} ${open ? styles.open : ''} reveal reveal-delay-${Math.min(index % 4 + 1, 4)}`}>
      <button
        className={styles.question}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        <span>{q}</span>
        <span className={styles.icon} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </button>
      <div
        className={styles.answer}
        id={`faq-answer-${index}`}
        role="region"
        aria-hidden={!open}
      >
        <div className={styles.answerInner}>{a}</div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const ref = useReveal();

  return (
    <section className={`section ${styles.section}`} id="faq" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">FAQ</div>
          <h2 className="section-title">Questions Business<br />Owners Ask</h2>
        </div>

        <div className={styles.list} role="list">
          {FAQ_DATA.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
