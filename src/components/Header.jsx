import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navVisibility, content, services, media } from '../content'; // Using media for logo

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const page = location.pathname.split('/').pop() || 'index';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileNav = () => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobileNav = () => {
    const nextState = !mobileOpen;
    setMobileOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  // Close mega menus on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.has-mega') && !e.target.closest('.mega-menu-wrapper')) {
        document.querySelectorAll('.has-mega').forEach(el => el.classList.remove('open'));
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

  let logoSrc = '/img/logo.png';
  if (media?.logo) {
    logoSrc = media.logo.startsWith('/') ? media.logo : '/' + media.logo;
  }

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="site-header">
        <div className="container header-inner">
          {/* Logo */}
          <Link to="/" className="site-logo" aria-label="Top Precision Manufacturing – Home" onClick={closeMobileNav}>
            <img src={logoSrc} alt="Top Precision Manufacturing Sdn Bhd" className="logo-img" />
            <span className="logo-wordmark">
              TOP <span>PRECISION</span>
              <span className="logo-sub-text">Manufacturing Sdn Bhd</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="main-nav" aria-label="Main navigation">
            <ul className="nav-items">
              {navVisibility?.home?.visible && (
                <li><Link to="/" className={`nav-link ${page === 'index' ? 'active' : ''}`}>Home</Link></li>
              )}

              {navVisibility?.about?.visible && (
                <li className="has-mega">
                  <Link to="/about" className={`nav-link ${page === 'about' ? 'active' : ''}`}>
                    About Us
                    <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                  </Link>
                  <div className={`mega-menu-wrapper ${scrolled ? 'scrolled-offset' : ''}`} id="mega-about">
                    <div className="container">
                      <div className="mega-inner">
                        <div className="mega-preview">
                          <img src="/img/hero-cnc.jpg" alt="About Top Precision" />
                          <div className="mega-preview-caption">Top Precision Manufacturing — Shah Alam, Selangor</div>
                        </div>
                        <div className="mega-links">
                          <div className="mega-section-title">About Top Precision Manufacturing</div>
                          <ul className="mega-list">
                            <li>
                              <Link to="/about#overview" className="mega-item">
                                <span className="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg></span>
                                <span><span className="mega-item-title">About Company</span><span className="mega-item-desc">Company overview, who we are, and our manufacturing capabilities.</span></span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/about#history" className="mega-item">
                                <span className="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
                                <span><span className="mega-item-title">Company History & Milestones</span><span className="mega-item-desc">Our founding story, key achievements, and growth from tool shop to contract manufacturer.</span></span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/about#values" className="mega-item">
                                <span className="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>
                                <span><span className="mega-item-title">Vision, Mission & Values</span><span className="mega-item-desc">The principles driving every decision at Top Precision.</span></span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/about#environment" className="mega-item">
                                <span className="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22V8M5 12c2-4 7-7 7-7s5 3 7 7M3 22h18"/></svg></span>
                                <span><span className="mega-item-title">Environmental Responsibility</span><span className="mega-item-desc">Our commitment to sustainable and responsible manufacturing practices.</span></span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              {navVisibility?.services?.visible && (
                <li className="has-mega">
                  <Link to="/capabilities" className={`nav-link ${page === 'capabilities' ? 'active' : ''}`}>
                    Services
                    <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                  </Link>
                  <div className={`mega-menu-wrapper ${scrolled ? 'scrolled-offset' : ''}`} id="mega-services">
                    <div className="container">
                      <div className="mega-inner">
                        <div className="mega-preview">
                          <img src="/img/hero-cnc.jpg" alt="Manufacturing Services" />
                          <div className="mega-preview-caption">CNC Machining & Precision Fabrication</div>
                        </div>
                        <div className="mega-links">
                          <div className="mega-section-title">Manufacturing Capabilities</div>
                          <ul className="mega-list two-col">
                            {services && services.map((navService, idx) => (
                              <li key={idx}>
                                <Link to={`/${navService.slug || navService.link?.replace('.html', '')}`} className="mega-item">
                                  <span className="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
                                  <span><span className="mega-item-title">{navService.name}</span><span className="mega-item-desc">{navService.shortDescription || navService.description}</span></span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              {navVisibility?.quality?.visible && (
                <li className="has-mega">
                  <Link to="#" className={`nav-link ${page === 'quality' ? 'active' : ''}`}>
                    Quality
                    <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                  </Link>
                  <div className={`mega-menu-wrapper ${scrolled ? 'scrolled-offset' : ''}`} id="mega-quality">
                    <div className="container">
                      <div className="mega-inner">
                        <div className="mega-preview">
                          <img src="/img/cap-quality.jpg" alt="Quality Assurance" />
                          <div className="mega-preview-caption">Top Precision Quality Standards</div>
                        </div>
                        <div className="mega-links">
                          <div className="mega-section-title">Quality Assurance</div>
                          <ul className="mega-list">
                            <li>
                              <Link to="/certificates" className="mega-item">
                                <span className="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>
                                <span><span className="mega-item-title">Certifications</span><span className="mega-item-desc">ISO 9001, IATF 16949, ISO 13485, and other key milestones.</span></span>
                              </Link>
                            </li>
                            <li>
                              <Link to="/policies" className="mega-item">
                                <span className="mega-item-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
                                <span><span className="mega-item-title">Company Policies</span><span className="mega-item-desc">Quality, EHS, ISMS, BCM, and RBA Commitments.</span></span>
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )}

              {navVisibility?.facilities?.visible && (
                <li><Link to="/facilities" className={`nav-link ${page === 'facilities' ? 'active' : ''}`}>Facilities</Link></li>
              )}
              {navVisibility?.careers?.visible && (
                <li><Link to="/careers" className={`nav-link ${page === 'careers' ? 'active' : ''}`}>Careers</Link></li>
              )}
              {navVisibility?.contact?.visible && (
                <li className="nav-cta-item"><Link to="/contact" className="btn btn-primary btn-header-cta" id="header-cta">Contact Us</Link></li>
              )}
              
              <li className="nav-lang-item">
                <div className="lang-toggle" id="lang-toggle-header">
                  <button className="lang-btn active" data-lang="en" onClick={() => setLang('en')}>EN</button>
                  <span className="lang-divider">|</span>
                  <button className="lang-btn" data-lang="zh" onClick={() => setLang('zh')}>CN</button>
                </div>
              </li>
            </ul>
          </nav>

          {/* Hamburger */}
          <button className={`hamburger ${mobileOpen ? 'active' : ''}`} id="hamburger" aria-label="Toggle menu" aria-expanded={mobileOpen} onClick={toggleMobileNav}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* MOBILE NAV */}
      <nav className={`mobile-nav ${mobileOpen ? 'open' : ''}`} id="mobile-nav" aria-label="Mobile navigation">
        <div className="mobile-nav-section">
          {navVisibility?.home?.visible && (
            <Link to="/" className="mobile-nav-link" onClick={closeMobileNav}>Home</Link>
          )}
          
          {navVisibility?.about?.visible && (
            <>
              <div className="mobile-nav-label">About Us</div>
              <Link to="/about" className="mobile-nav-sublink" onClick={closeMobileNav}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                About Company
              </Link>
              <Link to="/about#history" className="mobile-nav-sublink" onClick={closeMobileNav}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                Company History & Milestones
              </Link>
              <Link to="/about#values" className="mobile-nav-sublink" onClick={closeMobileNav}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Vision, Mission & Values
              </Link>
            </>
          )}

          {navVisibility?.services?.visible && (
            <>
              <div className="mobile-nav-label">Services</div>
              {services && services.map((navService, idx) => (
                <Link key={idx} to={`/${navService.slug || navService.link?.replace('.html', '')}`} className="mobile-nav-sublink" onClick={closeMobileNav}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {navService.name}
                </Link>
              ))}
            </>
          )}

          <div className="mobile-nav-label">More</div>
          
          {navVisibility?.quality?.visible && (
            <>
              <div className="mobile-nav-label" style={{marginTop: '12px'}}>Quality Assurance</div>
              <Link to="/certificates" className="mobile-nav-sublink" onClick={closeMobileNav}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Certifications
              </Link>
              <Link to="/policies" className="mobile-nav-sublink" onClick={closeMobileNav}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Company Policies
              </Link>
            </>
          )}
          
          {navVisibility?.facilities?.visible && (
            <Link to="/facilities" className="mobile-nav-link" onClick={closeMobileNav}>Facilities</Link>
          )}
          {navVisibility?.careers?.visible && (
            <Link to="/careers" className="mobile-nav-link" onClick={closeMobileNav}>Careers</Link>
          )}
        </div>
        
        <div className="mobile-cta">
          {navVisibility?.contact?.visible && (
            <Link to="/contact" className="btn btn-primary btn-header-cta" onClick={closeMobileNav}>Contact Us</Link>
          )}
          <div className="lang-toggle" id="lang-toggle-mobile" style={{marginTop: '16px', justifyContent: 'center', display: 'flex'}}>
            <button className="lang-btn active" data-lang="en" onClick={() => setLang('en')}>EN</button>
            <span className="lang-divider">|</span>
            <button className="lang-btn" data-lang="zh" onClick={() => setLang('zh')}>CN</button>
          </div>
        </div>
      </nav>
    </>
  );
}
