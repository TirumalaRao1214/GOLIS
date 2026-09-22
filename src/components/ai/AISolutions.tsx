import { useReveal } from '../../hooks';
import { AI_SOLUTIONS_DATA } from '../../config/site';
import AISolutionCard from './AISolutionCard';
import styles from './AISolutions.module.css';

export default function AISolutions() {
  const ref = useReveal();

  return (
    <section className={`section ${styles.section}`} id="ai-solutions" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">GOLIS AI</div>
          <h2 className="section-title">Make Your Business<br />AI-Powered</h2>
          <p className="section-sub">
            Practical AI solutions designed around your business — from customer conversations
            and lead generation to automation and intelligent business systems.
          </p>
        </div>

        <div className={styles.grid}>
          {AI_SOLUTIONS_DATA.map((sol, i) => (
            <AISolutionCard key={sol.id} {...sol} index={i} />
          ))}
        </div>

        <div className={`${styles.cta} reveal`}>
          <a
            href="#ai-business-builder"
            className="btn btn-primary btn-lg"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#ai-business-builder')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Find the Right AI for My Business
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
