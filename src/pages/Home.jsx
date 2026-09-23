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
              <img src={`/${homeWhoWeAre?.image || ''}`} alt="Who We Are" />
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

      <section className="feature-section" id="feature">
        <div className="container">
          <div className="feature-grid">
            <div className="feature-image reveal">
              <img src={`/${whyChooseUs?.image || ''}`} alt="Engineering &amp; Design Support" />
            </div>
            <div className="feature-text reveal reveal-d1">
              <span className="section-tag">{whyChooseUs?.tagline || ''}</span>
              <h2 dangerouslySetInnerHTML={{ __html: whyChooseUs?.title || '' }}></h2>
              <p>{whyChooseUs?.description || ''}</p>
              <div className="value-props">
                {whyChooseUs?.features && whyChooseUs.features.map((feature, idx) => (
                  <div key={idx} className={`value-prop reveal ${idx % 2 === 0 ? 'reveal-d1' : 'reveal-d2'}`}>
                    <div className="value-prop-icon" dangerouslySetInnerHTML={{ __html: feature.icon || '' }}></div>
                    <div>
                      <div className="value-prop-title">{feature.title || ''}</div>
                      <p>{feature.description || ''}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-40">
                <Link to="/capabilities" className="btn btn-primary">View All Services</Link>
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
