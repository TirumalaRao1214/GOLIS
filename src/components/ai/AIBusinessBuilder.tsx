import { useState } from 'react';
import { useReveal } from '../../hooks';
import { SITE_CONFIG } from '../../config/site';
import { buildWhatsAppUrl } from '../../hooks';
import styles from './AIBusinessBuilder.module.css';

type Step = 1 | 2 | 3 | 4 | 5;

const BUSINESS_TYPES = [
  'Retail', 'Jewellery', 'Perfume', 'Restaurant', 'Gym',
  'Real Estate', 'Education', 'Healthcare', 'Wholesale',
  'Professional Services', 'Other',
];

const AUTOMATION_OPTIONS = [
  'Customer enquiries', 'WhatsApp messages', 'Lead generation',
  'Customer support', 'Orders', 'Appointments', 'Follow-ups',
  'Reports', 'Internal business processes', 'Calls',
];

const CONTACT_CHANNELS = [
  'WhatsApp', 'Phone', 'Website', 'Instagram', 'Facebook', 'Walk-in', 'Multiple channels',
];

const ENQUIRY_VOLUMES = [
  'Less than 10/day', '10–50/day', '50–100/day', '100+/day',
];

function aiResultsFromAnswers(
  businessType: string,
  automations: string[],
  channel: string,
  volume: string
): string[] {
  const results: string[] = [];

  if (automations.includes('Customer enquiries') || automations.includes('Customer support')) {
    results.push('AI Customer Assistant');
  }
  if (automations.includes('WhatsApp messages') || channel === 'WhatsApp') {
    results.push('WhatsApp Automation');
  }
  if (automations.includes('Lead generation') || automations.includes('Follow-ups')) {
    results.push('Lead Qualification & Follow-up Automation');
  }
  if (automations.includes('Appointments')) {
    results.push('AI Appointment Booking Assistant');
  }
  if (automations.includes('Orders')) {
    results.push('AI Order Assistant');
  }
  if (automations.includes('Calls')) {
    results.push('AI Voice Agent');
  }
  if (automations.includes('Reports') || automations.includes('Internal business processes')) {
    results.push('Business Process Automation');
  }
  if (volume === '100+/day' || volume === '50–100/day') {
    if (!results.includes('AI Customer Assistant')) results.push('AI Customer Assistant');
  }
  if (businessType === 'Real Estate' || businessType === 'Education') {
    if (!results.includes('Lead Qualification & Follow-up Automation')) {
      results.push('Lead Qualification & Follow-up Automation');
    }
  }

  return results.length > 0
    ? results
    : ['AI Website Assistant', 'Lead Capture Automation'];
}

