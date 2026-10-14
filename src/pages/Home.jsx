import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Card from '../components/Card';
import {
  company,
  hero,
  homeWhoWeAre,
  homeCapabilities,
  whyChooseUs,
  homeIndustries,
  sectors,
  homeCta,
  services
} from '../content';

export default function Home() {
  const currentYear = new Date().getFullYear();
  const establishedYear = company?.established ? parseInt(company.established.slice(-4)) : currentYear;
  const yearsInOperation = currentYear - establishedYear;

  return (
    <main>
      <Hero data={hero} />

      <section className="stats-bar" id="stats">
        <div className="container">
          <div className="stats-grid">
            {company?.established && (
              <div className="stat-item reveal">
                <div className="stat-number">{yearsInOperation}+</div>
                <div className="stat-label">Years in Operation</div>
                <div className="stat-sublabel">Established {company.established}</div>
              </div>
            )}
            
            {company?.facilitySize && (
              <div className="stat-item reveal reveal-d1">
                <div className="stat-number">{company.facilitySize}</div>
                <div className="stat-label">sq ft Facility</div>
                <div className="stat-sublabel">Climate-controlled production floor</div>
              </div>
            )}
            
            {company?.employees && (
              <div className="stat-item reveal reveal-d2">
                <div className="stat-number">{company.employees}</div>
                <div className="stat-label">Employees</div>
                <div className="stat-sublabel">Skilled engineers &amp; technicians</div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="intro-split" id="about-preview">
        <div className="container">
          <div className="intro-split-grid">
            <div className="intro-image-wrap reveal">
              <img src={(homeWhoWeAre?.image || '').replace(/^\/+/, '')} alt="Who We Are" />
            </div>
            <div className="intro-text reveal reveal-d1">
              <span className="section-tag">{homeWhoWeAre?.tagline || ''}</span>
              <h2 dangerouslySetInnerHTML={{ __html: homeWhoWeAre?.title || '' }}></h2>
              <p>{homeWhoWeAre?.body1 || ''}</p>
              <p>{homeWhoWeAre?.body2 || ''}</p>
              <Link to="/about" className="read-more">
                Learn About Us
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities-section" id="capabilities" style={{ paddingBottom: '80px' }}>
        <div className="container home-capabilities-container">
          <div className="section-header reveal" style={{ marginBottom: '64px' }}>
            <span className="section-tag">{homeCapabilities?.tagline || ''}</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: homeCapabilities?.title || '' }}></h2>
            <p style={{ fontSize: '1.15rem', maxWidth: '700px', margin: '0 auto' }}>{homeCapabilities?.description || ''}</p>
          </div>
          <div className={`cap-grid cap-grid-${services?.length || 0}`}>
            {services && services.map((service, index) => {
              const delayClass = index % 4 === 1 ? 'reveal-d1' : (index % 4 === 2 ? 'reveal-d2' : (index % 4 === 3 ? 'reveal-d3' : ''));
              return (
                <Card key={index} data={{
                  variant: 'capability',
                  image: service.heroImage || service.image || '',
                  title: service.name || '',
                  link: service.slug || service.id || service.link || '',
                  delayClass
                }} />
              );
            })}
          </div>
        </div>
      </section>

      <section className="feature-section" id="feature" style={{ padding: '90px 0', background: 'var(--bg)' }}>
        <div className="container">
          <style dangerouslySetInnerHTML={{__html: `
            .modern-feature-grid {
              display: grid;
              grid-template-columns: 0.9fr 1.1fr;
              gap: 64px;
              align-items: center;
            }
            .modern-feature-image-wrap {
              position: relative;
              border-radius: 20px;
              overflow: hidden;
              border: 1px solid var(--border);
              box-shadow: 0 20px 40px -10px rgba(15, 23, 42, 0.12);
              background: var(--bg-2);
            }
            .modern-feature-image-wrap img {
              width: 100%;
              height: 100%;
              min-height: 520px;
              max-height: 600px;
              object-fit: cover;
              display: block;
            }
            .modern-value-props {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 16px;
              margin-top: 28px;
              margin-bottom: 36px;
            }
            .modern-value-card {
              background: #ffffff;
              border: 1px solid #e2e8f0;
              border-radius: 14px;
              padding: 18px;
              display: flex;
              gap: 14px;
              align-items: flex-start;
              box-shadow: 0 2px 8px rgba(15, 23, 42, 0.02);
              transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .modern-value-card:hover {
              transform: translateY(-2px);
              border-color: #bfdbfe;
              box-shadow: 0 10px 24px -4px rgba(26, 86, 219, 0.08);
            }
            .modern-value-icon {
              width: 44px;
              height: 44px;
              border-radius: 12px;
              background: #eff6ff;
              border: 1px solid #dbeafe;
              color: #1a56db;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              transition: all 0.25s ease;
            }
            .modern-value-card:hover .modern-value-icon {
              background: #1a56db;
              color: #ffffff;
            }
            .modern-value-icon svg {
              width: 22px;
              height: 22px;
            }
            .modern-value-content {
              flex: 1;
              min-width: 0;
            }
            .modern-value-title {
              font-size: 0.95rem;
              font-weight: 700;
              color: #0f172a;
              margin-bottom: 4px;
              line-height: 1.3;
            }
            .modern-value-desc {
              font-size: 0.82rem;
              color: #64748b;
              line-height: 1.5;
              margin: 0;
            }
            .modern-feature-btn {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 15px 32px;
              background: #1a56db;
              color: #ffffff;
              border-radius: 9999px;
              font-weight: 700;
              font-size: 0.88rem;
              letter-spacing: 0.04em;
              text-transform: uppercase;
              text-decoration: none;
              transition: all 0.25s ease;
              box-shadow: 0 4px 14px rgba(26, 86, 219, 0.35);
            }
            .modern-feature-btn:hover {
              background: #1e40af;
              color: #ffffff;
              transform: translateY(-1px);
              box-shadow: 0 6px 20px rgba(26, 86, 219, 0.45);
            }
            .modern-feature-btn svg {
              transition: transform 0.2s ease;
            }
            .modern-feature-btn:hover svg {
              transform: translateX(3px);
            }
            @media (max-width: 992px) {
              .modern-feature-grid {
                grid-template-columns: 1fr;
                gap: 48px;
              }
              .modern-feature-image-wrap img {
                min-height: 380px;
                max-height: 440px;
              }
            }
            @media (max-width: 580px) {
              .modern-value-props {
                grid-template-columns: 1fr;
                gap: 12px;
              }
            }
          `}} />

          <div className="modern-feature-grid">
            <div className="modern-feature-image-wrap reveal">
              <img src={(whyChooseUs?.image || '').replace(/^\/+/, '')} alt="Engineering &amp; Design Support" />
            </div>
            <div className="modern-feature-text reveal reveal-d1">
              <span className="section-tag">{whyChooseUs?.tagline || 'Why Top Precision'}</span>
              <h2 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.75rem)', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.15, margin: '14px 0 18px' }} dangerouslySetInnerHTML={{ __html: whyChooseUs?.title || '' }}></h2>
              <p style={{ fontSize: '1.04rem', lineHeight: 1.75, color: 'var(--text-body)', margin: '0 0 28px' }}>{whyChooseUs?.description || ''}</p>
              
              <div className="modern-value-props">
                {whyChooseUs?.features && whyChooseUs.features.map((feature, idx) => (
                  <div key={idx} className="modern-value-card reveal">
                    <div className="modern-value-icon" dangerouslySetInnerHTML={{ __html: feature.icon || '' }}></div>
                    <div className="modern-value-content">
                      <div className="modern-value-title">{feature.title || ''}</div>
                      <p className="modern-value-desc">{feature.description || ''}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Link to="/capabilities" className="modern-feature-btn">
                  <span>View All Services</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="industries-section" id="industries">
        <div className="industries-header container text-center">
          <span className="section-tag reveal">{homeIndustries?.tagline || ''}</span>
          <h2 className="reveal reveal-d1">{homeIndustries?.title || ''}</h2>
          <p className="reveal reveal-d2">{homeIndustries?.description || ''}</p>
        </div>

        <div className="container reveal" style={{ marginTop: '48px', marginBottom: '48px' }}>
          <div className="sectors-grid">
            {sectors && sectors.map((sector, idx) => (
              <Card key={idx} data={{
                variant: 'sector',
                image: sector.image || '',
                title: sector.name || '',
                description: `Advanced manufacturing solutions for ${sector.name ? sector.name.toLowerCase() : ''}.`
              }} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" id="cta" style={{ position: 'relative', overflow: 'hidden', padding: '120px 0' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: "url('/img/cleanroom.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(10, 20, 40, 0.95) 0%, rgba(15, 30, 60, 0.8) 100%)', zIndex: 2 }}></div>
        
        <div className="container cta-band-content" style={{ position: 'relative', zIndex: 3 }}>
          <div className="cta-tag">{homeCta?.tagline || ''}</div>
          <div className="cta-headline-outline">{homeCta?.headlineOutline || ''}</div>
          <div className="cta-headline-solid">{homeCta?.headlineSolid || ''}</div>
          <p className="cta-body">{homeCta?.body || ''}</p>
          <div className="cta-actions">
            <Link to={`/${(homeCta?.primaryBtnLink || '').replace('.html', '')}`} className="btn btn-primary btn-lg">{homeCta?.primaryBtnText || ''}</Link>
            <a href={(homeCta?.secondaryBtnLink || '').replace('.html', '')} className="btn btn-outline-white btn-lg">{homeCta?.secondaryBtnText || ''}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
