import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero({ data }) {
  if (!data) return null;
  
  let heroImage = 'img/hero-cnc.jpg';
  if (data.heroImage) {
    heroImage = data.heroImage.startsWith('/') ? data.heroImage : '/' + data.heroImage;
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <img src={heroImage} alt="Hero background image" />
      </div>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content reveal">
          {data.badge && (
            <span className="hero-badge">{data.badge}</span>
          )}
          <h1 className="hero-headline" dangerouslySetInnerHTML={{ __html: data.headline || '' }} />
          {data.subheadline && (
            <p className="hero-headline-sub">{data.subheadline}</p>
          )}
          {data.body && (
            <p className="hero-body" dangerouslySetInnerHTML={{ __html: data.body }} />
          )}
          <div className="hero-actions">
            {data.ctaPrimary && (
              <Link to={`/${(data.ctaPrimaryLink || '').replace('.html', '').replace(/^\/+/, '')}`} className="btn btn-primary btn-lg">
                {data.ctaPrimary}
              </Link>
            )}
            {data.ctaSecondary && (
              <Link to={`/${(data.ctaSecondaryLink || '').replace('.html', '').replace(/^\/+/, '')}`} className="btn btn-outline-white btn-lg">
                {data.ctaSecondary}
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <span className="hero-scroll-line"></span>
        <span>Scroll</span>
      </div>
    </section>
  );
}
