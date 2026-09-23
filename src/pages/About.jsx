import React from 'react';
import PageHero from '../components/PageHero';
import { about, values, history } from '../content';

export default function About() {
  const valueIconClasses = [
    'ph-arrow-up-right',
    'ph-handshake',
    'ph-graduation-cap',
    'ph-medal'
  ];

  return (
    <main>
      <PageHero data={{
        image: 'img/hero-cnc.jpg',
        title: 'About Top Precision',
        breadcrumb: 'About Us'
      }} />

      <section className="page-content" id="overview">
        <div className="container">
          <div className="intro-split-grid">
            <div className="intro-image-wrap reveal">
              <img src="/img/cleanroom.jpg" alt="Top Precision assembly facility" />
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

      <section className="page-content-alt" id="values">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">What Drives Us</span>
            <h2>Vision, Mission &amp; <span className="accent">Core Values</span></h2>
          </div>
          <div className="about-grid">
            <div className="reveal reveal-d1 value-card">
              <div className="value-card-icon">
                <i className="ph ph-eye"></i>
              </div>
              <h3 className="value-card-title">Our Vision</h3>
              <p className="value-card-text">{about?.vision || ''}</p>
            </div>
            <div className="reveal reveal-d2 value-card">
              <div className="value-card-icon">
                <i className="ph ph-crosshair-simple"></i>
              </div>
              <h3 className="value-card-title">Our Mission</h3>
              <p className="value-card-text">{about?.mission || ''}</p>
            </div>
          </div>

          <div className="values-grid">
            {values && values.map((val, idx) => (
              <div key={idx} className="reveal value-card centered">
                <div className="value-card-icon">
                  <i className={`ph ${valueIconClasses[idx % valueIconClasses.length]}`}></i>
                </div>
                <h4 className="value-card-title">{val.title || ''}</h4>
                <p className="value-card-text">{val.body || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content" id="history">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Our Journey</span>
            <h2>Company <span className="accent">History &amp; Milestones</span></h2>
          </div>
          <div className="timeline">
            {history && history.map((h, i) => (
              <div key={i} className="timeline-entry reveal">
                {i % 2 === 0 ? (
                  <>
                    <div className="timeline-empty"></div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-text">
                      <div className="timeline-year">{h.year || ''}</div>
                      <div className="timeline-title">{h.title || ''}</div>
                      <div className="timeline-desc">{h.body || ''}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="timeline-text align-right">
                      <div className="timeline-year">{h.year || ''}</div>
                      <div className="timeline-title">{h.title || ''}</div>
                      <div className="timeline-desc">{h.body || ''}</div>
                    </div>
                    <div className="timeline-dot"></div>
                    <div className="timeline-empty"></div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-content-alt" id="environment">
        <div className="container">
          <div className="intro-split-grid wide-gap">
            <div className="intro-text reveal">
              <span className="section-tag">Sustainability</span>
              <h2>Environmental <span className="accent">Responsibility</span></h2>
              <div className="env-body-text" dangerouslySetInnerHTML={{ __html: about?.environment || 'No environmental policy available.' }}>
              </div>
            </div>
            <div className="intro-image-wrap reveal">
              <img src="/img/cap-finishing.jpg" alt="Sustainable surface finishing process" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
