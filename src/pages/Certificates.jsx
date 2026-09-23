import React from 'react';
import PageHero from '../components/PageHero';
import { certificates } from '../content';

export default function Certificates() {
  const milestones = [
    { year: '1992', title: 'ISO 9002:1987', desc: 'Quality Management System' },
    { year: '2000', title: 'ISO 14001:1996', desc: 'Environmental Management System' },
    { year: '2002', title: 'ISO 9001:2000', desc: 'QMS Upgrade' },
    { year: '2009', title: 'OHSAS 18001', desc: 'Occupational Health & Safety' },
    { year: '2013', title: 'Sony Green Partner', desc: 'Environmental Quality' },
    { year: '2018', title: 'ISO 9001:2015', desc: 'QMS & EMS Upgrade' },
    { year: '2019', title: 'ISO/IEC 27001', desc: 'Information Security Management' },
    { year: '2021', title: 'IATF 16949', desc: 'Automotive Quality Management' },
    { year: '2022', title: 'ISO 22301', desc: 'Business Continuity Management' }
  ];

  return (
    <main className="page-main">
      <PageHero data={{
        image: 'img/cap-quality.jpg',
        title: 'Our <span class="accent">Certifications</span>',
        breadcrumb: 'Certifications'
      }} />
      
      <div className="container">
        <div className="cert-quick-stats reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '-60px', position: 'relative', zIndex: 10 }}>
          <div className="cert-stat-card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-lg)', transition: 'transform 0.3s ease' }}>
            <div className="cert-stat-icon" style={{ color: 'var(--accent)', marginBottom: '20px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '32px', height: '32px' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            </div>
            <div className="cert-stat-val" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>ISO 9001:2015</div>
            <div className="cert-stat-desc" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>Certified Quality Management System</div>
          </div>
          
          <div className="cert-stat-card reveal-d1" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-lg)', transition: 'transform 0.3s ease' }}>
            <div className="cert-stat-icon" style={{ color: 'var(--accent)', marginBottom: '20px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '32px', height: '32px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div className="cert-stat-val" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>100% Traceability</div>
            <div className="cert-stat-desc" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>Full material and process tracking</div>
          </div>
          
          <div className="cert-stat-card reveal-d2" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-lg)', transition: 'transform 0.3s ease' }}>
            <div className="cert-stat-icon" style={{ color: 'var(--accent)', marginBottom: '20px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '32px', height: '32px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <div className="cert-stat-val" style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '8px' }}>Annual Audits</div>
            <div className="cert-stat-desc" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>Consistently passing external reviews</div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .cert-stat-card:hover { transform: translateY(-5px) !important; }
        
        .timeline-container { position: relative; max-width: 800px; margin: 60px auto 0; padding: 40px 0; }
        .timeline-container::before { content: ''; position: absolute; top: 0; left: 50%; width: 2px; height: 100%; background: var(--border); transform: translateX(-50%); }
        .timeline-item { position: relative; display: flex; align-items: center; justify-content: space-between; margin-bottom: 60px; clear: both; }
        .timeline-item:nth-child(even) { flex-direction: row-reverse; }
        
        .timeline-dot {
          position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);
          width: 20px; height: 20px; border-radius: 50%; background: var(--surface);
          border: 4px solid var(--accent); box-shadow: 0 0 0 4px rgba(232,160,32,0.1); z-index: 2;
        }
        
        .timeline-content {
          width: 45%; background: var(--bg-2); padding: 32px; border-radius: var(--radius-lg);
          border: 1px solid var(--border); position: relative; transition: all 0.3s ease;
          box-shadow: var(--shadow-sm);
        }
        .timeline-content:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: rgba(232, 160, 32, 0.3); }
        
        .timeline-year {
          display: inline-block; padding: 6px 14px; background: rgba(232,160,32,0.1);
          color: var(--accent); font-weight: 800; font-family: var(--font-mono); font-size: 1.1rem;
          border-radius: var(--radius); margin-bottom: 16px;
        }
        .timeline-title { font-size: 1.3rem; font-weight: 800; color: var(--text); margin-bottom: 8px; }
        .timeline-desc { font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; }

        @media (max-width: 768px) {
          .timeline-container::before { left: 30px; }
          .timeline-dot { left: 30px; }
          .timeline-item { flex-direction: column !important; align-items: flex-start; justify-content: flex-start; }
          .timeline-content { width: calc(100% - 70px); margin-left: 70px; }
        }

        .premium-sijil-grid {
          display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 32px; margin-top: 40px;
        }
        .premium-sijil-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg);
          overflow: hidden; box-shadow: var(--shadow-md); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; group: hover;
        }
        .premium-sijil-card:hover {
          transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.1); border-color: rgba(232, 160, 32, 0.3);
        }
        .premium-sijil-img-wrapper {
          width: 100%; height: 240px; background: var(--bg-2); display: flex; align-items: center; justify-content: center;
          padding: 30px; position: relative; overflow: hidden;
        }
        .premium-sijil-img-wrapper img {
          width: 100%; height: 100%; objectFit: contain; transition: transform 0.5s ease; filter: drop-shadow(0 10px 20px rgba(0,0,0,0.08));
        }
        .premium-sijil-card:hover .premium-sijil-img-wrapper img { transform: scale(1.05); }
        .premium-sijil-content { padding: 24px; }
        .premium-sijil-title { font-size: 1.25rem; fontWeight: 800; color: var(--text); marginBottom: 6px; }
        .premium-sijil-year { font-size: 0.9rem; fontWeight: 600; color: var(--accent); letterSpacing: 0.05em; textTransform: uppercase; }

        .hide-on-mobile { display: block; }
        @media (max-width: 768px) { .hide-on-mobile { display: none; } }
      `}} />

      <section className="page-content" style={{ padding: '100px 0 80px' }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center' }}>
            <span className="section-tag">History</span>
            <h2>Certification <span className="accent">Milestones</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '16px auto 0', lineHeight: 1.6 }}>Our commitment to quality is continuously validated by international standards.</p>
          </div>

          <div className="timeline-container">
            {milestones.map((m, index) => {
              const revealClass = index % 2 === 0 ? 'reveal-left' : 'reveal-right';
              return (
                <div key={index} className="timeline-item reveal">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <div className="timeline-year">{m.year}</div>
                    <div className="timeline-title">{m.title}</div>
                    <div className="timeline-desc">{m.desc}</div>
                  </div>
                  <div style={{ width: '45%' }} className="hide-on-mobile"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="page-content" style={{ padding: '60px 0 100px', background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header reveal" style={{ textAlign: 'center' }}>
            <span className="section-tag">Gallery</span>
            <h2>Official <span className="accent">Certificates</span></h2>
          </div>

          <div className="premium-sijil-grid">
            {certificates && certificates.length > 0 ? (
              certificates.map((cert, index) => {
                const delayClass = index % 3 === 1 ? 'reveal-d1' : (index % 3 === 2 ? 'reveal-d2' : '');
                return (
                  <div key={index} className={`premium-sijil-card reveal ${delayClass}`}>
                    <div className="premium-sijil-img-wrapper">
                      {cert.image ? (
                        <img src={(cert.image || '').replace(/^\/+/, '')} alt={cert.name || ''} />
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '12px' }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>
                          <span>Scan Pending</span>
                        </div>
                      )}
                    </div>
                    <div className="premium-sijil-content">
                      <div className="premium-sijil-title">{cert.name || ''}</div>
                      <div className="premium-sijil-year">{cert.issuer || ''} &bull; {cert.year || ''}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', width: '100%' }}>No certificates uploaded yet.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
