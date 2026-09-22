import { useReveal } from '../../hooks';
import styles from './AIArchitecture.module.css';

const FLOW_NODES = [
  { id: 'customer', label: 'Customer', icon: 'user', color: '#3b82f6' },
  { id: 'channel', label: 'Website / WhatsApp / Voice', icon: 'channel', color: '#8b5cf6' },
  { id: 'agent', label: 'AI Agent', icon: 'cpu', color: '#2563eb' },
  { id: 'knowledge', label: 'Knowledge Base', icon: 'db', color: '#0891b2' },
  { id: 'tools', label: 'Business Tools', icon: 'tools', color: '#059669' },
  { id: 'systems', label: 'Database / CRM / APIs', icon: 'server', color: '#d97706' },
  { id: 'action', label: 'Business Action', icon: 'zap', color: '#34d399' },
];

function NodeIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'user':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      );
    case 'channel':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
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
        </svg>
      );
    case 'db':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case 'tools':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case 'server':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6" y2="6" /><line x1="6" y1="18" x2="6" y2="18" />
        </svg>
      );
    case 'zap':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AIArchitecture() {
  const ref = useReveal();

  return (
    <section className={`section ${styles.section}`} id="ai-architecture" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">How It Works</div>
          <h2 className="section-title">GOLIS AI Solutions<br />Architecture</h2>
          <p className="section-sub">
            A practical AI system designed around your real business — connected to your
            existing channels, data and workflows.
          </p>
        </div>

        <div className={`${styles.flow} reveal`} role="img" aria-label="GOLIS AI architecture flow diagram">
          {FLOW_NODES.map((node, i) => (
            <div key={node.id} className={styles.nodeWrap}>
              <div
                className={styles.node}
                style={{ '--node-color': node.color } as React.CSSProperties}
              >
                <div className={styles.nodeIcon}>
                  <NodeIcon icon={node.icon} />
                </div>
                <div className={styles.nodeLabel}>{node.label}</div>
                <div className={styles.nodePulse} aria-hidden="true" />
              </div>
              {i < FLOW_NODES.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <div className={styles.connectorLine} />
                  <div className={styles.connectorDot} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
