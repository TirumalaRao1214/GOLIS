import { useState } from 'react';
import { SITE_CONFIG } from '../config/site';
import { buildWhatsAppUrl, useReveal } from '../hooks';
import styles from './Contact.module.css';

const BUSINESS_TYPES = [
  'Restaurant / Cafe / Bakery',
  'Salon / Spa / Beauty',
  'Gym / Fitness',
  'Clinic / Healthcare',
  'Real Estate',
  'Interior Design',
  'Boutique / Fashion',
  'Jewellery',
  'Photography',
  'Event Planning',
  'Coaching / Education',
  'Retail / Shop',
  'Professional Services',
  'Manufacturing',
  'Other',
];

const REQUIREMENTS = [
  'New Business Website',
  'Website Redesign',
  'Product / Service Catalog',
  'Landing Page',
  'WhatsApp Integration',
  'Online Booking / Ordering',
  'Business Automation',
  'Mobile Application',
  'Free Website Demo',
  'Not Sure — I Need Advice',
];

export default function Contact() {
  const ref = useReveal();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const waUrl = buildWhatsAppUrl(SITE_CONFIG.contact.whatsapp, SITE_CONFIG.contact.whatsappMessage);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const business = (form.elements.namedItem('business') as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value.trim();
    const newErrors: Record<string, boolean> = {};
    if (!name) newErrors.name = true;
    if (!business) newErrors.business = true;
    if (!phone) newErrors.phone = true;
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
    setErrors({});
    setSubmitted(true);
  };

  const channels = [
    {
      href: waUrl,
      label: 'WhatsApp',
      value: SITE_CONFIG.contact.whatsapp,
      external: true,
      color: '#25d366',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
    },
    {
      href: `tel:${SITE_CONFIG.contact.phoneRaw}`,
      label: 'Call',
      value: SITE_CONFIG.contact.phone,
      external: false,
      color: 'var(--accent-2)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.7A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16z"/>
        </svg>
      ),
    },
    {
      href: `mailto:${SITE_CONFIG.contact.email}`,
      label: 'Email',
      value: SITE_CONFIG.contact.email,
      external: false,
      color: '#f87171',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
  ];

  return (
    <section className={`section ${styles.section}`} id="contact" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left */}
          <div className={`${styles.left} reveal`}>
            <div className="eyebrow">Get in Touch</div>
            <h2 className={styles.title}>Ready to Take Your<br />Business Online?</h2>
            <p className={styles.sub}>
              Tell GOLIS about your business and let's create a digital presence that works for you.
            </p>

            <div className={styles.channels}>
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className={styles.channel}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={`${c.label}: ${c.value}`}
                >
                  <div className={styles.channelIcon} style={{ color: c.color, background: `${c.color}18` }}>
                    {c.icon}
                  </div>
                  <div>
                    <div className={styles.channelLabel}>{c.label}</div>
                    <div className={styles.channelValue}>{c.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className={`${styles.right} reveal`}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className={styles.successTitle}>Message Sent!</h3>
                <p className={styles.successText}>
                  Thank you for reaching out. GOLIS will respond within 1 business day.
                </p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="c-name" className={styles.label}>Name <span className={styles.req} aria-hidden="true">*</span></label>
                    <input id="c-name" name="name" type="text" className={`${styles.input} ${errors.name ? styles.inputError : ''}`} placeholder="Your name" autoComplete="name" onChange={() => setErrors(p => ({ ...p, name: false }))} />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="c-business" className={styles.label}>Business Name <span className={styles.req} aria-hidden="true">*</span></label>
                    <input id="c-business" name="business" type="text" className={`${styles.input} ${errors.business ? styles.inputError : ''}`} placeholder="Your business" autoComplete="organization" onChange={() => setErrors(p => ({ ...p, business: false }))} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="c-phone" className={styles.label}>Phone <span className={styles.req} aria-hidden="true">*</span></label>
                    <input id="c-phone" name="phone" type="tel" className={`${styles.input} ${errors.phone ? styles.inputError : ''}`} placeholder="+91 86398 65959" autoComplete="tel" onChange={() => setErrors(p => ({ ...p, phone: false }))} />
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="c-email" className={styles.label}>Email</label>
                    <input id="c-email" name="email" type="email" className={styles.input} placeholder="hello@yourbusiness.com" autoComplete="email" />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.group}>
                    <label htmlFor="c-type" className={styles.label}>Business Type</label>
                    <select id="c-type" name="type" className={`${styles.input} ${styles.select}`}>
                      <option value="">Select business type</option>
                      {BUSINESS_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className={styles.group}>
                    <label htmlFor="c-need" className={styles.label}>Requirement</label>
                    <select id="c-need" name="need" className={`${styles.input} ${styles.select}`}>
                      <option value="">What do you need?</option>
                      {REQUIREMENTS.map(r => <option key={r}>{r}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.group}>
                  <label htmlFor="c-message" className={styles.label}>Message</label>
                  <textarea id="c-message" name="message" className={`${styles.input} ${styles.textarea}`} placeholder="Tell us about your business..." rows={4} />
                </div>
                <button type="submit" className={`btn btn-primary ${styles.submit}`}>
                  Request a Free Consultation
                </button>
                <p className={styles.formNote}>
                  We respond within 1 business day.{' '}
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.waLink}>
                    Prefer WhatsApp? →
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
