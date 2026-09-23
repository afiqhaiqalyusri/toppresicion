import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { capabilitiesOverview, services, homeCta } from '../content';

export default function Capabilities() {
  const heroImage = capabilitiesOverview?.heroImage ? `/${capabilitiesOverview.heroImage}` : '/img/hero-cnc.jpg';
  const heroTitle = capabilitiesOverview?.heroTitle || 'Manufacturing Capabilities';
  const heroDesc = capabilitiesOverview?.description || 'We deliver comprehensive manufacturing solutions.';

  return (
    <main className="page-main">
      <PageHero data={{
        image: heroImage,
        title: heroTitle,
        breadcrumb: heroTitle,
        description: heroDesc
      }} />

      <section className="page-content" style={{ padding: 'clamp(60px, 10vw, 100px) 0', background: 'var(--bg)' }}>
        <div className="container">
          <div className="cap-grid">
            {services && services.length > 0 ? (
              services.map((service, index) => {
                const delayClass = index % 3 === 1 ? 'reveal-d1' : (index % 3 === 2 ? 'reveal-d2' : '');
                const link = `/${(service.slug || service.link || '').replace('.html', '').replace(/^\/+/, '')}`;
                return (
                  <Link key={index} to={link} className={`cap-tile reveal ${delayClass}`} style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', textDecoration: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', aspectRatio: 'auto', height: '100%' }}>
                    <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                      <img src={(service.heroImage || service.image || '').replace(/^\/+/, '')} alt={service.name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }} />
                    </div>
                    <div style={{ padding: 'clamp(24px, 5vw, 32px) clamp(16px, 5vw, 24px)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h3 style={{ fontSize: 'clamp(1.15rem, 4vw, 1.25rem)', fontWeight: 800, color: 'var(--text)', margin: '0 0 12px 0', fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>{service.name || ''}</h3>
                      <p style={{ fontSize: 'clamp(0.9rem, 3vw, 0.95rem)', color: 'var(--text-body)', lineHeight: 1.6, margin: '0 0 24px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>{service.shortDescription || service.description || ''}</p>
                      <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
                        Explore Capability
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>No manufacturing capabilities found.</p>
            )}
          </div>
        </div>
      </section>

      <section className="cta-band" id="cta" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(80px, 12vw, 120px) 0' }}>
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

      <style dangerouslySetInnerHTML={{__html: `
        .cap-tile:hover {
          box-shadow: var(--shadow-lg) !important;
          transform: translateY(-4px);
          border-color: var(--accent) !important;
        }
        .cap-tile:hover .cap-tile-img {
          transform: scale(1.05);
        }
        .cap-tile:hover .cap-tile-overlay {
          background: transparent !important;
        }
        .cap-tile:hover .cap-tile-title {
          color: var(--accent) !important;
        }
        .cap-tile:hover .cap-tile-arrow svg {
          transform: translateX(4px);
        }
      `}} />
    </main>
  );
}
