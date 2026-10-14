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
        
        /* 1. Intro Story Image & Floating Badge */
        .intro-image-wrap {
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid var(--border);
          box-shadow: 0 12px 35px -8px rgba(15, 23, 42, 0.08);
          background: var(--bg-2);
        }
        .intro-image-wrap img {
          width: 100%;
          height: 100%;
          min-height: 380px;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .intro-image-wrap:hover img {
          transform: scale(1.04);
        }
        .story-floating-badge {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 12px 18px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #ffffff;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
          transition: transform 0.35s ease, background 0.35s ease;
          z-index: 2;
        }
        .intro-image-wrap:hover .story-floating-badge {
          transform: translateY(-4px);
          background: rgba(15, 23, 42, 0.96);
        }
        .story-beacon-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: beaconPulseGreen 2s infinite;
          flex-shrink: 0;
        }
        .story-floating-badge strong {
          display: block;
          font-size: 0.92rem;
          font-weight: 700;
          line-height: 1.25;
          color: #ffffff;
        }
        .story-floating-badge span {
          font-size: 0.78rem;
          color: #94a3b8;
          display: block;
        }

        /* 2. Directive Blocks Hover Interactions */
        .editorial-directive-block {
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.85);
          border-left: 3px solid #cbd5e1;
          border-radius: 14px;
          padding: 22px 24px;
          margin-bottom: 20px;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .editorial-directive-block:hover {
          transform: translateX(6px);
          background: #f0f7ff;
          border-left-color: var(--accent);
          border-color: #bfdbfe;
          box-shadow: 0 12px 30px -10px rgba(26, 86, 219, 0.12);
        }
        .editorial-directive-icon {
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.3s ease, color 0.3s ease;
        }
        .editorial-directive-block:hover .editorial-directive-icon {
          transform: scale(1.15) rotate(6deg);
          background: var(--accent);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(26, 86, 219, 0.3);
        }

        /* 3. Proof Points Hover Effects */
        .editorial-proof-item {
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .editorial-proof-item:hover {
          transform: translateY(-2px);
          color: var(--accent);
        }
        .composite-badge-pin {
          animation: pinFloat 3s ease-in-out infinite;
        }

        /* 4. Core Values Interactive Elevation */
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
          padding: 26px 22px;
          border-radius: 16px;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 2px 10px rgba(15, 23, 42, 0.02);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .editorial-value-col:hover {
          transform: translateY(-8px);
          border-color: #bfdbfe;
          box-shadow: 0 16px 35px -8px rgba(26, 86, 219, 0.12);
        }
        .editorial-value-col:hover .editorial-val-num {
          color: var(--accent);
          transform: scale(1.05);
        }
        .editorial-value-col:hover .editorial-val-accent-line {
          width: 72px;
          background: linear-gradient(90deg, #1a56db, #3b82f6);
        }
        .editorial-value-col:hover .editorial-val-icon {
          transform: scale(1.12) rotate(6deg);
          background: #1a56db;
          color: #ffffff;
          box-shadow: 0 6px 16px rgba(26, 86, 219, 0.25);
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
          top: 104px; /* Perfectly centered through the 52px milestone nodes */
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
            gap: 44px !important;
          }
          .philosophy-photo-composite {
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
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
          .editorial-directive-block {
            padding: 18px 16px !important;
          }
          .editorial-directive-quote {
            font-size: 1.02rem !important;
            line-height: 1.6 !important;
          }
          .editorial-proof-row {
            gap: 10px 14px !important;
            font-size: 0.85rem !important;
          }
        }

        /* Ultra Compact Mobile (<= 480px) */
        @media (max-width: 480px) {
          .intro-image-wrap img {
            min-height: 250px !important;
            max-height: 290px !important;
          }
          .story-floating-badge {
            bottom: 12px !important;
            left: 12px !important;
            padding: 8px 12px !important;
            gap: 8px !important;
            border-radius: 10px !important;
          }
          .story-floating-badge strong {
            font-size: 0.82rem !important;
          }
          .story-floating-badge span {
            font-size: 0.7rem !important;
          }

          .composite-badge-overlay {
            bottom: 10px !important;
            left: 10px !important;
            right: 10px !important;
            padding: 10px 12px !important;
            gap: 8px !important;
            border-radius: 10px !important;
          }
          .composite-badge-title {
            font-size: 0.82rem !important;
          }
          .composite-badge-sub {
            font-size: 0.68rem !important;
          }
          .composite-badge-pin {
            width: 28px !important;
            height: 28px !important;
            font-size: 0.9rem !important;
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
            <div className="intro-image-wrap reveal">
              <img src="img/cleanroom.jpg" alt="Top Precision assembly facility" />
              <div className="story-floating-badge">
                <span className="story-beacon-dot"></span>
                <div>
                  <strong>Bayan Lepas Hub</strong>
                  <span>Penang Manufacturing Center</span>
                </div>
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
              <h2>Vision, Mission &amp; <span className="accent">Core Values</span></h2>

              {/* Vision Statement */}
              <div className="editorial-directive-block">
                <div className="editorial-directive-header">
                  <div className="editorial-directive-icon">
                    <i className="ph ph-eye"></i>
                  </div>
                  <span className="editorial-directive-tag">Our Strategic Vision</span>
                </div>
                <p className="editorial-directive-quote">{about?.vision || ''}</p>
              </div>

              {/* Mission Statement */}
              <div className="editorial-directive-block">
                <div className="editorial-directive-header">
                  <div className="editorial-directive-icon">
                    <i className="ph ph-crosshair"></i>
                  </div>
                  <span className="editorial-directive-tag">Our Operational Mission</span>
                </div>
                <p className="editorial-directive-quote">{about?.mission || ''}</p>
              </div>

              {/* Proof Points */}
              <div className="editorial-proof-row">
                <span className="editorial-proof-item">
                  <i className="ph ph-check-circle"></i> Regional Leadership
                </span>
                <span className="editorial-proof-item">
                  <i className="ph ph-check-circle"></i> Sub-Micron Precision
                </span>
                <span className="editorial-proof-item">
                  <i className="ph ph-check-circle"></i> ISO 9001 Certified
                </span>
              </div>
            </div>

            {/* Right Photo Composite */}
            <div className="philosophy-photo-composite reveal reveal-d1">
              <img src="img/precision_turning.jpg" alt="Top Precision high-tolerance CNC machining" />
              <div className="composite-badge-overlay">
                <div className="composite-badge-text">
                  <span className="composite-badge-title">Bayan Lepas Free Industrial Zone</span>
                  <span className="composite-badge-sub">Penang, Malaysia • Advanced Manufacturing Hub</span>
                </div>
                <div className="composite-badge-pin">
                  <i className="ph ph-map-pin"></i>
                </div>
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
    </main>
  );
}
