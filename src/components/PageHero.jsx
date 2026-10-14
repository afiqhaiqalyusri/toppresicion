import React from 'react';
import { Link } from 'react-router-dom';

export default function PageHero({ data }) {
  if (!data) return null;
  
  let heroImage = 'img/hero-cnc.jpg';
  if (data.image) {
    heroImage = data.image.startsWith('/') ? data.image.substring(1) : data.image;
  }

    const cleanTitle = typeof data.title === 'string' ? data.title.replace(/<[^>]*>/g, '') : 'Hero Background';
    const breadcrumbText = data.breadcrumb || cleanTitle;

  return (
    <section className="page-hero" id="page-hero">
      <div className="page-hero-bg">
        <img src={heroImage} alt={cleanTitle} />
      </div>
      <div className="page-hero-overlay"></div>
      <div className="container">
        <div className="page-hero-content reveal">
          <h1 className="page-hero-title" dangerouslySetInnerHTML={{ __html: data.title || '' }} />
          <div className="page-hero-breadcrumbs">
            <Link to="/">Home</Link>
            {data.parentLabel && data.parentHref && (
              <>
                <span className="separator">/</span>
                <Link to={data.parentHref}>{data.parentLabel}</Link>
              </>
            )}
            <span className="separator">/</span>
            <span className="current">{breadcrumbText}</span>
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
