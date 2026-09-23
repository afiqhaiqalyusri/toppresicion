import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { services } from '../content';

export default function ServiceDetail() {
  const { slug } = useParams();

  const service = useMemo(() => {
    if (!services) return null;
    return services.find(s => {
      const s_slug = s.slug || (s.link || '').replace('.html', '');
      return s_slug === slug || s.id === slug;
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
        <section style={{ position: 'relative', zIndex: 10, marginTop: '-60px', padding: 0, background: 'transparent' }}>
          <div className="container">
            <div className="svc-stats-card">
              {service.stats.map((stat, idx) => (
                <div key={idx} className="svc-stat-item">
                  <div className="svc-stat-value">{stat.value || ''}</div>
                  <div className="svc-stat-label">{stat.label || ''}</div>
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
          background: var(--surface);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border-light);
          overflow: hidden;
        }
        .svc-stat-item {
          flex: 1;
          min-width: 0;
          padding: 24px;
          text-align: center;
          border-right: 1px solid var(--border-light);
          word-wrap: break-word;
          overflow-wrap: break-word;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 160px;
        }
        .svc-stat-item:last-child { 
          border-right: none; 
        }
        .svc-stat-value {
          color: var(--accent);
          font-size: clamp(1.6rem, 3vw, 2.5rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .svc-stat-label {
          color: var(--text-body);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          line-height: 1.4;
        }

        @media (max-width: 640px) {
          .svc-stat-item {
            padding: 16px 8px;
          }
          .svc-stat-value { 
            font-size: clamp(1.2rem, 5vw, 1.5rem);
            margin-bottom: 4px;
          }
          .svc-stat-label { 
            font-size: clamp(0.55rem, 2.2vw, 0.65rem);
            letter-spacing: 0.05em;
            line-height: 1.2;
          }
        }

        .machine-row:hover { background: var(--bg-2); }
        .related-cap-card:hover { border-color: var(--accent) !important; box-shadow: var(--shadow-md); }
        .related-cap-card:hover .rcap-title { color: var(--accent); }
        .related-cap-card:hover svg { transform: translateX(4px); }
        .svc-sticky-col { position: sticky; top: 120px; }
        @media (max-width: 900px) {
          .svc-overview-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .svc-sticky-col { position: static !important; }
        }
      `}} />

      <section style={{ padding: '80px 0', background: 'var(--bg)' }}>
        <div className="container">
          <div className="svc-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start', marginBottom: '80px' }}>
            <div className="reveal">
              <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)', marginBottom: '16px' }}>Overview</div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, marginBottom: '24px', color: 'var(--text)', letterSpacing: '-0.02em' }}>Capability Details</h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'var(--text-body)' }} dangerouslySetInnerHTML={{__html: service.overview || service.pageDescription || service.content || ''}}></p>

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
              <div style={{ aspectRatio: '4/3', overflow: 'hidden', background: 'var(--bg-2)', borderRadius: 'var(--radius-md)' }}>
                <img src={`/${service.supportingImage || service.heroImage || 'img/hero-cnc.jpg'}`} alt={service.name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <Link to={`/contact?service=${encodeURIComponent(service.name || '')}`} style={{ display: 'block', textAlign: 'center', marginTop: '20px', padding: '16px 32px', background: 'var(--accent)', color: '#fff', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.04em', textDecoration: 'none', textTransform: 'uppercase', border: 'none', borderRadius: '50px', transition: 'background 0.2s', boxShadow: '0 4px 12px rgba(13,110,253,0.3)' }}>Request a Quote for This Service</Link>
            </div>
          </div>

          {service.machines && service.machines.length > 0 && (
            <div className="reveal" style={{ marginBottom: '80px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '32px', paddingBottom: '16px', borderBottom: '2px solid var(--text)' }}>
                <h2 style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', margin: 0 }}>Machine Specifications</h2>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{service.machines.length} units listed</span>
              </div>
              <div style={{ overflowX: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'var(--surface)', minWidth: '700px' }}>
                  <thead style={{ background: 'var(--bg-2)' }}>
                    <tr>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Machine</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Brand / Model</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Axis</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Working Area</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Tolerance</th>
                      <th style={{ padding: '14px 20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', borderBottom: '2px solid var(--border)' }}>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.machines.map((machine, idx) => (
                      <tr key={idx} className="machine-row" style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '16px 20px', fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>{machine.name || ''}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-body)', fontSize: '0.9rem' }}>{machine.brand || ''} {machine.model || ''}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-body)', fontSize: '0.9rem' }}>{machine.axis || ''}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-body)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{machine.workingArea || ''}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--accent)', fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 700 }}>{machine.tolerance || ''}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text)', fontWeight: 700, fontSize: '0.9rem' }}>{machine.quantity || ''}</td>
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
                      <img src={`/${rel.heroImage || rel.image || 'img/hero-cnc.jpg'}`} alt={rel.name || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
