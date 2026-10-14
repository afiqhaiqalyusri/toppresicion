import React from 'react';
import PageHero from '../components/PageHero';
import { about, values, history } from '../content';

export default function About() {
  return (
    <main>
      <style dangerouslySetInnerHTML={{__html: `
        /* ============================================================
           ABOUT PAGE: DYNAMIC INTERACTIONS & ADVANCED RESPONSIVENESS
           ============================================================ */
        
        /* 1. Intro Story Image (Clean & Framed) */
        .intro-image-column {
          display: flex;
          flex-direction: column;
        }
        .intro-image-wrap {
          overflow: hidden;
          border-radius: var(--radius-md, 8px);
          border: 1px solid var(--border);
          box-shadow: 0 6px 24px rgba(15, 23, 42, 0.06);
          background: var(--bg-2);
        }
        .intro-image-wrap img {
          width: 100%;
          height: 100%;
          min-height: 380px;
          object-fit: cover;
          display: block;
        }

        /* 2. Philosophy Showcase: Vision & Mission (Architectural Balance) */
        .philosophy-showcase-split {
          display: grid;
          grid-template-columns: 1.08fr 0.92fr;
          gap: 40px;
          align-items: stretch;
          margin-bottom: 28px;
        }
        .philosophy-editorial-text {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .philosophy-editorial-text .section-tag {
          margin-bottom: 12px;
        }
        .philosophy-editorial-text h2 {
          font-size: clamp(2rem, 3.2vw, 2.5rem);
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 20px;
        }
        .philosophy-unified-panel {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 8px);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .philosophy-panel-row {
          padding: 24px 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: background-color 0.25s ease;
        }
        .philosophy-panel-row:hover {
          background: #fbfcfe;
        }
        .philosophy-panel-divider {
          height: 1px;
          background: var(--border);
          width: 100%;
        }
        .panel-row-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 10px;
        }
        .panel-badge {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--accent);
          background: var(--accent-bg);
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(26, 86, 219, 0.15);
        }
        .panel-badge.panel-badge-accent {
          color: var(--accent-dark);
          background: rgba(30, 58, 138, 0.07);
          border-color: rgba(30, 58, 138, 0.18);
        }
        .panel-badge-titles {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .panel-title {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text);
          line-height: 1.2;
        }
        .panel-subtitle {
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.01em;
        }
        .panel-text {
          font-size: 1.02rem;
          line-height: 1.68;
          color: var(--text-body);
          font-weight: 450;
          margin: 0;
        }

        /* 3. Industrial Photo Column (Equal Height Parity & Clean Alignment) */
        .philosophy-photo-column {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .philosophy-photo-composite {
          position: relative;
          border-radius: var(--radius-md, 8px);
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
          background: var(--bg-3);
          flex: 1;
          min-height: 300px;
        }
        .philosophy-photo-composite img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .philosophy-photo-caption {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 4px 0;
          font-size: 0.8rem;
          color: var(--text-muted);
          gap: 12px;
          flex-shrink: 0;
        }
        .photo-caption-main {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--text-body);
          font-weight: 600;
        }
        .photo-caption-main i {
          color: var(--accent);
          font-size: 0.95rem;
        }
        .photo-caption-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.02em;
        }

        /* 4. Full-Width Plinth Benchmarks Bar */
        .philosophy-specs-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto 1fr;
          align-items: center;
          gap: 24px;
          padding: 20px 32px;
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 8px);
          box-shadow: 0 2px 12px rgba(15, 23, 42, 0.03);
          margin-top: 0;
        }
        .spec-metric-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .spec-metric-icon {
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: var(--accent-bg);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          flex-shrink: 0;
        }
        .spec-metric-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .spec-metric-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .spec-metric-value {
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
        }
        .spec-metric-divider {
          width: 1px;
          background: var(--border);
          height: 38px;
        }

        /* 5. Core Values Architectural Elevation */
        .editorial-values-block {
          margin-top: 40px;
          padding-top: 56px;
          border-top: 1px solid var(--border);
        }
        .editorial-values-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 36px;
        }
        .editorial-value-col {
          padding: 24px 22px;
          border-radius: var(--radius-md, 8px);
          background: #ffffff;
          border: 1px solid var(--border);
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
          transition: border-color var(--t), box-shadow var(--t), transform var(--t);
          position: relative;
        }
        .editorial-value-col:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08);
        }
        .editorial-value-col:hover .editorial-val-num {
          color: var(--accent);
        }
        .editorial-value-col:hover .editorial-val-accent-line {
          width: 56px;
          background: var(--accent);
        }
        .editorial-value-col:hover .editorial-val-icon {
          background: var(--accent);
          color: #ffffff;
        }

        /* 5. Modern Open Timeline (Boxless, High-Precision Architectural Design) */
        .open-timeline-wrap {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
          padding: 24px 0 10px;
        }

        /* Desktop: Horizontal Connecting Track */
        .open-timeline-track {
          position: absolute;
          top: 126px; /* Centered through the 52px milestone nodes */
          left: 14%;
          right: 14%;
          height: 3px;
          background: rgba(226, 232, 240, 0.95);
          border-radius: 9999px;
          overflow: hidden;
          z-index: 1;
        }
        .open-timeline-energy-beam {
          position: absolute;
          top: 0;
          left: 0;
          width: 45%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #1a56db, #38bdf8, transparent);
          animation: timelineEnergyBeam 3.2s ease-in-out infinite;
        }
        @keyframes timelineEnergyBeam {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }

        .open-timeline-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 64px;
          position: relative;
          z-index: 2;
        }

        /* The Station: Completely open, NO BOX */
        .open-timeline-station {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          border-radius: 0 !important;
          padding: 0 !important;
          transition: transform 0.3s ease;
        }

        /* Top Header: Date & Status Chip */
        .station-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          min-height: 52px;
        }
        .station-date-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 15px;
          border-radius: 100px;
          background: #eff6ff;
          border: 1px solid #dbeafe;
          color: #1a56db;
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          transition: all 0.3s ease;
        }
        .open-timeline-station:hover .station-date-chip {
          background: #dbeafe;
          border-color: #bfdbfe;
          transform: translateY(-2px);
        }
        .station-status-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .station-beacon {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .station-beacon.beacon-green {
          background: #10b981;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: beaconPulseGreen 2s infinite;
        }
        .station-beacon.beacon-blue {
          background: #3b82f6;
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          animation: beaconPulseBlue 2s infinite;
        }
        @keyframes beaconPulseGreen {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes beaconPulseBlue {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }

        /* Center Node: Positioned directly on the track line */
        .station-node-wrap {
          position: relative;
          width: 52px;
          height: 52px;
          margin-bottom: 26px;
        }
        .station-radar-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(26, 86, 219, 0.22);
          transform: translate(-50%, -50%);
          animation: stationRadar 2.5s ease-out infinite;
        }
        @keyframes stationRadar {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
        }
        .station-node-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--accent);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 0.95rem;
          box-shadow: 0 4px 16px rgba(26, 86, 219, 0.35), 0 0 0 4px #ffffff;
          transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
        }
        .open-timeline-station:hover .station-node-dot {
          transform: translate(-50%, -50%) scale(1.12);
          background: #1e40af;
          box-shadow: 0 8px 24px rgba(26, 86, 219, 0.45), 0 0 0 5px #ffffff;
        }
        .open-timeline-station.is-latest .station-node-dot {
          background: #1a56db;
        }

        /* Bottom Content: Open Editorial Layout */
        .station-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 420px;
        }
        .station-title {
          font-size: 1.45rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: var(--text);
          margin-bottom: 12px;
          letter-spacing: -0.015em;
          line-height: 1.3;
          transition: color 0.3s ease;
        }
        .open-timeline-station:hover .station-title {
          color: var(--accent);
        }
        .station-desc {
          font-size: 0.98rem;
          color: var(--text-body);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .station-divider {
          width: 32px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
          margin-bottom: 14px;
          transition: width 0.3s ease;
        }
        .open-timeline-station:hover .station-divider {
          width: 64px;
        }
        .station-location {
          font-size: 0.85rem;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .station-location i {
          color: var(--accent);
          font-size: 0.95rem;
        }

        /* ============================================================
           COMPREHENSIVE RESPONSIVE DESIGN (TABLET & MOBILE)
           ============================================================ */
        
        /* Tablet Breakpoint (<= 992px) */
        @media (max-width: 992px) {
          .intro-split-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .intro-image-wrap {
            max-width: 620px;
            margin: 0 auto;
            width: 100%;
          }
          .intro-image-wrap img {
            min-height: 320px;
            max-height: 420px;
          }
          
          .philosophy-showcase-split {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .philosophy-photo-column {
            max-width: 620px;
            margin: 0 auto;
            width: 100%;
          }
          .philosophy-photo-composite {
            aspect-ratio: 16/10 !important;
          }

          .editorial-values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .editorial-values-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
        }

        /* Small Tablet & Mobile Breakpoint (<= 768px) */
        @media (max-width: 768px) {
          .open-timeline-wrap {
            padding: 10px 0;
            max-width: 540px;
          }
          .open-timeline-track {
            left: 26px;
            right: auto;
            top: 26px;
            bottom: 30px;
            width: 3px;
            height: auto;
            transform: translateX(-50%);
          }
          .open-timeline-energy-beam {
            width: 100%;
            height: 40%;
            background: linear-gradient(180deg, transparent, #1a56db, #38bdf8, transparent);
            animation: timelineEnergyBeamVertical 3.2s ease-in-out infinite;
          }
          @keyframes timelineEnergyBeamVertical {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(350%); }
          }

          .open-timeline-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }

          .open-timeline-station {
            align-items: flex-start !important;
            text-align: left !important;
            padding-left: 64px !important;
          }
          .station-header {
            align-items: flex-start !important;
            margin-bottom: 12px !important;
            min-height: auto !important;
          }
          .station-node-wrap {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 52px !important;
            height: 52px !important;
            margin-bottom: 0 !important;
          }
          .station-node-dot {
            width: 44px !important;
            height: 44px !important;
            font-size: 0.88rem !important;
          }
          .station-content {
            align-items: flex-start !important;
            max-width: 100% !important;
          }
          .station-title {
            font-size: 1.25rem !important;
            margin-bottom: 8px !important;
          }
          .station-desc {
            font-size: 0.92rem !important;
            line-height: 1.6 !important;
            margin-bottom: 14px !important;
          }
        }

        /* Mobile Breakpoint (<= 640px) */
        @media (max-width: 640px) {
          .editorial-values-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          .editorial-value-col {
            padding: 22px 18px !important;
          }
          .philosophy-panel-row {
            padding: 20px 18px !important;
          }
          .panel-text {
            font-size: 0.98rem !important;
            line-height: 1.6 !important;
          }
          .philosophy-specs-bar {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 16px 18px !important;
          }
          .spec-metric-divider {
            display: none !important;
          }
          .philosophy-photo-caption {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 4px !important;
          }
        }

        /* Ultra Compact Mobile (<= 480px) */
        @media (max-width: 480px) {
          .intro-image-wrap img {
            min-height: 250px !important;
            max-height: 290px !important;
          }

          .open-timeline-station {
            padding-left: 54px !important;
          }
          .open-timeline-track {
            left: 21px !important;
          }
          .station-node-wrap {
            width: 42px !important;
            height: 42px !important;
          }
          .station-node-dot {
            width: 40px !important;
            height: 40px !important;
            font-size: 0.82rem !important;
          }
          .station-date-chip {
            padding: 4px 10px !important;
            font-size: 0.8rem !important;
          }
          .station-title {
            font-size: 1.15rem !important;
          }
        }
      `}} />

      <PageHero data={{
        image: 'img/hero-cnc.jpg',
        title: 'About Top Precision',
        breadcrumb: 'About Us'
      }} />

      {/* Section 1: Our Story */}
      <section className="page-content" id="overview">
        <div className="container">
          <div className="intro-split-grid">
            <div className="intro-image-column reveal">
              <div className="intro-image-wrap">
                <img src="img/assembly-floor-workshop.jpg" alt="Top Precision assembly workshop floor" />
              </div>
              <div className="philosophy-photo-caption">
                <span className="photo-caption-main">
                  <i className="ph ph-buildings"></i> Bayan Lepas Facility
                </span>
                <span className="photo-caption-sub">Electro-Mechanical Assembly Workshop</span>
              </div>
            </div>
            <div className="intro-text reveal reveal-d1">
              <span className="section-tag">Our Story</span>
              <h2>A Legacy of <span className="accent">Precision</span></h2>
              <p>{about?.overview || ''}</p>
              <p dangerouslySetInnerHTML={{ __html: (about?.details || '').replace(/\n/g, '<br>') }}></p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Corporate Philosophy */}
      <section className="editorial-philosophy-section" id="values">
        <div className="container">
          {/* Part 1: Editorial Split (Vision & Mission + Industrial Photo) */}
          <div className="philosophy-showcase-split">
            <div className="philosophy-editorial-text reveal">
              <span className="section-tag">Corporate Philosophy</span>
              <h2>Vision &amp; Strategic Mission</h2>

              {/* Unified Executive Philosophy Panel */}
              <div className="philosophy-unified-panel">
                {/* Vision Section */}
                <div className="philosophy-panel-row">
                  <div className="panel-row-header">
                    <span className="panel-badge">01</span>
                    <span className="panel-title">Strategic Vision</span>
                  </div>
                  <p className="panel-text">{about?.vision || ''}</p>
                </div>

                <div className="philosophy-panel-divider"></div>

                {/* Mission Section */}
                <div className="philosophy-panel-row">
                  <div className="panel-row-header">
                    <span className="panel-badge panel-badge-accent">02</span>
                    <span className="panel-title">Operational Mission</span>
                  </div>
                  <p className="panel-text">{about?.mission || ''}</p>
                </div>
              </div>
            </div>

            {/* Right Photo Column: Perfectly balanced height and alignment */}
            <div className="philosophy-photo-column reveal reveal-d1">
              <div className="philosophy-photo-composite">
                <img src="img/top-precision-factory-entrance.jpg" alt="Top Precision Manufacturing Bayan Lepas Facility Entrance" />
              </div>
              <div className="philosophy-photo-caption">
                <span className="photo-caption-main">
                  <i className="ph ph-map-pin"></i> Bayan Lepas FIZ, Penang
                </span>
                <span className="photo-caption-sub">Top Precision Facility &amp; Logistics Dock</span>
              </div>
            </div>
          </div>

          {/* Full-Width Engineering Benchmarks Bar: Plinth Foundation */}
          <div className="philosophy-specs-bar reveal">
            <div className="spec-metric-item">
              <div className="spec-metric-icon">
                <i className="ph ph-globe-hemisphere-east"></i>
              </div>
              <div className="spec-metric-info">
                <span className="spec-metric-label">Regional Scope</span>
                <strong className="spec-metric-value">Southeast Asia</strong>
              </div>
            </div>
            <div className="spec-metric-divider"></div>
            <div className="spec-metric-item">
              <div className="spec-metric-icon">
                <i className="ph ph-crosshair-simple"></i>
              </div>
              <div className="spec-metric-info">
                <span className="spec-metric-label">Precision Standard</span>
                <strong className="spec-metric-value">Sub-Micron Precision</strong>
              </div>
            </div>
            <div className="spec-metric-divider"></div>
            <div className="spec-metric-item">
              <div className="spec-metric-icon">
                <i className="ph ph-certificate"></i>
              </div>
              <div className="spec-metric-info">
                <span className="spec-metric-label">Quality System</span>
                <strong className="spec-metric-value">ISO 9001:2015</strong>
              </div>
            </div>
          </div>

          {/* Part 2: Open Editorial Core Values */}
          <div className="editorial-values-block reveal">
            <div className="editorial-values-header">
              <div>
                <span className="section-tag" style={{ marginBottom: '6px' }}>Our DNA</span>
                <h3 className="editorial-values-title">Guiding Principles &amp; Core Values</h3>
              </div>
              <p className="editorial-values-lead">
                Four foundational pillars that govern our work ethic, quality discipline, and client partnerships.
              </p>
            </div>

            <div className="editorial-values-grid">
              {values && values.map((val, idx) => {
                const meta = [
                  { icon: 'ph-trend-up', tag: 'Execution & Results' },
                  { icon: 'ph-handshake', tag: 'Integrity & Trust' },
                  { icon: 'ph-graduation-cap', tag: 'Continuous Evolution' },
                  { icon: 'ph-medal', tag: 'Shared Success' }
                ];
                const item = meta[idx % meta.length];
                const num = String(idx + 1).padStart(2, '0');

                return (
                  <div key={idx} className={`editorial-value-col reveal reveal-d${idx + 1}`}>
                    <div className="editorial-val-top">
                      <span className="editorial-val-num">{num}</span>
                      <div className="editorial-val-icon">
                        <i className={`ph ${item.icon}`}></i>
                      </div>
                    </div>
                    <div className="editorial-val-accent-line"></div>
                    <span className="editorial-val-tag">{item.tag}</span>
                    <h4 className="editorial-val-title">{val.title || ''}</h4>
                    <p className="editorial-val-desc">{val.body || ''}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Open Milestone Timeline (Boxless Architectural Progression) */}
      <section className="page-content" id="history" style={{ padding: '90px 0 100px', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.025, backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '32px 32px', pointerEvents: 'none' }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-header reveal" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
            <span className="section-tag">Our Journey</span>
            <h2>Company <span className="accent">History &amp; Milestones</span></h2>
            <p style={{ color: 'var(--text-body)', fontSize: '1.05rem', lineHeight: 1.7, marginTop: '16px' }}>
              From establishment to active manufacturing operations in the Bayan Lepas Free Industrial Zone, track the evolution of our precision engineering facility.
            </p>
          </div>

          <div className="open-timeline-wrap reveal">
            <div className="open-timeline-track">
              <div className="open-timeline-energy-beam"></div>
            </div>

            <div className="open-timeline-grid">
              {history && history.map((h, i) => {
                const isLatest = i === history.length - 1;
                return (
                  <div key={i} className={`open-timeline-station ${isLatest ? 'is-latest' : ''} reveal reveal-d${i + 1}`}>
                    {/* Top: Date & Status */}
                    <div className="station-header">
                      <div className="station-date-chip">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        {h.year || ''}
                      </div>
                      <div className="station-status-tag">
                        <span className={`station-beacon ${isLatest ? 'beacon-green' : 'beacon-blue'}`}></span>
                        {isLatest ? 'Operations Active' : 'Milestone Achieved'}
                      </div>
                    </div>

                    {/* Center: The Node on the Track Line */}
                    <div className="station-node-wrap">
                      <div className="station-radar-ring"></div>
                      <div className="station-node-dot">
                        {isLatest ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                          <span>0{i + 1}</span>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Title, Description, and Location */}
                    <div className="station-content">
                      <h3 className="station-title">{h.title || ''}</h3>
                      <p className="station-desc">{h.body || ''}</p>
                      <div className="station-divider"></div>
                      <span className="station-location">
                        <i className="ph ph-map-pin"></i>
                        {i === 0 ? 'Penang, Malaysia' : 'Bayan Lepas FIZ, Penang'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Environmental Responsibility & Sustainability */}
      <section className="page-content-alt" id="environment" style={{ padding: '80px 0 90px', background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="intro-split-grid wide-gap" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '50px', alignItems: 'center' }}>
            <div className="intro-text reveal">
              <span className="section-tag">Sustainability</span>
              <h2>Environmental <span className="accent">Responsibility</span></h2>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--text-body)', marginTop: '16px' }}>
                {about?.environment || 'We recognize the importance of responsible manufacturing and strive to operate with greater awareness of environmental impact.'}
              </p>
              <div style={{ display: 'flex', gap: '14px', marginTop: '24px', flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                  <i className="ph ph-recycle" style={{ color: '#10b981', fontSize: '1.1rem' }}></i> Waste Reduction
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                  <i className="ph ph-lightning" style={{ color: '#3b82f6', fontSize: '1.1rem' }}></i> Energy Efficiency
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 14px', background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
                  <i className="ph ph-shield-check" style={{ color: '#6366f1', fontSize: '1.1rem' }}></i> Regulatory Compliance
                </span>
              </div>
            </div>
            <div className="intro-image-wrap reveal reveal-d1" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }}>
              <img src="img/cap-finishing.jpg" alt="Sustainable and environmentally responsible manufacturing practices" style={{ width: '100%', height: '100%', minHeight: '340px', objectFit: 'cover', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
