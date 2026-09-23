import React from 'react';
import PageHero from '../components/PageHero';
import { company, services } from '../content';

export default function Facilities() {
  const facilitySize = company?.facilitySize || '45,000';
  const cncMachines = company?.cncMachines || '60';

  let allMachines = [];
  if (services && services.length > 0) {
    services.forEach(s => {
      if (s.machines && s.machines.length > 0) {
        s.machines.forEach(m => {
          allMachines.push(m);
        });
      }
    });
  }

  if (allMachines.length === 0) {
    allMachines = [
      { name: 'Vertical Machining Center', brand: 'Mazak', model: 'Variaxis i-700', axis: '5-Axis', workingArea: '850 x 700 x 600', tolerance: '±0.005mm', quantity: 5 },
      { name: 'Vertical Machining Center', brand: 'DMG Mori', model: 'CMX 1100 V', axis: '3-Axis', workingArea: '1100 x 560 x 510', tolerance: '±0.008mm', quantity: 12 },
      { name: 'CNC Turn-Mill Center', brand: 'Okuma', model: 'Multus B250II', axis: '9-Axis', workingArea: 'Ø600 x 750 (Z)', tolerance: '±0.005mm', quantity: 8 },
      { name: 'Swiss-Type Auto Lathe', brand: 'Star Micronics', model: 'SR-20R IV', axis: '7-Axis', workingArea: 'Ø20 x 205 (Z)', tolerance: '±0.002mm', quantity: 4 },
      { name: 'Coordinate Measuring Machine', brand: 'Zeiss', model: 'Contura 7/10/6', axis: 'N/A', workingArea: '700 x 1000 x 600', tolerance: '±0.0015mm', quantity: 2 }
    ];
  }

  return (
    <main className="page-main">
      <PageHero data={{
        image: 'img/hero-cnc.jpg',
        title: 'Facilities &amp; <span class="accent">Equipment</span>',
        breadcrumb: 'Facilities & Equipment'
      }} />

      <section className="page-content">
        <div className="service-detail-section" style={{ borderBottom: '1px solid var(--border)' }}>
          <div className="container cap-detail-grid">
            <div className="cap-detail-text reveal">
              <span className="cap-service-tag">Our Factory</span>
              <h2>Built for <span className="accent">Scale &amp; Speed</span></h2>
              <p>Our {facilitySize} sq ft climate-controlled facility in Shah Alam, Selangor houses over {cncMachines} advanced CNC machining centres, a dedicated quality laboratory, surface treatment bays, and a cleanroom-ready assembly area.</p>
              <ul className="detail-list">
                <li><strong>Milling:</strong> 3-Axis &amp; 4-Axis VMCs, 5-Axis VMCs</li>
                <li><strong>Turning:</strong> CNC Lathes with Live Tooling, Swiss-type Auto Lathes</li>
                <li><strong>Fabrication:</strong> Fiber Lasers, CNC Press Brakes</li>
                <li><strong>Metrology:</strong> CMMs, Optical Profilers</li>
              </ul>
              <div className="cap-spec-pills">
                <span className="cap-spec-pill">{facilitySize} sq ft</span>
                <span className="cap-spec-pill">{cncMachines}+ Machines</span>
                <span className="cap-spec-pill">Shah Alam, Selangor</span>
                <span className="cap-spec-pill">ISO Class 7 Cleanroom</span>
              </div>
            </div>

            <div className="cap-detail-image reveal reveal-d1">
              <img src="/img/cleanroom.jpg" alt="Top Precision Manufacturing facility floor" />
              <div className="cap-img-badge">
                <div className="cap-img-badge-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                </div>
                <div className="cap-img-badge-text">
                  <strong>{facilitySize} sq ft Facility</strong>
                  <span>Shah Alam, Selangor</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-2)', padding: '80px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="section-tag">Production Capacity</span>
              <h2 style={{ marginTop: '12px' }}>Scale Meets <span className="accent">Flexibility</span></h2>
            </div>
            <div className="facilities-stats-grid">
              <div className="stat-item reveal">
                <div className="stat-number">2M+</div>
                <div className="stat-label">Parts Annually</div>
                <div className="stat-sublabel">Across all production cells</div>
              </div>
              <div className="stat-item reveal reveal-d1">
                <div className="stat-number">5-7</div>
                <div className="stat-label">Day Prototype Lead Time</div>
                <div className="stat-sublabel">NPI rapid turnaround</div>
              </div>
              <div className="stat-item reveal reveal-d2">
                <div className="stat-number">1–10k</div>
                <div className="stat-label">Flexible Batch Sizes</div>
                <div className="stat-sublabel">Prototype to volume</div>
              </div>
              <div className="stat-item reveal reveal-d3">
                <div className="stat-number">98.6%</div>
                <div className="stat-label">On-Time Delivery</div>
                <div className="stat-sublabel">Proven OTD record</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '100px 0' }}>
          <div className="container">
            <div style={{ marginBottom: '50px', textAlign: 'center' }} className="reveal">
              <span className="section-tag">Equipment List</span>
              <h2 style={{ marginTop: '12px' }}>Equipment <span className="accent">Showcase</span></h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '680px', margin: '16px auto 0', lineHeight: 1.6 }}>Our continually updated machine park ensures we have the right spindle for every job, from micro-turning to large-format 5-axis milling.</p>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              .machine-grid {
                display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;
              }
              .machine-card {
                background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg);
                padding: 24px; box-shadow: var(--shadow-sm); transition: all 0.3s ease; position: relative;
                display: flex; flex-direction: column; height: 100%;
              }
              .machine-card:hover {
                transform: translateY(-6px); box-shadow: var(--shadow-lg); border-color: rgba(232, 160, 32, 0.3);
              }
              .machine-type { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); font-weight: 800; margin-bottom: 8px; }
              .machine-brand { font-size: 1.2rem; font-weight: 800; color: var(--text); margin-bottom: 4px; }
              .machine-model { font-size: 0.95rem; color: var(--text-muted); margin-bottom: 20px; font-weight: 500; flex-grow: 1; }
              .machine-specs {
                display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: var(--bg-2); padding: 16px; border-radius: var(--radius);
              }
              .machine-spec-item { display: flex; flex-direction: column; gap: 4px; }
              .machine-spec-label { font-size: 0.7rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600; letter-spacing: 0.05em; }
              .machine-spec-value { font-size: 0.9rem; font-weight: 700; color: var(--text); font-family: var(--font-mono); }
              .machine-qty {
                position: absolute; top: 24px; right: 24px; background: var(--bg-2); color: var(--text);
                font-size: 0.85rem; font-weight: 800; padding: 4px 10px; border-radius: 20px; border: 1px solid var(--border);
              }
            `}} />

            <div className="machine-grid">
              {allMachines.map((machine, i) => {
                const delay = (i % 3) === 1 ? 'reveal-d1' : ((i % 3) === 2 ? 'reveal-d2' : '');
                return (
                  <div key={i} className={`machine-card reveal ${delay}`}>
                    {machine.quantity && parseInt(machine.quantity) > 0 && (
                      <div className="machine-qty">x{machine.quantity}</div>
                    )}
                    <div className="machine-type">{machine.name || 'Machine Center'}</div>
                    <div className="machine-brand">{machine.brand || 'Unspecified'}</div>
                    <div className="machine-model">{machine.model || 'Model N/A'}</div>
                    
                    <div className="machine-specs">
                      <div className="machine-spec-item">
                        <span className="machine-spec-label">Axis</span>
                        <span className="machine-spec-value">{machine.axis || '-'}</span>
                      </div>
                      <div className="machine-spec-item">
                        <span className="machine-spec-label">Accuracy</span>
                        <span className="machine-spec-value" style={{ color: 'var(--accent)' }}>{machine.tolerance || '-'}</span>
                      </div>
                      <div className="machine-spec-item" style={{ gridColumn: 'span 2' }}>
                        <span className="machine-spec-label">Working Area (mm)</span>
                        <span className="machine-spec-value">{machine.workingArea || '-'}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div style={{ padding: '100px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '50px' }} className="reveal">
              <span className="section-tag">Photo Gallery</span>
              <h2 style={{ marginTop: '12px' }}>Inside <span className="accent">The Floor</span></h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '16px auto 0', fontSize: '1.05rem', lineHeight: 1.6 }}>A look inside our {facilitySize} sq ft production facility — where precision is engineered every day.</p>
            </div>

            <style dangerouslySetInnerHTML={{__html: `
              .masonry-gallery {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(2, 300px);
                gap: 20px;
              }
              .gallery-item {
                position: relative; border-radius: var(--radius-lg); overflow: hidden;
                box-shadow: var(--shadow-sm); background: var(--surface);
              }
              .gallery-item img {
                width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
              }
              .gallery-item:hover img { transform: scale(1.08); }
              .gallery-overlay {
                position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);
                opacity: 0; transition: opacity 0.4s ease; display: flex; align-items: flex-end; padding: 24px;
              }
              .gallery-item:hover .gallery-overlay { opacity: 1; }
              .gallery-caption { color: #fff; font-weight: 700; font-size: 1.1rem; transform: translateY(10px); transition: transform 0.4s ease; }
              .gallery-item:hover .gallery-caption { transform: translateY(0); }

              .item-featured { grid-column: span 2; grid-row: span 2; }
              
              @media (max-width: 900px) {
                .masonry-gallery { grid-template-columns: repeat(2, 1fr); grid-template-rows: auto; }
                .gallery-item { height: 250px; }
                .item-featured { grid-column: span 2; grid-row: span 1; height: 350px; }
              }
              @media (max-width: 600px) {
                .masonry-gallery { grid-template-columns: 1fr; }
                .item-featured { grid-column: span 1; }
              }
            `}} />

            <div className="masonry-gallery">
              <div className="gallery-item item-featured reveal">
                <img src="/img/hero-cnc.jpg" alt="Factory Floor Wide Shot" />
                <div className="gallery-overlay"><div className="gallery-caption">5-Axis Machining Cell</div></div>
              </div>

              <div className="gallery-item reveal reveal-d1">
                <img src="/img/cap-quality.jpg" alt="Metrology Lab" />
                <div className="gallery-overlay"><div className="gallery-caption">Metrology &amp; Quality Lab</div></div>
              </div>

              <div className="gallery-item reveal reveal-d2">
                <img src="/img/cleanroom.jpg" alt="Cleanroom Assembly" />
                <div className="gallery-overlay"><div className="gallery-caption">ISO Class 7 Cleanroom</div></div>
              </div>
            </div>

            <div className="masonry-gallery" style={{ gridTemplateRows: '300px', marginTop: '20px' }}>
              <div className="gallery-item reveal">
                <img src="/img/precision_turning.jpg" alt="Precision Turning Cell" />
                <div className="gallery-overlay"><div className="gallery-caption">Precision Turning Cell</div></div>
              </div>
              <div className="gallery-item reveal reveal-d1">
                <img src="/img/cap-assembly.jpg" alt="Assembly Integration" />
                <div className="gallery-overlay"><div className="gallery-caption">Assembly &amp; Integration</div></div>
              </div>
              <div className="gallery-item reveal reveal-d2">
                <img src="/img/laser_cutting.jpg" alt="Laser Cutting &amp; Fabrication" />
                <div className="gallery-overlay"><div className="gallery-caption">Laser Cutting &amp; Fabrication</div></div>
              </div>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}
