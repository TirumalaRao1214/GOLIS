import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { usePrefersReducedMotion, useIsMobile, useWebGLSupport } from '../../hooks';
import { GolisLogoStacked } from '../Logo';
import styles from './Hero.module.css';

const HeroScene = lazy(() => import('./HeroScene'));

/** Lightweight CSS fallback when WebGL unavailable */
function HeroFallback() {
  return (
    <div className={styles.fallback} aria-hidden="true">
      <div className={styles.fallbackOrb} />
      <div className={styles.fallbackRing} />
      <div className={styles.fallbackRing2} />
    </div>
  );
}

export default function Hero() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const webgl = useWebGLSupport();

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  // On very low-end mobile or no WebGL: skip Three.js entirely
  const show3D = webgl && !reduced;

  return (
    <section className={styles.hero} id="home" aria-labelledby="hero-headline">
      {/* 3D Canvas */}
      <div className={styles.canvas} aria-hidden="true">
        {show3D ? (
          <Suspense fallback={<HeroFallback />}>
            <Canvas
              camera={{ position: [0, 0, 6], fov: 55 }}
              dpr={mobile ? 1 : Math.min(window.devicePixelRatio, 2)}
              performance={{ min: 0.5 }}
              gl={{ antialias: !mobile, alpha: true, powerPreference: 'high-performance' }}
            >
              <HeroScene reduced={reduced} />
            </Canvas>
          </Suspense>
        ) : (
          <HeroFallback />
        )}
      </div>

      {/* Gradient fade at bottom */}
      <div className={styles.gradient} aria-hidden="true" />

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <div className={styles.left}>
          {/* Brand logo mark above headline */}
          <div className={styles.heroLogo}>
            <GolisLogoStacked scale={0.9} />
          </div>

          <h1 className={styles.headline} id="hero-headline">
            Build Your Business with<br />
            <span className={styles.accentText}>Websites + AI</span>
          </h1>

          <p className={styles.sub}>
            GOLIS builds high-performance websites, AI agents and business automation
            that help businesses attract customers, automate repetitive work and operate smarter.
          </p>

          <div className={styles.ctas}>
            <a
              href="#contact"
              className={`btn btn-primary btn-lg ${styles.ctaPrimary}`}
              onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
            >
              Build My Solution
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#ai-solutions"
              className={`btn btn-ghost btn-lg`}
              onClick={(e) => { e.preventDefault(); handleNav('#ai-solutions'); }}
            >
              Explore AI Solutions
            </a>
          </div>

          <div className={styles.trust} aria-label="Key capabilities">
            {['Websites', 'AI Agents', 'Automation', 'Business Apps'].map((item, i) => (
              <span key={item} className={styles.trustItem}>
                {i > 0 && <span className={styles.dot} aria-hidden="true">•</span>}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollHint} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </div>
    </section>
  );
}
