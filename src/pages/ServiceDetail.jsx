import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { services } from '../content';

function renderIcon(iconName, size = 26) {
  switch (iconName) {
    case 'package':
    case 'box':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
      );
    case 'gear':
    case 'cog':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      );
    case 'users':
    case 'team':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'layers':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    case 'circuit':
    case 'chip':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <circle cx="8" cy="8" r="1.5" />
          <path d="M8 9.5V15" />
          <circle cx="16" cy="16" r="1.5" />
          <path d="M16 14.5V9" />
          <circle cx="12" cy="12" r="1.5" />
          <path d="M9.5 8H15" />
          <path d="M9 4V2M15 4V2M9 22v-2M15 22v-2M4 9H2M4 15H2M22 9h-2M22 15h-2" />
        </svg>
      );
    case 'target':
    case 'crosshair':
    case 'precision':
    case 'tolerance':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="22" y1="12" x2="18" y2="12" />
          <line x1="6" y1="12" x2="2" y2="12" />
          <line x1="12" y1="6" x2="12" y2="2" />
          <line x1="12" y1="22" x2="12" y2="18" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'dimensions':
    case 'maximize':
    case 'size':
    case 'ruler':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
          <path d="M3 8V5a2 2 0 0 1 2-2h3" />
          <path d="M21 16v3a2 2 0 0 1-2 2h-3" />
          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
        </svg>
      );
    case 'search':
    case 'aoi':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function ServiceDetail() {
  const { slug } = useParams();

  const service = useMemo(() => {
    if (!services) return null;
    return services.find(s => {
      const s_slug = s.slug || (s.link || '').replace('.html', '');
      return s_slug === slug || s.id === slug || (s_slug === 'box-build-assembly' && slug === 'sheet-metal-box-build');
    });
  }, [slug]);

  if (!service) {
    return <Navigate to="/404" replace />;
  }

  const relatedItems = useMemo(() => {
    if (!service.relatedCapabilityIds || !services) return [];
    return service.relatedCapabilityIds.map(id => {
      return services.find(s => {
        const s_slug = s.slug || (s.link || '').replace('.html', '');
        return s_slug === id || s.id === id;
      });
    }).filter(Boolean);
  }, [service]);

  return (
    <main className="page-main">
      <PageHero data={{
        image: service.heroImage || service.image || 'img/hero-cnc.jpg',
        title: service.name || '',
        breadcrumb: service.name || '',
        parentLabel: 'Capabilities',
        parentHref: '/capabilities'
      }} />

      {service.stats && service.stats.length > 0 && (
        <section style={{ position: 'relative', zIndex: 10, marginTop: '-36px', padding: 0, background: 'transparent' }}>
          <div className="container">
            <div className="svc-stats-card">
              {service.stats.map((stat, idx) => (
                <div key={idx} className={`svc-stat-item ${stat.icon ? 'has-icon' : ''}`}>
                  {stat.icon && (
                    <div className="svc-stat-icon-wrap">
                      {renderIcon(stat.icon, 20)}
                    </div>
                  )}
                  <div className="svc-stat-text-wrap">
                    <div className="svc-stat-value">{stat.value || ''}</div>
                    <div className="svc-stat-label">{stat.label || ''}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        .svc-stats-card {
          display: flex;
          flex-wrap: nowrap;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          overflow: hidden;
          max-width: 860px;
          margin: 0 auto;
        }
        .svc-stat-item {
          flex: 1;
          min-width: 0;
          padding: 12px 18px;
          border-right: 1px solid #edf2f7;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          min-height: 72px;
        }
        .svc-stat-item:last-child { 
          border-right: none; 
        }
        .svc-stat-item.has-icon {
          flex-direction: row;
          align-items: center;
          justify-content: center;
          text-align: left;
          gap: 12px;
          padding: 12px 18px;
        }
        .svc-stat-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a56db;
          flex-shrink: 0;
        }
        .svc-stat-text-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
        }
        .svc-stat-item:not(.has-icon) .svc-stat-text-wrap {
          align-items: center;
          text-align: center;
        }
        .svc-stat-value {
          color: #1a56db;
          font-size: clamp(1.05rem, 1.3vw, 1.28rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 2px;
          white-space: nowrap;
        }
        .svc-stat-label {
          color: #475569;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          line-height: 1.25;
          max-width: 170px;
        }

        @media (max-width: 768px) {
          .svc-stats-card {
            flex-direction: column;
            max-width: 100%;
          }
          .svc-stat-item {
            border-right: none;
            border-bottom: 1px solid #edf2f7;
            padding: 12px 16px;
            min-height: auto;
          }
          .svc-stat-item:last-child {
            border-bottom: none;
          }
          .svc-stat-item.has-icon {
            justify-content: flex-start;
            padding-left: 24px;
          }
        }

        .svc-overview-eyebrow {
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: #1a56db;
          margin-bottom: 14px;
        }
        .svc-overview-heading {
          font-size: clamp(1.8rem, 2.8vw, 2.45rem);
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.025em;
          line-height: 1.18;
          margin-bottom: 22px;
        }
        .svc-overview-desc {
          font-size: 1rem;
          line-height: 1.8;
          color: #475569;
        }

        .svc-features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 36px;
          padding-top: 20px;
        }
        .svc-feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .svc-feature-icon-box {
          width: 58px;
          height: 58px;
          border-radius: 14px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a56db;
          margin-bottom: 12px;
          box-shadow: 0 2px 6px rgba(26, 86, 219, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .svc-feature-item:hover .svc-feature-icon-box {
          transform: translateY(-2px);
          box-shadow: 0 6px 14px rgba(26, 86, 219, 0.12);
        }
        .svc-feature-name {
          font-size: 0.8rem;
          font-weight: 700;
          color: #1e293b;
          line-height: 1.35;
          max-width: 105px;
        }

        @media (max-width: 560px) {
          .svc-features-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px 16px;
          }
        }

        .svc-image-box {
          aspect-ratio: 16 / 10.5;
          overflow: hidden;
          border-radius: 16px;
          background: var(--bg-2);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.07);
        }
        .svc-image-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .svc-quote-pill-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          margin-top: 20px;
          padding: 16px 28px;
          background: #1a56db;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.84rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 9999px;
          transition: all 0.25s ease;
          box-shadow: 0 6px 18px rgba(26, 86, 219, 0.35);
        }
        .svc-quote-pill-btn:hover {
          background: #1e40af;
          color: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 8px 22px rgba(26, 86, 219, 0.45);
        }
        .svc-quote-btn-arrow {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }
        .svc-quote-pill-btn:hover .svc-quote-btn-arrow {
          transform: translateX(3px);
        }

        .machine-row:hover { background: var(--bg-2); }
        .related-cap-card:hover { border-color: #1a56db !important; box-shadow: var(--shadow-md); }
        .related-cap-card:hover .rcap-title { color: #1a56db; }
        .related-cap-card:hover svg { transform: translateX(4px); }
        .svc-sticky-col { position: sticky; top: 120px; }
        @media (max-width: 900px) {
          .svc-overview-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .svc-sticky-col { position: static !important; }
        }
      `}} />

      <section style={{ padding: '80px 0', background: 'var(--bg)' }}>
        <div className="container">
          <div className="svc-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '70px', alignItems: 'start', marginBottom: '80px' }}>
            <div className="reveal">
              <div className="svc-overview-eyebrow">Overview</div>
              <h2 className="svc-overview-heading">{service.overviewTitle || service.name || 'Capability Details'}</h2>
              <p className="svc-overview-desc" dangerouslySetInnerHTML={{__html: service.overview || service.pageDescription || service.content || ''}}></p>

              {service.features && service.features.length > 0 && (
                <div className="svc-features-grid">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="svc-feature-item">
                      <div className="svc-feature-icon-box">
                        {renderIcon(feat.icon, 26)}
                      </div>
                      <div className="svc-feature-name">
                        {feat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {service.materials && service.materials.length > 0 && (
                <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-muted)', marginBottom: '14px' }}>{service.materialsTitle || 'Materials Processed'}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {service.materials.map((material, idx) => (
                      <span key={idx} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', padding: '6px 14px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-body)', borderRadius: 'var(--radius)' }}>{material}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="reveal reveal-d1 svc-sticky-col">
              <div className="svc-image-box">
                <img src={(service.supportingImage || service.heroImage || 'img/hero-cnc.jpg').replace(/^\/+/, '')} alt={service.name || ''} />
              </div>
              <Link to={`/contact?service=${encodeURIComponent(service.name || '')}`} className="svc-quote-pill-btn">
                <span>Request a Quote for This Service</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="svc-quote-btn-arrow">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>

          {service.machines && service.machines.length > 0 && (
            <div className="reveal" style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '32px', paddingBottom: '16px', borderBottom: '2px solid var(--text)' }}>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', margin: 0 }}>Machine Specifications</h2>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{service.machines.length} units listed</span>
              </div>
              <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'var(--surface)', minWidth: '600px' }}>
                  <thead style={{ background: 'var(--bg-2)' }}>
                    <tr>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Machine</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Brand / Model</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Axis</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Tolerance</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.machines.map((machine, idx) => (
                      <tr key={idx} className="machine-row" style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>{machine.name || ''}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-body)', fontSize: '0.9rem', fontWeight: 600 }}>{machine.brand || ''} {machine.model || ''}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-body)', fontSize: '0.9rem' }}>{machine.axis || ''}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--accent)', fontFamily: 'monospace', fontSize: '0.9rem', fontWeight: 700 }}>{machine.tolerance || ''}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text)', fontWeight: 700, fontSize: '0.95rem' }}>{machine.quantity || ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {relatedItems.length > 0 && (
            <div className="reveal" style={{ paddingTop: '48px', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '12px' }}>You May Also Need</div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '32px' }}>Related Capabilities</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {relatedItems.map((rel, idx) => (
                  <Link key={idx} to={`/${rel.slug || rel.id || ''}`} className="related-cap-card" style={{ display: 'flex', alignItems: 'center', gap: '20px', textDecoration: 'none', padding: '24px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', transition: 'all 0.25s ease' }}>
                    <div style={{ width: '68px', height: '68px', overflow: 'hidden', flexShrink: 0, background: 'var(--bg-2)', borderRadius: 'var(--radius)' }}>
                      <img src={(rel.heroImage || rel.image || 'img/hero-cnc.jpg').replace(/^\/+/, '')} alt={rel.name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="rcap-title" style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '4px', fontSize: '1rem', transition: 'color 0.2s' }}>{rel.name || ''}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{rel.shortDescription || ''}</div>
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px', flexShrink: 0, color: 'var(--accent)', transition: 'transform 0.2s ease' }}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
