import React from 'react';
import { Link } from 'react-router-dom';
import { company, contact, navVisibility, services } from '../content';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const embedUrl = contact?.mapEmbed ?? 'https://maps.google.com/maps?q=Bayan%20Lepas%20Free%20Industrial%20Zone,%20Pulau%20Pinang&t=&z=13&ie=UTF8&iwloc=&output=embed';
  
  let finalEmbedUrl = embedUrl;
  const match = embedUrl.match(/src=["'](.*?)["']/);
  if (match) {
      finalEmbedUrl = match[1];
  }

  const setLang = (lang) => {
    const targetLang = lang === 'zh' ? 'zh-CN' : 'en';
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    if (lang === 'en') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;';
      window.location.reload();
    } else {
      const selectField = document.querySelector('.goog-te-combo');
      if (selectField) {
        selectField.value = targetLang;
        selectField.dispatchEvent(new Event('change'));
      }
    }
  };



  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <img src="/img/new-logo.png" alt="Top Precision Manufacturing" className="footer-logo-img" />
              <span className="footer-logo-text">
                <span className="footer-logo-wordmark">TOP PRECISION</span>
                <span className="footer-logo-sub">Manufacturing Sdn Bhd</span>
              </span>
            </Link>
            <p className="footer-tagline">Engineering Precision. Delivering Excellence.</p>
            <p className="footer-reg">
              Co. Reg. No.: <strong>{company?.regNumber || ''}</strong><br/>
              SST Reg.: <strong>{company?.sstReg || 'N/A'}</strong>
            </p>
            <div className="footer-social">
              <a href={company?.linkedIn || 'https://linkedin.com'} className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M7 10v7M7 7v.1M11 10v7M11 13a3 3 0 016 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
              <a href={company?.facebook || 'https://facebook.com'} className="social-btn" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M15 8h-2a1 1 0 00-1 1v2h3l-.5 3H12V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </a>
              <a href={`mailto:${contact?.enquiryEmail || ''}?subject=General%20Inquiry`} className="social-btn" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M2 8l10 7 10-7" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              {navVisibility?.home?.visible && <li><Link to="/" className="footer-link">Home</Link></li>}
              {navVisibility?.about?.visible && <li><Link to="/about" className="footer-link">About Us</Link></li>}
              {navVisibility?.services?.visible && <li><Link to="/capabilities" className="footer-link">Services</Link></li>}
              {navVisibility?.quality?.visible && (
                <>
                  <li><Link to="/certificates" className="footer-link">Certifications</Link></li>
                  <li><Link to="/policies" className="footer-link">Company Policies</Link></li>
                </>
              )}
              {navVisibility?.facilities?.visible && <li><Link to="/facilities" className="footer-link">Facilities</Link></li>}
              {navVisibility?.careers?.visible && <li><Link to="/careers" className="footer-link">Careers</Link></li>}
              {navVisibility?.contact?.visible && <li><Link to="/contact" className="footer-link">Contact</Link></li>}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-links">
              {services?.length > 0 ? (
                services.map((svc, idx) => (
                  <li key={idx}>
                    <Link to={`/${svc.slug || svc.id || svc.link?.replace('.html', '')}`} className="footer-link">
                      {svc.name}
                    </Link>
                  </li>
                ))
              ) : (
                <li><Link to="/capabilities" className="footer-link">View All Services</Link></li>
              )}
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="footer-col-title">Locations</h4>
            
            <div style={{marginBottom: '20px', borderRadius: '8px', overflow: 'hidden', height: '160px', background: '#2a3143', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
              <iframe 
                src={finalEmbedUrl} 
                width="100%" 
                height="100%" 
                style={{border:0, filter: 'grayscale(20%) contrast(1.1)'}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>

            <div className="footer-address-block">
              <div>
                <div className="footer-office-name">Factory &amp; Head Office</div>
                <address className="footer-address" dangerouslySetInnerHTML={{ __html: (contact?.factoryAddress || '').replace(/\n/g, '<br>') }} />
              </div>

              <div className="footer-contact-links">
                <a href={`mailto:${contact?.enquiryEmail || ''}?subject=Enquiry`} className="footer-contact-link">
                  E: {contact?.enquiryEmail || ''}
                </a>
                <a href={`tel:${contact?.phone || ''}`} className="footer-contact-link">
                  T: {contact?.phone || ''}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {currentYear} {company?.name || ''} ({company?.regNumber || ''}). All rights reserved.</p>
          <div className="footer-bottom-right" style={{display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap'}}>
            <nav className="footer-bottom-links">
              <Link to="#">Privacy Policy</Link>
              <Link to="#">Terms of Use</Link>
            </nav>
            <div className="lang-toggle" id="lang-toggle-footer">
              <button className="lang-btn active" data-lang="en" onClick={() => setLang('en')}>EN</button>
              <span className="lang-divider">|</span>
              <button className="lang-btn" data-lang="zh" onClick={() => setLang('zh')}>CN</button>
            </div>
            <Link to="/admin" className="admin-portal-link" style={{marginLeft: 'auto'}}>Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