export default function AIBusinessBuilder() {
  const ref = useReveal();
  const [step, setStep] = useState<Step>(1);
  const [businessType, setBusinessType] = useState('');
  const [automations, setAutomations] = useState<string[]>([]);
  const [channel, setChannel] = useState('');
  const [volume, setVolume] = useState('');

  const toggleAutomation = (opt: string) => {
    setAutomations((prev) =>
      prev.includes(opt) ? prev.filter((a) => a !== opt) : [...prev, opt]
    );
  };

  const aiResults = aiResultsFromAnswers(businessType, automations, channel, volume);

  const waMessage = [
    `Hi GOLIS, I completed the AI Business Builder.`,
    `Business type: ${businessType}`,
    `I want to automate: ${automations.join(', ')}`,
    `Customers contact via: ${channel}`,
    `Enquiry volume: ${volume}`,
    `Suggested AI solutions: ${aiResults.join(', ')}`,
    `Please help me get started.`,
  ].join('\n');

  const waUrl = buildWhatsAppUrl(SITE_CONFIG.contact.whatsapp, waMessage);

  return (
    <section className={`section ${styles.section}`} id="ai-business-builder" ref={ref}>
      <div className="container">
        <div className="section-header reveal">
          <div className="eyebrow">AI FOR YOUR BUSINESS</div>
          <h2 className="section-title">Not Sure What AI Can<br />Do for Your Business?</h2>
          <p className="section-sub">
            Tell us about your business and we'll identify practical opportunities where AI
            and automation can save time, improve customer experience or generate more leads.
          </p>
        </div>

        <div className={`${styles.builder} reveal`}>
          {/* Progress indicator */}
          {step < 5 && (
            <div className={styles.progress} aria-label={`Step ${step} of 4`}>
              {([1, 2, 3, 4] as const).map((s) => (
                <div
                  key={s}
                  className={`${styles.progressStep} ${step >= s ? styles.progressActive : ''}`}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div className={styles.stepContent}>
              <p className={styles.stepLabel}>Step 1 of 4</p>
              <h3 className={styles.stepTitle}>What type of business do you have?</h3>
              <div className={styles.optionsGrid}>
                {BUSINESS_TYPES.map((bt) => (
                  <button
                    key={bt}
                    type="button"
                    className={`${styles.option} ${businessType === bt ? styles.optionSelected : ''}`}
                    onClick={() => setBusinessType(bt)}
                  >
                    {bt}
                  </button>
                ))}
              </div>
              <button
                className={styles.nextBtn}
                onClick={() => setStep(2)}
                disabled={!businessType}
                type="button"
              >
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepContent}>
              <p className={styles.stepLabel}>Step 2 of 4</p>
              <h3 className={styles.stepTitle}>What would you like to automate?</h3>
              <p className={styles.stepHint}>Select all that apply</p>
              <div className={styles.optionsGrid}>
                {AUTOMATION_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`${styles.option} ${automations.includes(opt) ? styles.optionSelected : ''}`}
                    onClick={() => toggleAutomation(opt)}
                  >
                    {automations.includes(opt) && (
                      <span className={styles.optionCheck} aria-hidden="true">✓</span>
                    )}
                    {opt}
                  </button>
                ))}
              </div>
              <div className={styles.stepActions}>
                <button className={styles.backBtn} onClick={() => setStep(1)} type="button">
                  Back
                </button>
                <button
                  className={styles.nextBtn}
                  onClick={() => setStep(3)}
                  disabled={automations.length === 0}
                  type="button"
                >
                  Continue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepContent}>
              <p className={styles.stepLabel}>Step 3 of 4</p>
              <h3 className={styles.stepTitle}>How do customers currently contact you?</h3>
              <div className={styles.optionsGrid}>
                {CONTACT_CHANNELS.map((ch) => (
                  <button
                    key={ch}
                    type="button"
                    className={`${styles.option} ${channel === ch ? styles.optionSelected : ''}`}
                    onClick={() => setChannel(ch)}
                  >
                    {ch}
                  </button>
                ))}
              </div>
              <div className={styles.stepActions}>
                <button className={styles.backBtn} onClick={() => setStep(2)} type="button">
                  Back
                </button>
                <button
                  className={styles.nextBtn}
                  onClick={() => setStep(4)}
                  disabled={!channel}
                  type="button"
                >
                  Continue
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={styles.stepContent}>
              <p className={styles.stepLabel}>Step 4 of 4</p>
              <h3 className={styles.stepTitle}>How many customer enquiries do you receive?</h3>
              <div className={styles.optionsGrid}>
                {ENQUIRY_VOLUMES.map((vol) => (
                  <button
                    key={vol}
                    type="button"
                    className={`${styles.option} ${volume === vol ? styles.optionSelected : ''}`}
                    onClick={() => setVolume(vol)}
                  >
                    {vol}
                  </button>
                ))}
              </div>
              <div className={styles.stepActions}>
                <button className={styles.backBtn} onClick={() => setStep(3)} type="button">
                  Back
                </button>
                <button
                  className={styles.nextBtn}
                  onClick={() => setStep(5)}
                  disabled={!volume}
                  type="button"
                >
                  See My AI Solutions
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className={styles.result}>
              <div className={styles.resultHeader}>
                <div className={styles.resultIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <div className={styles.resultEyebrow}>Your Potential GOLIS AI Solution</div>
                  <div className={styles.resultSubTitle}>Based on {businessType} · {volume}</div>
                </div>
              </div>

              <div className={styles.resultList}>
                {aiResults.map((r) => (
                  <div key={r} className={styles.resultItem}>
                    <span className={styles.resultCheck} aria-hidden="true">✓</span>
                    {r}
                  </div>
                ))}
              </div>

              <p className={styles.resultNote}>
                These are suggested starting points based on your answers.
                GOLIS will design the right solution for your specific business.
              </p>

              <div className={styles.resultActions}>
                <a
                  href={waUrl}
                  className="btn btn-primary btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Talk to GOLIS
                </a>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setStep(1);
                    setBusinessType('');
                    setAutomations([]);
                    setChannel('');
                    setVolume('');
                  }}
                  type="button"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

