import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import CapabilityCard from '../components/CapabilityCard';
import { capabilitiesOverview, services, homeCta } from '../content';

export default function Capabilities() {
  const heroImage = capabilitiesOverview?.heroImage ? `/${capabilitiesOverview.heroImage}` : '/img/hero-cnc.jpg';
  const heroTitle = capabilitiesOverview?.heroTitle || 'Manufacturing Capabilities';
  const heroDesc = capabilitiesOverview?.description || 'We deliver comprehensive manufacturing solutions, combining advanced machining, precision fabrication, and expert assembly to meet the demanding requirements of our global clients.';

  const materials = [
    {
      title: 'Aerospace Aluminium',
      grades: '6061-T6, 7075-T6, 5052-H32',
      desc: 'High strength-to-weight ratio alloys optimized for high-speed CNC milling, turning, and clear/colored anodizing.',
      icon: 'ph-cube',
      tags: ['Lightweight', 'Anodizing-Ready', 'High Strength']
    },
    {
      title: 'Stainless & Tool Steel',
      grades: 'SUS304, SUS316L, SKD11, Cast Iron',
      desc: 'Exceptional corrosion resistance and mechanical wear tolerance for semiconductor, medical, and fluid equipment.',
      icon: 'ph-shield',
      tags: ['Corrosion Proof', 'High Hardness', 'Thermal Stability']
    },
    {
      title: 'Copper & Conductive Alloys',
      grades: 'C1100 Pure Copper, Brass C3604',
      desc: 'High electrical and thermal conductivity for precision power distribution blocks, heatsinks, and connectors.',
      icon: 'ph-lightning',
      tags: ['High Conductivity', 'Thermal Transfer', 'Zero Sparking']
    },
    {
      title: 'Engineering Polymers',
      grades: 'POM (Delrin), PEEK, PTFE, Nylon',
      desc: 'Precision non-metallic machining delivering tight tolerances, electrical insulation, and chemical resistance.',
      icon: 'ph-atom',
      tags: ['Dielectric', 'Chemical Resistant', 'Low Friction']
    }
  ];

  const processSteps = [
    {
      num: '01',
      title: 'DFM & CAD Translation',
      desc: 'Comprehensive Design for Manufacturability review, CAM toolpath optimization, and dedicated fixture design.',
      icon: 'ph-compass-tool'
    },
    {
      num: '02',
      title: 'Precision CNC Execution',
      desc: 'High-speed, multi-axis milling and turning on our 8 Brother SPEEDIO machining centers with controlled coolant cooling.',
      icon: 'ph-gear-six'
    },
    {
      num: '03',
      title: 'Box Build & Assembly',
      desc: 'Electro-mechanical assembly, PCBA mounting, structured cable routing, and enclosure sealing in cleanroom environment.',
      icon: 'ph-package'
    },
    {
      num: '04',
      title: 'Metrology & Verification',
      desc: 'Coordinate Measuring Machine (CMM) dimensional verification, surface profilometry, and 100% AOI electrical testing.',
      icon: 'ph-check-square-offset'
    }
  ];

  const surfaceFinishes = [
    'Anodizing (Type II & Hard Type III)',
    'Electroless Nickel Plating',
    'Chemical Passivation',
    'Glass Bead & Sand Blasting',
    'Precision Laser Marking & Serialization',
    'Powder Coating & Painting'
  ];

  return (
    <main className="page-main">
      <PageHero data={{
        image: heroImage,
        title: heroTitle,
        breadcrumb: heroTitle,
        description: heroDesc
      }} />

      {/* Section 1: Core Manufacturing Pillars */}
      <section className="page-content" style={{ padding: 'clamp(64px, 8vw, 96px) 0 80px', background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header reveal" style={{ maxWidth: '780px', margin: '0 auto 48px', textAlign: 'center' }}>
            <span className="section-tag">Core Competencies</span>
            <h2>Advanced Production &amp; <span className="accent">System Integration</span></h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '12px' }}>
              High-tolerance precision components and turnkey electro-mechanical assemblies manufactured in Bayan Lepas, Penang.
            </p>
          </div>

          <div className="capabilities-pro-grid">
            {services && services.length > 0 ? (
              services.map((service, index) => (
                <CapabilityCard key={index} service={service} index={index} />
              ))
            ) : (
              <p>No manufacturing capabilities configured.</p>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: Materials & Surface Finishing Matrix */}
      <section style={{ padding: '80px 0 90px', background: 'var(--bg-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="section-header reveal" style={{ maxWidth: '780px', margin: '0 auto 40px', textAlign: 'center' }}>
            <span className="section-tag">Material Science</span>
            <h2>Comprehensive <span className="accent">Raw Materials Matrix</span></h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '10px' }}>
              Certified metals and engineering polymers machined to exact customer specifications.
            </p>
          </div>

          <div className="materials-matrix-grid">
            {materials.map((mat, i) => (
              <div key={i} className={`material-card reveal reveal-d${i + 1}`}>
                <div className="material-icon-wrap">
                  <i className={`ph ${mat.icon}`}></i>
                </div>
                <h3 className="material-title">{mat.title}</h3>
                <span className="material-grades">{mat.grades}</span>
                <p className="material-desc">{mat.desc}</p>
                <div className="material-tag-row">
                  {mat.tags.map((t, tidx) => (
                    <span key={tidx} className="material-pill">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Surface Finishing Ribbon */}
          <div className="finishing-ribbon reveal">
            <div className="finishing-ribbon-title">
              <i className="ph ph-sparkle"></i>
              <span>Secondary Finishing &amp; Surface Treatment</span>
            </div>
            <div className="finishing-badges-row">
              {surfaceFinishes.map((finish, fidx) => (
                <span key={fidx} className="finishing-badge">{finish}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: 4-Step Controlled Manufacturing Workflow */}
      <section style={{ padding: '88px 0 96px', background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header reveal" style={{ maxWidth: '780px', margin: '0 auto 48px', textAlign: 'center' }}>
            <span className="section-tag">Quality Process</span>
            <h2>Our 4-Stage <span className="accent">Production Workflow</span></h2>
            <p style={{ fontSize: '1.02rem', color: 'var(--text-body)', lineHeight: 1.6, marginTop: '10px' }}>
              Audited under ISO 9001:2015 to guarantee dimensional accuracy and reliable delivery.
            </p>
          </div>

          <div className="process-workflow-grid">
            {processSteps.map((step, sidx) => (
              <div key={sidx} className={`process-step-card reveal reveal-d${sidx + 1}`}>
                <div className="process-step-top">
                  <span className="process-step-num">{step.num}</span>
                  <div className="process-step-icon">
                    <i className={`ph ${step.icon}`}></i>
                  </div>
                </div>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: CTA Band */}
      <section className="cta-band" id="cta" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(80px, 12vw, 120px) 0' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: "url('/img/cleanroom.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(10, 20, 40, 0.95) 0%, rgba(15, 30, 60, 0.8) 100%)', zIndex: 2 }}></div>
        
        <div className="container cta-band-content" style={{ position: 'relative', zIndex: 3 }}>
          <div className="cta-tag">{homeCta?.tagline || 'Ready to Build'}</div>
          <div className="cta-headline-outline">{homeCta?.headlineOutline || 'PRECISION'}</div>
          <div className="cta-headline-solid">{homeCta?.headlineSolid || 'ENGINEERING'}</div>
          <p className="cta-body">{homeCta?.body || 'Discuss your component drawings or box build assembly specifications with our manufacturing engineering team.'}</p>
          <div className="cta-actions">
            <Link to={`/${(homeCta?.primaryBtnLink || 'contact').replace('.html', '')}`} className="btn btn-primary btn-lg">{homeCta?.primaryBtnText || 'Request Quotation'}</Link>
            <Link to="/about" className="btn btn-outline-white btn-lg">{homeCta?.secondaryBtnText || 'Explore Facility'}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
