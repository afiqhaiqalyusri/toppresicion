import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHero({ data }) {
  if (!data) return null;
  
  let heroImage = '/img/hero-cnc.jpg';
  if (data.image) {
    heroImage = data.image.startsWith('/') ? data.image : '/' + data.image;
  }

  return (
    <section className="page-hero" id="page-hero">
      <div className="page-hero-bg">
        <img src={heroImage} alt={data.title || 'Hero Background'} />
      </div>
      <div className="page-hero-overlay"></div>
      <div className="container">
        <div className="page-hero-content reveal">
          <h1 className="page-hero-title">{data.title || ''}</h1>
          <div className="page-hero-breadcrumbs">
            <Link to="/">Home</Link>
            <span className="separator">/</span>
            <span className="current">{data.breadcrumb || data.title || ''}</span>
          </div>
          {data.description && (
            <p className="page-hero-desc" style={{ marginTop: '24px', fontSize: '1.15rem', color: 'rgba(255,255,255,0.9)', maxWidth: '750px', lineHeight: 1.7, fontWeight: 300 }}>
              {data.description}
            </p>
          )}
          {data.actions && (
            <div className="page-hero-actions" style={{ marginTop: '32px' }}>
              {data.actions}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
