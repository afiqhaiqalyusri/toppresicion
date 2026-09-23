import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({ data }) {
  if (!data) return null;
  
  const { variant = '', delayClass = '', image = '', title = '', description = '', link: rawLink = '' } = data;
  const link = rawLink ? '/' + rawLink.replace('.html', '').replace(/^\/+/, '') : '#';

  if (variant === 'capability') {
    return (
      <Link 
        to={link} 
        className={`cap-tile reveal ${delayClass}`} 
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          background: 'var(--surface)', 
          border: '1px solid var(--border)', 
          borderRadius: 'var(--radius-lg)', 
          overflow: 'hidden', 
          textDecoration: 'none', 
          boxShadow: '0 4px 15px rgba(0,0,0,0.03)', 
          transition: 'transform 0.3s ease, boxShadow 0.3s ease', 
          aspectRatio: 'auto'
        }}
      >
        <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <img 
            src={image.startsWith('/') ? image : '/' + image} 
            alt={title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block' }} 
          />
        </div>
        <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', margin: '0 0 12px 0', fontFamily: 'var(--font-heading)', lineHeight: 1.3 }}>
            {title}
          </h3>
          {description && (
            <p style={{ fontSize: '0.95rem', color: 'var(--text-body)', lineHeight: 1.6, margin: '0 0 24px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flexGrow: 1 }}>
              {description}
            </p>
          )}
          <div style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: 'auto' }}>
            Explore Capability
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: '16px', height: '16px' }}>
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'sector') {
    return (
      <Link to={link} className={`sector-card reveal ${delayClass}`}>
        <img src={image.startsWith('/') ? image : '/' + image} alt={title} />
        <div className="sector-overlay">
          <h3>{title}</h3>
          {description && (
            <p>{description}</p>
          )}
        </div>
      </Link>
    );
  }

  return null;
}
