import React, { useState } from 'react';
import PageHero from '../components/PageHero';
import { contact } from '../content';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleEmailClick = (e) => {
    e.preventDefault();
    const email = contact?.enquiryEmail || '';
    if (email) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
      // Fallback: still try to open the email client
      window.location.href = `mailto:${email}?subject=Request%20for%20Quotation`;
    }
  };
  return (
    <main className="page-main">
      <PageHero data={{
        image: 'img/cap-quality.jpg',
        title: 'Contact & Request a Quote',
        breadcrumb: 'Contact & Request a Quote'
      }} />

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-intro reveal">
            <span className="section-tag">Get In Touch</span>
            <h2>Let's Start Your <span className="accent">Project</span></h2>
            <p className="contact-intro-text">
              Send us your drawings or enquiry and our engineering team will respond within 1 business day with a detailed quotation and DFM assessment.
            </p>
          </div>

          <div className="contact-main-grid">
            <aside className="contact-info-panel reveal">
              <div className="contact-channels">
                <div className="contact-channel-item" style={{ pointerEvents: 'none' }}>
                  <span className="contact-channel-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </span>
                  <div className="contact-channel-text">
                    <span className="contact-channel-label">Head Office &amp; Factory</span>
                    <span className="contact-channel-value" style={{ whiteSpace: 'normal', lineHeight: 1.5 }}>
                      {(contact?.factoryAddress || '').replace(/\n/g, ', ')}
                    </span>
                  </div>
                </div>

                <a href={`tel:${contact?.phone || ''}`} className="contact-channel-item">
                  <span className="contact-channel-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.17 2 2 0 012 .98h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  </span>
                  <div className="contact-channel-text">
                    <span className="contact-channel-label">Phone</span>
                    <span className="contact-channel-value">{contact?.phone || ''}</span>
                  </div>
                </a>

                <a href={`mailto:${contact?.enquiryEmail || ''}?subject=Enquiry`} className="contact-channel-item">
                  <span className="contact-channel-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="M2 7l10 7 10-7"/>
                    </svg>
                  </span>
                  <div className="contact-channel-text">
                    <span className="contact-channel-label">Email</span>
                    <span className="contact-channel-value">{contact?.enquiryEmail || ''}</span>
                  </div>
                </a>

                <div className="contact-channel-item" style={{ pointerEvents: 'none' }}>
                  <span className="contact-channel-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </span>
                  <div className="contact-channel-text">
                    <span className="contact-channel-label">Business Hours</span>
                    <span className="contact-channel-value" style={{ whiteSpace: 'pre-line', lineHeight: 1.5 }}>
                      {contact?.businessHours || "Mon - Fri: 8:00 AM - 5:30 PM\nSat - Sun: Closed"}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px', padding: '24px', background: 'var(--bg-2)', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1rem', color: 'var(--text)', marginBottom: '12px', fontWeight: 600 }}>Supported CAD Formats</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                  For the fastest and most accurate quotation, please provide 3D models alongside 2D drawings.
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', background: 'var(--bg-alt)', color: 'var(--text)', borderRadius: '4px', border: '1px solid var(--border)' }}>.STEP / .STP</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', background: 'var(--bg-alt)', color: 'var(--text)', borderRadius: '4px', border: '1px solid var(--border)' }}>.IGES / .IGS</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', background: 'var(--bg-alt)', color: 'var(--text)', borderRadius: '4px', border: '1px solid var(--border)' }}>.DXF / .DWG</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '4px 10px', background: 'var(--bg-alt)', color: 'var(--text)', borderRadius: '4px', border: '1px solid var(--border)' }}>.PDF (2D)</span>
                </div>
              </div>
            </aside>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
              <div className="contact-form-panel reveal" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', padding: '60px 40px', margin: 0 }}>
                <div style={{ width: '64px', height: '64px', background: 'var(--accent-bg)', color: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '32px', height: '32px' }}>
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', fontFamily: 'var(--font-heading)' }}>Ready for a Quote?</h3>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-body)', lineHeight: 1.8, marginBottom: '32px' }}>
                  To ensure the highest accuracy for your project estimation, please send your requirements directly to our engineering team. Attach your 3D CAD models (STEP, IGES) and 2D drawings (PDF) along with material and quantity details.
                </p>
                <button onClick={handleEmailClick} className="btn btn-primary btn-lg" style={{ alignSelf: 'center', borderRadius: '9999px', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                  {copied ? 'Email Copied! ✓' : 'Email Our Team \u2192'}
                </button>
                <p style={{ marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  We respond to all enquiries within <strong>{contact?.responseTime || '24 hours'}</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
