import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { jobs } from '../content';

export default function Careers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const title = (job.title || '').toLowerCase();
      const desc = (job.description || '').toLowerCase();
      const department = (job.department || '').toLowerCase();
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = title.includes(query) || desc.includes(query);
      
      let selectedDeptRaw = deptFilter;
      let matchesDept = false;
      if (selectedDeptRaw === 'all') {
        matchesDept = true;
      } else {
        if (selectedDeptRaw === 'machining' && (department.includes('machining') || department.includes('production'))) matchesDept = true;
        if (selectedDeptRaw === 'quality' && department.includes('quality')) matchesDept = true;
        if (selectedDeptRaw === 'sales' && (department.includes('sales') || department.includes('admin'))) matchesDept = true;
      }
      
      return matchesSearch && matchesDept;
    });
  }, [jobs, searchQuery, deptFilter]);

  const openModal = (job) => {
    setSelectedJob(job);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedJob(null);
    document.body.style.overflow = '';
  };

  return (
    <main>
      <style dangerouslySetInnerHTML={{__html: `
        .hero-text-link {
          display: inline-flex; 
          align-items: center; 
          gap: 10px; 
          color: var(--accent); 
          font-weight: 700; 
          font-size: 1.15rem; 
          text-decoration: none; 
          transition: color 0.2s ease;
        }
        .hero-text-link:hover {
          color: #fff;
        }
        .hero-text-link svg {
          width: 20px; 
          height: 20px; 
          transition: transform 0.3s ease;
        }
        .hero-text-link:hover svg {
          transform: translateX(6px);
        }

        .careers-hero-overlay {
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.85) 0%, rgba(227, 27, 35, 0.15) 100%) !important;
        }
        
        .culture-pillar-item {
          position: relative;
          padding-left: 0px;
          transition: all 0.3s ease;
        }
        .culture-pillar-item:hover {
          transform: translateX(4px);
        }

        .stats-banner-container {
          margin-top: 100px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: 0 10px 40px -15px rgba(0,0,0,0.04);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .stats-banner-container:hover {
          box-shadow: 0 20px 50px -20px rgba(0,0,0,0.08);
          border-color: rgba(26, 86, 219, 0.15);
        }

        .benefit-card {
          background: linear-gradient(145deg, #ffffff, #f8fafc);
          padding: 44px 36px;
          border-radius: 16px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        .benefit-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--accent), #ef4444);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s ease;
        }
        .benefit-card:hover {
          transform: translateY(-8px);
          border-color: rgba(26, 86, 219, 0.3);
          box-shadow: 0 20px 40px -10px rgba(26, 86, 219, 0.15);
        }
        .benefit-card:hover::before {
          transform: scaleX(1);
        }
        .benefit-card .why-icon {
          width: 56px;
          height: 56px;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          background: rgba(26, 86, 219, 0.05);
          border-radius: 14px;
          padding: 12px;
          transition: all 0.3s ease;
        }
        .benefit-card:hover .why-icon {
          background: var(--accent);
          color: #fff;
          transform: scale(1.1) rotate(5deg);
        }
        .benefit-card .why-icon svg {
          width: 100%;
          height: 100%;
          stroke-width: 1.5;
        }

        .testimonial-card-premium {
          background: #fff;
          padding: 44px 36px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.015);
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 280px;
        }
        .testimonial-card-premium:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
          border-color: rgba(26, 86, 219, 0.15);
        }
        .testimonial-card-premium::after {
          content: '“';
          position: absolute;
          top: 10px;
          right: 28px;
          font-size: 8rem;
          font-family: Georgia, serif;
          color: rgba(26, 86, 219, 0.03);
          line-height: 1;
          pointer-events: none;
        }

        .job-search-wrapper {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(26, 86, 219, 0.15);
          border-radius: 100px;
          padding: 12px 20px;
          box-shadow: 0 15px 35px -5px rgba(26, 86, 219, 0.05), 0 5px 15px rgba(0, 0, 0, 0.02);
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 56px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .job-search-wrapper:focus-within {
          border-color: var(--accent);
          box-shadow: 0 20px 40px rgba(26, 86, 219, 0.12), 0 0 0 4px rgba(26, 86, 219, 0.1);
          transform: translateY(-2px);
        }
        .job-search-input-wrap {
          position: relative;
          flex: 2;
          display: flex;
          align-items: center;
        }
        .job-search-input-wrap svg {
          position: absolute;
          left: 20px;
          color: var(--accent);
          pointer-events: none;
          transition: color 0.3s ease;
        }
        .job-search-input-wrap input {
          width: 100%;
          padding: 14px 20px 14px 56px !important;
          border: none !important;
          background: transparent !important;
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--text);
        }
        .job-search-input-wrap input::placeholder {
          color: var(--text-muted);
          font-weight: 400;
        }
        .job-search-input-wrap input:focus {
          outline: none;
        }
        .job-dept-filter-select {
          flex: 1;
          border: none !important;
          border-left: 1px solid rgba(226, 232, 240, 0.8) !important;
          background: transparent !important;
          padding: 14px 32px !important;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text);
          cursor: pointer;
          border-radius: 0 !important;
          height: auto !important;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") !important;
          background-repeat: no-repeat !important;
          background-position: right 20px center !important;
        }
        .job-dept-filter-select:focus {
          outline: none;
        }

        .job-card-premium {
          background: #fff;
          padding: 36px 48px;
          border-radius: 20px;
          border: 1px solid rgba(226, 232, 240, 0.8);
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
        }
        .job-card-premium::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 6px;
          background: linear-gradient(180deg, var(--accent), #3b82f6);
          transform: scaleY(0);
          transform-origin: center;
          transition: transform 0.4s ease;
        }
        .job-card-premium:hover {
          transform: translateX(8px) translateY(-2px);
          border-color: rgba(26, 86, 219, 0.3);
          box-shadow: 0 20px 40px -10px rgba(26, 86, 219, 0.15);
        }
        .job-card-premium:hover::before {
          transform: scaleY(1);
        }
        .job-card-premium .btn-outline {
          transition: all 0.3s ease;
          border-radius: 9999px;
          padding: 12px 32px;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .job-card-premium:hover .btn-outline {
          background: var(--accent) !important;
          color: #fff !important;
          border-color: var(--accent) !important;
          box-shadow: 0 10px 20px -5px rgba(26, 86, 219, 0.3);
        }

        /* Color-coded job tags */
        .job-tag-machining {
          background: rgba(227, 27, 35, 0.06) !important;
          color: rgb(227, 27, 35) !important;
        }
        .job-tag-quality {
          background: rgba(26, 86, 219, 0.06) !important;
          color: rgb(26, 86, 219) !important;
        }
        .job-tag-sales {
          background: rgba(16, 185, 129, 0.06) !important;
          color: rgb(16, 185, 129) !important;
        }
        
        @media (max-width: 768px) {
          .intro-split-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .stats-banner-container {
            grid-template-columns: 1fr !important;
          }
          .stats-banner-container div {
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
          .stats-banner-container div:last-child {
            border-bottom: none !important;
          }
          .job-search-wrapper {
            flex-direction: column;
            border-radius: var(--radius-lg);
            padding: 16px;
          }
          .job-dept-filter-select {
            border-left: none !important;
            border-top: 1px solid var(--border) !important;
            padding: 16px 20px 0 20px !important;
            width: 100%;
          }
          .job-card-premium {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            gap: 20px;
          }
          .job-card-premium .btn-outline {
            width: 100%;
            text-align: center;
          }
        }
        
        .job-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
          padding: 20px;
        }
        .job-modal-overlay.active {
          opacity: 1;
          pointer-events: auto;
        }
        .job-modal-content {
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          transform: translateY(20px) scale(0.95);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }
        .job-modal-overlay.active .job-modal-content {
          transform: translateY(0) scale(1);
        }
        .job-modal-header {
          padding: 32px 40px 24px;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          position: sticky;
          top: 0;
          background: #fff;
          z-index: 10;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
        }
        .job-modal-body {
          padding: 32px 40px;
        }
        .job-modal-close {
          position: absolute;
          top: 24px;
          right: 24px;
          background: rgba(241, 245, 249, 1);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text-muted);
          transition: all 0.2s ease;
        }
        .job-modal-close:hover {
          background: rgba(226, 232, 240, 1);
          color: var(--text);
        }
      `}} />

      <PageHero data={{
        image: 'img/hero-cnc.jpg',
        title: 'Build Precision With Us',
        breadcrumb: 'Careers',
        description: "At Top Precision, we don't just manufacture parts — we shape the future of advanced technology. We invest in late-model equipment and, most importantly, in our people. Join a team where craftsmanship, safety, and continuous learning are at the core of everything we do.",
        actions: (
          <a href="#positions-section" className="hero-text-link">
            View Open Positions
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        )
      }} />

      <section className="page-content" id="culture" style={{ padding: '120px 0', background: '#fff' }}>
        <div className="container">
          <div className="intro-split-grid">
            <div className="intro-text reveal">
              <span className="section-tag">Life at Top Precision</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '40px', color: 'var(--text)', letterSpacing: '-0.02em' }}>Our Culture</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                <div className="culture-pillar-item">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', opacity: 0.4, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>01</span>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>Craftsmanship &amp; Precision</h4>
                      <p style={{ color: 'var(--text-body)', lineHeight: 1.8, fontSize: '0.98rem', margin: 0 }}>We hold our work to the highest standards. In a +/-0.005mm tolerance world, details matter. We nurture a pride in craftsmanship that translates to world-class quality.</p>
                    </div>
                  </div>
                </div>

                <div className="culture-pillar-item">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', opacity: 0.4, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>02</span>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>Safety &amp; Wellbeing</h4>
                      <p style={{ color: 'var(--text-body)', lineHeight: 1.8, fontSize: '0.98rem', margin: 0 }}>Our climate-controlled facility is kept clean, organized, and safe. We believe that a clean environment is a productive and safe environment.</p>
                    </div>
                  </div>
                </div>

                <div className="culture-pillar-item">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)', opacity: 0.4, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>03</span>
                    <div>
                      <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px', fontFamily: 'var(--font-heading)', color: 'var(--text)' }}>Continuous Growth</h4>
                      <p style={{ color: 'var(--text-body)', lineHeight: 1.8, fontSize: '0.98rem', margin: 0 }}>We support your growth. From internal training programs to external certifications, we help technicians develop into senior programmers and engineering leaders.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="intro-image-wrap reveal reveal-d1" style={{ position: 'relative', padding: '20px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: '40px', bottom: '40px', background: 'var(--accent-bg)', borderRadius: 'var(--radius-lg)', zIndex: 1 }}></div>
              <img src="img/cap-assembly.jpg" alt="Technicians assembling precision parts on the factory floor" style={{ borderRadius: 'var(--radius-lg)', width: '100%', objectFit: 'cover', aspectRatio: '4/5', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', position: 'relative', zIndex: 2, display: 'block' }} />
            </div>
          </div>

          <div className="stats-banner-container reveal">
            <div style={{ padding: '48px 32px', textAlign: 'center', borderRight: '1px solid var(--border)', position: 'relative' }}>
              <div className="key-metric-val" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', lineHeight: 1, letterSpacing: '-0.03em' }}>80+</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginTop: '12px' }}>Growing Team</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Skilled operators &amp; engineers</div>
            </div>
            <div style={{ padding: '48px 32px', textAlign: 'center', borderRight: '1px solid var(--border)', position: 'relative' }}>
              <div className="key-metric-val" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', lineHeight: 1, letterSpacing: '-0.03em' }}>40+ Hrs</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginTop: '12px' }}>Annual Training</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Continuous skill enhancement</div>
            </div>
            <div style={{ padding: '48px 32px', textAlign: 'center', position: 'relative' }}>
              <div className="key-metric-val" style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-heading)', lineHeight: 1, letterSpacing: '-0.03em' }}>100%</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)', marginTop: '12px' }}>Internal Mobility</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>Clear paths for career advancement</div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-content-alt" style={{ padding: '120px 0', background: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(26,86,219,0.03) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(227,27,35,0.03) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', pointerEvents: 'none' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 72px' }}>
            <span className="section-tag" style={{ background: 'rgba(26, 86, 219, 0.1)', color: 'var(--accent)', padding: '8px 16px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-block', marginBottom: '20px' }}>The Top Precision Advantage</span>
            <h2 style={{ fontSize: '3.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Why Build Your Career With Us</h2>
            <p style={{ marginTop: '20px', fontSize: '1.15rem', color: 'var(--text-body)', maxWidth: '600px', marginInline: 'auto' }}>We provide an environment where your skills are sharpened, your well-being is prioritized, and your career trajectory is limitless.</p>
          </div>

          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            <div className="benefit-card reveal">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '14px', color: 'var(--text)' }}>Master Your Craft</h3>
              <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>Receive elite, hands-on training to program and operate the world's most advanced multi-axis CNC machinery.</p>
            </div>

            <div className="benefit-card reveal" style={{ transitionDelay: '100ms' }}>
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '14px', color: 'var(--text)' }}>Accelerated Growth</h3>
              <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>Clear, structured pathways to elevate your career from an operator to a lead manufacturing engineer.</p>
            </div>

            <div className="benefit-card reveal" style={{ transitionDelay: '200ms' }}>
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '14px', color: 'var(--text)' }}>State-of-the-Art Facility</h3>
              <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>Thrive in our immaculate, fully climate-controlled 45,000 sq ft advanced manufacturing center.</p>
            </div>

            <div className="benefit-card reveal">
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '14px', color: 'var(--text)' }}>Premium Rewards</h3>
              <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>Enjoy industry-leading compensation, comprehensive medical coverage, and performance-based bonuses.</p>
            </div>

            <div className="benefit-card reveal" style={{ transitionDelay: '100ms' }}>
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '14px', color: 'var(--text)' }}>Cutting-Edge Tech</h3>
              <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>Command precision technology including programmable Zeiss CMMs, DMG Mori centers, and Swiss-type lathes.</p>
            </div>

            <div className="benefit-card reveal" style={{ transitionDelay: '200ms' }}>
              <div className="why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', fontWeight: 800, marginBottom: '14px', color: 'var(--text)' }}>Elite Community</h3>
              <p style={{ color: 'var(--text-body)', fontSize: '1rem', lineHeight: 1.7, margin: 0 }}>Collaborate with industry veterans in an empowering, highly supportive, and driven environment.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="page-content-alt" id="positions-section" style={{ padding: '120px 0', background: 'linear-gradient(180deg, var(--bg-2) 0%, #fff 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.02, backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }}></div>

        <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 2 }}>
          <div className="section-header reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px' }}>
            <span className="section-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '8px 16px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-block', marginBottom: '20px' }}>Join Our Team</span>
            <h2 style={{ fontSize: '3.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Explore Open Opportunities</h2>
            <p style={{ marginTop: '20px', fontSize: '1.15rem', color: 'var(--text-body)', maxWidth: '600px', marginInline: 'auto' }}>Find your next career move at Top Precision Manufacturing. We are looking for driven individuals to join our growing team.</p>
          </div>

          <div className="job-search-wrapper reveal" style={{ maxWidth: '680px', margin: '0 auto 56px' }}>
            <div className="job-search-input-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="job-search" placeholder="Search by job title or keyword..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select id="job-dept-filter" className="job-dept-filter-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
              <option value="all">All Departments</option>
              <option value="machining">Machining &amp; Production</option>
              <option value="quality">Quality Assurance</option>
              <option value="sales">Sales &amp; Administration</option>
            </select>
          </div>

          <div className="job-board" id="job-listings-container">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => {
                let tagClass = '';
                const dept = (job.department || '').toLowerCase();
                if (dept.includes('machining') || dept.includes('production')) tagClass = 'job-tag-machining';
                else if (dept.includes('quality')) tagClass = 'job-tag-quality';
                else if (dept.includes('sales') || dept.includes('admin')) tagClass = 'job-tag-sales';

                return (
                  <div key={idx} className="job-card-premium reveal" data-department={dept}>
                    <div style={{ flex: 1 }}>
                      <span className={`job-tag ${tagClass}`} style={{ padding: '6px 14px', fontSize: '0.75rem', fontWeight: 800, borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '16px', background: 'rgba(100, 116, 139, 0.08)', color: 'var(--text-body)' }}>{job.department}</span>
                      <h3 className="job-title" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px', fontFamily: 'var(--font-heading)', color: 'var(--text)', letterSpacing: '-0.01em' }}>{job.title}</h3>
                      <p style={{ fontSize: '1rem', color: 'var(--text-body)', marginBottom: '12px', lineHeight: 1.7, maxWidth: '90%' }}>{job.description}</p>
                      
                      {job.learnMoreLink ? (
                        <a href={job.learnMoreLink} className="btn btn-text" style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', padding: '0 0 20px 0', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s', textDecoration: 'none' }}>
                          {job.learnMoreText || 'Learn More'}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      ) : (
                        <button onClick={() => openModal(job)} className="btn btn-text btn-learn-more" style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', padding: '0 0 20px 0', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}>
                          {job.learnMoreText || 'Learn More'}
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </button>
                      )}

                      <div className="job-meta" style={{ display: 'flex', gap: '32px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', opacity: 0.7 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {job.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', opacity: 0.7 }}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', flexShrink: 0 }}>
                      <a href={`mailto:careers@topprecision.com.my?subject=Job%20Application%20-%20${encodeURIComponent(job.title || '')}`} className="btn btn-outline" style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        Apply Now
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div id="job-empty-state" style={{ background: '#fff', padding: '64px 32px', borderRadius: '20px', border: '1px solid rgba(226, 232, 240, 0.8)', textAlign: 'center', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.03)' }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(26, 86, 219, 0.05)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text)', marginBottom: '12px' }}>No Matching Roles Found</h3>
                <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', maxWidth: '400px', margin: '0 auto' }}>We don't have any open positions matching your criteria right now. Please adjust your filters or submit a general application below.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="cta-band" style={{ position: 'relative', padding: '100px 0', textAlign: 'center', overflow: 'hidden', color: '#fff' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: "url('img/cap-assembly.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', zIndex: 1 }}></div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(10, 25, 50, 0.9) 0%, rgba(15, 35, 75, 0.75) 100%)', zIndex: 2 }}></div>
        
        <div className="container cta-band-content" style={{ position: 'relative', zIndex: 3 }}>
          <div className="cta-tag" style={{ color: '#60a5fa', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '16px' }}>General Application</div>
          <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-heading)', marginBottom: '16px', color: '#fff' }}>Don't see a role that fits?</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 32px', fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
            We are always on the lookout for talented machinists, engineers, and manufacturing professionals. Send us your resume and we will contact you when an opportunity arises.
          </p>
          <div className="cta-actions">
            <a href="mailto:careers@topprecision.com.my?subject=General%20Application" className="btn btn-primary btn-header-cta" style={{ borderRadius: '9999px', background: '#fff', color: '#000', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Send General Application
            </a>
          </div>
        </div>
      </section>

      <div className={`job-modal-overlay ${selectedJob ? 'active' : ''}`} id="job-modal" onClick={(e) => { if (e.target.classList.contains('job-modal-overlay')) closeModal(); }}>
        {selectedJob && (
          <div className="job-modal-content">
            <button className="job-modal-close" onClick={closeModal} aria-label="Close modal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="job-modal-header">
              <span id="modal-dept" style={{ padding: '6px 14px', fontSize: '0.75rem', fontWeight: 800, borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '16px', background: 'rgba(26, 86, 219, 0.1)', color: 'var(--accent)' }}>{selectedJob.department}</span>
              <h2 id="modal-title" style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.2 }}>{selectedJob.title}</h2>
              <div style={{ display: 'flex', gap: '24px', fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', opacity: 0.7 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span id="modal-loc">{selectedJob.location}</span>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', opacity: 0.7 }}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                  <span id="modal-type">{selectedJob.type}</span>
                </span>
              </div>
            </div>
            <div className="job-modal-body">
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Job Scope</h4>
              <p id="modal-desc" style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '32px' }}>{selectedJob.description}</p>
              
              <h4 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Requirements</h4>
              <p id="modal-req" style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '40px', whiteSpace: 'pre-wrap' }}>{selectedJob.requirements || 'Requirements not specified.'}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
