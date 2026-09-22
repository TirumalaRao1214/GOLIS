import { lazy, Suspense } from 'react';
import type { DemoType } from '../../services/ai/aiDemoService';
import styles from './AIDemoModal.module.css';

const AIChatDemo = lazy(() => import('./AIChatDemo'));

interface AIDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  demoType: DemoType;
  title: string;
}

export default function AIDemoModal({ isOpen, onClose, demoType, title }: AIDemoModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="demo-modal-title"
      tabIndex={-1}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <div className={styles.aiDot} aria-hidden="true" />
            <h3 id="demo-modal-title" className={styles.title}>{title}</h3>
          </div>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close demo"
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className={styles.body}>
          <Suspense fallback={<div className={styles.loading}>Loading demo...</div>}>
            <AIChatDemo demoType={demoType} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
