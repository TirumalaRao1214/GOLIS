import { SITE_CONFIG } from '../config/site';
import { GolisLogoStacked } from './Logo';
import styles from './Footer.module.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
);

export default function Footer() {
  const { phone, email } = SITE_CONFIG.contact;

  const handleNav = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#home" className={styles.logoLink} aria-label="GOLIS Home" onClick={(e) => { e.preventDefault(); handleNav('#home'); }}>
              <GolisLogoStacked scale={0.75} />
            </a>
            <p className={styles.tagline}>{SITE_CONFIG.brand.tagline}</p>
            <div className={styles.social}>
              <a href={SITE_CONFIG.social.instagram} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={SITE_CONFIG.social.linkedin} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href={SITE_CONFIG.social.youtube} className={styles.socialLink} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <YouTubeIcon />
              </a>
            </div>
          </div>

          <nav className={styles.nav} aria-label="Footer navigation">
            <h3 className={styles.navTitle}>Navigation</h3>
            <ul role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); handleNav(link.href); }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.contact}>
            <h3 className={styles.navTitle}>Contact</h3>
            <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className={styles.contactItem}>
              <span className={styles.contactLabel}>Call / WhatsApp</span>
              <span className={styles.contactValue}>{phone}</span>
            </a>
            <a href={`mailto:${email}`} className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <span className={styles.contactValue}>{email}</span>
            </a>
          </div>

          <div className={styles.cta}>
            <p className={styles.ctaText}>Ready to get started?</p>
            <a href="#contact" className="btn btn-primary" onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}>
              Get a Free Consultation
            </a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 GOLIS. All rights reserved.</p>
          <p className={styles.sub}>Website by GOLIS</p>
        </div>
      </div>
    </footer>
  );
}
