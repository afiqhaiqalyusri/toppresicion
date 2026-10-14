import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { jobs, contact } from '../content';

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
        if (selectedDeptRaw === 'machining' && (department.includes('machining') || department.includes('production') || department.includes('manufacturing'))) matchesDept = true;
        if (selectedDeptRaw === 'quality' && (department.includes('quality') || department.includes('qc') || department.includes('qa'))) matchesDept = true;
        if (selectedDeptRaw === 'internship' && (department.includes('various') || department.includes('intern') || department.includes('sales') || department.includes('admin'))) matchesDept = true;
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
        
        /* Precision Culture Rail */
        .culture-timeline-rail {
          display: flex;
          flex-direction: column;
          position: relative;
          gap: 0;
        }
        .culture-rail-item {
          display: flex;
          align-items: flex-start;
          gap: 22px;
          position: relative;
          padding-bottom: 34px;
        }
        .culture-rail-item:last-child {
          padding-bottom: 0;
        }
        .culture-rail-marker {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
        }
        .culture-rail-num {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: #f8fafc;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: var(--accent);
          transition: all 0.25s ease;
          z-index: 2;
        }
        .culture-rail-item:not(:last-child) .culture-rail-marker::after {
          content: '';
          position: absolute;
          top: 46px;
          bottom: -2px;
          left: 50%;
          width: 1px;
          background: var(--border);
          transform: translateX(-50%);
          z-index: 1;
        }
        .culture-rail-item:hover .culture-rail-num {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
          box-shadow: 0 4px 14px rgba(26, 86, 219, 0.25);
        }
        .culture-rail-body {
          flex: 1;
          padding-top: 2px;
        }
        .culture-rail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 8px;
          flex-wrap: wrap;
        }
        .culture-rail-title {
          font-family: var(--font-heading);
          font-size: 1.22rem;
          font-weight: 700;
          color: var(--text);
          margin: 0;
          line-height: 1.3;
        }
        .culture-rail-badge {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--accent);
          background: rgba(26, 86, 219, 0.06);
          border: 1px solid rgba(26, 86, 219, 0.15);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .culture-rail-desc {
          font-size: 0.95rem;
          color: var(--text-body);
          line-height: 1.7;
          margin: 0;
        }

        /* Careers Metrics Ribbon */
        .careers-metrics-ribbon {
          margin-top: 72px;
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 12px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(15, 23, 42, 0.03);
        }
        .careers-metric-cell {
          padding: 44px 36px;
          text-align: center;
          position: relative;
          background: #f8fafc;
          transition: background-color 0.25s ease;
        }
        .careers-metric-cell:not(:last-child) {
          border-right: 1px solid var(--border);
        }
        .careers-metric-cell:hover {
          background: #ffffff;
        }
        .careers-metric-val {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 800;
          color: var(--accent);
          line-height: 1;
          letter-spacing: -0.03em;
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 2px;
        }
        .careers-metric-plus {
          color: #ef4444;
          font-size: 2.25rem;
          font-weight: 700;
        }
        .careers-metric-unit {
          font-size: 1.75rem;
          font-weight: 700;
          color: var(--text);
          margin-left: 6px;
        }
        .careers-metric-pct {
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--accent);
        }
        .careers-metric-label {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
          margin-top: 14px;
          letter-spacing: -0.01em;
        }
        .careers-metric-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-top: 6px;
          line-height: 1.5;
        }

        /* Precision Matrix Grid */
        .precision-matrix-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .matrix-cell {
          background: #ffffff;
          padding: 34px 28px;
          border-radius: 18px;
          border: 1px solid rgba(226, 232, 240, 0.85);
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.04);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }
        .matrix-cell::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #1a56db, #38bdf8);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .matrix-cell:hover {
          transform: translateY(-6px);
          border-color: #bfdbfe;
          box-shadow: 0 20px 40px -10px rgba(26, 86, 219, 0.12), 0 0 0 1px rgba(26, 86, 219, 0.15);
        }
        .matrix-cell:hover::before {
          opacity: 1;
        }
        .matrix-cell-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }
        .matrix-cell-index {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 800;
          color: #64748b;
          letter-spacing: 0.08em;
          background: #f8fafc;
          padding: 5px 12px;
          border-radius: 9999px;
          border: 1px solid #e2e8f0;
          transition: all 0.25s ease;
        }
        .matrix-cell:hover .matrix-cell-index {
          color: #1a56db;
          background: #eff6ff;
          border-color: #bfdbfe;
        }
        .matrix-cell-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1a56db;
          box-shadow: 0 2px 6px rgba(26, 86, 219, 0.06);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .matrix-cell:hover .matrix-cell-icon {
          background: #1a56db;
          color: #ffffff;
          transform: scale(1.05);
          box-shadow: 0 8px 18px rgba(26, 86, 219, 0.25);
        }
        .matrix-cell-icon svg {
          width: 22px;
          height: 22px;
        }
        .matrix-cell-title {
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 12px 0;
          letter-spacing: -0.02em;
          line-height: 1.25;
          transition: color 0.2s ease;
        }
        .matrix-cell:hover .matrix-cell-title {
          color: #1a56db;
        }
        .matrix-cell-desc {
          font-size: 0.94rem;
          color: #475569;
          line-height: 1.7;
          margin: 0 0 24px 0;
          flex-grow: 1;
        }
        .matrix-cell-footer {
          padding-top: 18px;
          border-top: 1px solid #f1f5f9;
        }
        .matrix-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #1e40af;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          padding: 6px 14px;
          border-radius: 8px;
          letter-spacing: 0.01em;
          transition: all 0.25s ease;
        }
        .matrix-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #3b82f6;
          flex-shrink: 0;
          transition: background-color 0.25s ease;
        }
        .matrix-cell:hover .matrix-tag {
          background: #1a56db;
          color: #ffffff;
          border-color: #1a56db;
        }
        .matrix-cell:hover .matrix-tag-dot {
          background: #93c5fd;
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
          padding: 46px 56px;
          border-radius: 20px;
          border: 1px solid rgba(226, 232, 240, 0.9);
          margin-bottom: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 48px;
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.04);
          transition: all 0.35s ease;
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
          padding: 14px 36px;
          font-size: 1rem;
          font-weight: 700;
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
        
        @media (max-width: 992px) {
          .precision-matrix-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .intro-split-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .careers-metrics-ribbon {
            grid-template-columns: 1fr !important;
            margin-top: 56px !important;
          }
          .careers-metric-cell:not(:last-child) {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
          .precision-matrix-grid {
            grid-template-columns: 1fr !important;
          }
          .culture-rail-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
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

      <section className="page-content" id="culture" style={{ padding: '100px 0 90px', background: '#fff' }}>
        <div className="container">
          <div className="intro-split-grid" style={{ alignItems: 'center', gap: '64px' }}>
            <div className="intro-text reveal">
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px' }}>
                <span style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '1px' }}></span>
                Life at Top Precision
              </div>
              <h2 style={{ fontSize: '2.85rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginBottom: '18px', color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
                Our Culture
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '560px' }}>
                Excellence in advanced manufacturing requires more than late-model machines — it demands an engineering mindset built on craftsmanship, rigorous safety, and personal pride in precision.
              </p>
              
              <div className="culture-timeline-rail">
                <div className="culture-rail-item">
                  <div className="culture-rail-marker">
                    <span className="culture-rail-num">01</span>
                  </div>
                  <div className="culture-rail-body">
                    <div className="culture-rail-header">
                      <h4 className="culture-rail-title">Craftsmanship &amp; Precision</h4>
                      <span className="culture-rail-badge">±0.001 cm Tolerance</span>
                    </div>
                    <p className="culture-rail-desc">
                      We hold our work to the highest standards. In a ±0.001 cm tolerance world, details matter. We nurture personal pride in craftsmanship that translates to world-class quality.
                    </p>
                  </div>
                </div>

                <div className="culture-rail-item">
                  <div className="culture-rail-marker">
                    <span className="culture-rail-num">02</span>
                  </div>
                  <div className="culture-rail-body">
                    <div className="culture-rail-header">
                      <h4 className="culture-rail-title">Safety, Cleanliness &amp; 5S Wellbeing</h4>
                      <span className="culture-rail-badge">Cleanroom Assembly</span>
                    </div>
                    <p className="culture-rail-desc">
                      Our climate-controlled facility is kept clean, organized, and safe under strict 5S visual standards. We believe an orderly environment is fundamental to worker safety and zero-defect production.
                    </p>
                  </div>
                </div>

                <div className="culture-rail-item">
                  <div className="culture-rail-marker">
                    <span className="culture-rail-num">03</span>
                  </div>
                  <div className="culture-rail-body">
                    <div className="culture-rail-header">
                      <h4 className="culture-rail-title">Continuous Technical Mastery</h4>
                      <span className="culture-rail-badge">Skill Progression</span>
                    </div>
                    <p className="culture-rail-desc">
                      We actively support your growth. Through hands-on CAM mentoring, tooling workshops, and metrology certifications, we help operators advance into senior programmers and engineering leaders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal reveal-d1" style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.12)',
                background: 'var(--bg-2)'
              }}>
                <img
                  src="img/assembly-floor-workshop.jpg"
                  alt="Technicians assembling precision parts on the factory floor"
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '480px',
                    maxHeight: '560px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Careers Metrics Ribbon */}
          <div className="careers-metrics-ribbon reveal">
            <div className="careers-metric-cell">
              <div className="careers-metric-val">80<span className="careers-metric-plus">+</span></div>
              <div className="careers-metric-label">Growing Team</div>
              <div className="careers-metric-sub">Skilled machinists, CAM programmers &amp; QA inspectors</div>
            </div>
            <div className="careers-metric-cell">
              <div className="careers-metric-val">10,000<span className="careers-metric-plus">+</span><span className="careers-metric-unit">sq ft</span></div>
              <div className="careers-metric-label">Production Facility</div>
              <div className="careers-metric-sub">Climate-controlled manufacturing in Bayan Lepas FIZ</div>
            </div>
            <div className="careers-metric-cell">
              <div className="careers-metric-val">8<span className="careers-metric-plus">+</span></div>
              <div className="careers-metric-label">Brother CNC Fleet</div>
              <div className="careers-metric-sub">High-speed SPEEDIO machining centers &amp; turning</div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-content-alt" style={{ padding: '100px 0 110px', background: '#f8fafc', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header reveal" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '14px' }}>
              <span style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '1px' }}></span>
              The Top Precision Advantage
            </div>
            <h2 style={{ fontSize: '2.85rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.15 }}>
              Why Build Your Career With Us
            </h2>
            <p style={{ marginTop: '16px', fontSize: '1.1rem', color: 'var(--text-body)', maxWidth: '640px', marginInline: 'auto', lineHeight: 1.7 }}>
              We provide an environment where your skills are sharpened, your well-being is prioritized, and your career trajectory is limitless.
            </p>
          </div>

          <div className="precision-matrix-grid reveal">
            <div className="matrix-cell">
              <div>
                <div className="matrix-cell-top">
                  <div className="matrix-cell-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <span className="matrix-cell-index">01</span>
                </div>
                <h3 className="matrix-cell-title">Master Your Craft</h3>
                <p className="matrix-cell-desc">
                  Receive practical, hands-on training to set up, program, and operate high-speed Brother SPEEDIO CNC milling and turning machinery.
                </p>
              </div>
              <div className="matrix-cell-footer">
                <span className="matrix-tag">
                  <span className="matrix-tag-dot"></span>
                  Brother CNC &amp; CAM Mentorship
                </span>
              </div>
            </div>

            <div className="matrix-cell">
              <div>
                <div className="matrix-cell-top">
                  <div className="matrix-cell-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                      <polyline points="17 6 23 6 23 12" />
                    </svg>
                  </div>
                  <span className="matrix-cell-index">02</span>
                </div>
                <h3 className="matrix-cell-title">Accelerated Growth</h3>
                <p className="matrix-cell-desc">
                  Clear, structured development pathways to elevate your skills from technician or machine operator to lead engineer and production specialist.
                </p>
              </div>
              <div className="matrix-cell-footer">
                <span className="matrix-tag">
                  <span className="matrix-tag-dot"></span>
                  Structured Career Pathways
                </span>
              </div>
            </div>

            <div className="matrix-cell">
              <div>
                <div className="matrix-cell-top">
                  <div className="matrix-cell-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 21h18M5 21V7l8-4v18M13 21V11l6 3v7" />
                      <line x1="9" y1="9" x2="9" y2="9.01" />
                      <line x1="9" y1="13" x2="9" y2="13.01" />
                      <line x1="9" y1="17" x2="9" y2="17.01" />
                    </svg>
                  </div>
                  <span className="matrix-cell-index">03</span>
                </div>
                <h3 className="matrix-cell-title">Modern Facility</h3>
                <p className="matrix-cell-desc">
                  Thrive in our clean, fully climate-controlled 10,000+ sq ft manufacturing facility located in Bayan Lepas FIZ, Penang.
                </p>
              </div>
              <div className="matrix-cell-footer">
                <span className="matrix-tag">
                  <span className="matrix-tag-dot"></span>
                  10,000+ sq ft • Bayan Lepas FIZ
                </span>
              </div>
            </div>

            <div className="matrix-cell">
              <div>
                <div className="matrix-cell-top">
                  <div className="matrix-cell-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <span className="matrix-cell-index">04</span>
                </div>
                <h3 className="matrix-cell-title">Competitive Rewards</h3>
                <p className="matrix-cell-desc">
                  Enjoy competitive compensation packages, comprehensive medical coverage, performance bonuses, and supportive work conditions.
                </p>
              </div>
              <div className="matrix-cell-footer">
                <span className="matrix-tag">
                  <span className="matrix-tag-dot"></span>
                  Competitive Base, Health &amp; Bonus
                </span>
              </div>
            </div>

            <div className="matrix-cell">
              <div>
                <div className="matrix-cell-top">
                  <div className="matrix-cell-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <rect x="9" y="9" width="6" height="6" />
                      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
                    </svg>
                  </div>
                  <span className="matrix-cell-index">05</span>
                </div>
                <h3 className="matrix-cell-title">Advanced Capabilities</h3>
                <p className="matrix-cell-desc">
                  Gain experience with high-speed Brother SPEEDIO CNC centers, CMM dimensional verification, and Automated Optical Inspection (AOI).
                </p>
              </div>
              <div className="matrix-cell-footer">
                <span className="matrix-tag">
                  <span className="matrix-tag-dot"></span>
                  Brother CNC, CMM &amp; AOI Inspection
                </span>
              </div>
            </div>

            <div className="matrix-cell">
              <div>
                <div className="matrix-cell-top">
                  <div className="matrix-cell-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <span className="matrix-cell-index">06</span>
                </div>
                <h3 className="matrix-cell-title">Collaborative Team</h3>
                <p className="matrix-cell-desc">
                  Collaborate with dedicated machinists, assembly technicians, and quality inspectors in a supportive, safety-focused culture.
                </p>
              </div>
              <div className="matrix-cell-footer">
                <span className="matrix-tag">
                  <span className="matrix-tag-dot"></span>
                  Experienced Engineering &amp; Ops Team
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-content-alt" id="positions-section" style={{ padding: '120px 0', background: 'linear-gradient(180deg, var(--bg-2) 0%, #fff 100%)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.02, backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }}></div>

        <div className="container" style={{ maxWidth: '1180px', position: 'relative', zIndex: 2 }}>
          <div className="section-header reveal" style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 60px' }}>
            <span className="section-tag" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '8px 18px', borderRadius: '9999px', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-block', marginBottom: '20px' }}>Join Our Team</span>
            <h2 style={{ fontSize: '3.25rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Explore Open Opportunities</h2>
            <p style={{ marginTop: '20px', fontSize: '1.15rem', color: 'var(--text-body)', maxWidth: '640px', marginInline: 'auto', lineHeight: 1.7 }}>Find your next career move at Top Precision Manufacturing. We are looking for driven individuals to join our growing team.</p>
          </div>

          <div className="job-search-wrapper reveal" style={{ maxWidth: '820px', margin: '0 auto 60px' }}>
            <div className="job-search-input-wrap">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input type="text" id="job-search" placeholder="Search by job title or keyword..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <select id="job-dept-filter" className="job-dept-filter-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
              <option value="all">All Departments</option>
              <option value="machining">Manufacturing &amp; Machining</option>
              <option value="quality">Quality Control &amp; Assurance</option>
              <option value="internship">Internship &amp; Various</option>
            </select>
          </div>

          <div className="job-board" id="job-listings-container">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, idx) => {
                let tagClass = '';
                const dept = (job.department || '').toLowerCase();
                if (dept.includes('machining') || dept.includes('production') || dept.includes('manufacturing')) tagClass = 'job-tag-machining';
                else if (dept.includes('quality') || dept.includes('qc')) tagClass = 'job-tag-quality';
                else tagClass = 'job-tag-sales';

                return (
                  <div key={idx} className="job-card-premium reveal" data-department={dept}>
                    <div style={{ flex: 1 }}>
                      <span className={`job-tag ${tagClass}`} style={{ padding: '7px 16px', fontSize: '0.78rem', fontWeight: 800, borderRadius: '8px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'inline-block', marginBottom: '16px', background: 'rgba(100, 116, 139, 0.08)', color: 'var(--text-body)' }}>{job.department}</span>
                      <h3 className="job-title" style={{ fontSize: '1.65rem', fontWeight: 800, marginBottom: '14px', fontFamily: 'var(--font-heading)', color: 'var(--text)', letterSpacing: '-0.015em' }}>{job.title}</h3>
                      <p style={{ fontSize: '1.05rem', color: 'var(--text-body)', marginBottom: '16px', lineHeight: 1.7, maxWidth: '92%' }}>{job.description}</p>
                      
                      {job.learnMoreLink ? (
                        <a href={job.learnMoreLink} className="btn btn-text" style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', padding: '0 0 20px 0', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s', textDecoration: 'none' }}>
                          {job.learnMoreText || 'Learn More'}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                      ) : (
                        <button onClick={() => openModal(job)} className="btn btn-text btn-learn-more" style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: 600, cursor: 'pointer', padding: '0 0 20px 0', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'color 0.2s' }}>
                          {job.learnMoreText || 'Learn More'}
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </button>
                      )}

                      <div className="job-meta" style={{ display: 'flex', gap: '36px', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-muted)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', opacity: 0.7 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {job.location}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)', opacity: 0.7 }}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', flexShrink: 0 }}>
                      <a href={`mailto:${contact?.enquiryEmail || 'topprecision@gmail.com'}?subject=Job%20Application%20-%20${encodeURIComponent(job.title || '')}`} className="btn btn-outline" style={{ whiteSpace: 'nowrap', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
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
            <a href={`mailto:${contact?.enquiryEmail || 'topprecision@gmail.com'}?subject=General%20Application`} className="btn btn-primary btn-header-cta" style={{ borderRadius: '9999px', background: '#fff', color: '#000', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
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
              <p id="modal-req" style={{ fontSize: '1rem', color: 'var(--text-body)', lineHeight: 1.7, marginBottom: '32px', whiteSpace: 'pre-wrap' }}>{selectedJob.requirements || 'Requirements not specified.'}</p>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <a 
                  href={`mailto:${contact?.enquiryEmail || 'topprecision@gmail.com'}?subject=Job%20Application%20-%20${encodeURIComponent(selectedJob.title || '')}`}
                  className="btn btn-primary"
                  style={{ borderRadius: '9999px', padding: '12px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  Apply via Email
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
