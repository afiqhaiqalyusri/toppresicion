import React from 'react';
import { Link } from 'react-router-dom';

export default function CapabilityCard({ service, index = 0 }) {
  if (!service) return null;

  const rawLink = service.slug || service.id || service.link || '';
  const link = '/' + rawLink.replace('.html', '').replace(/^\/+/, '');
  const isCNC = (service.slug || '').includes('cnc') || (service.name || '').toLowerCase().includes('cnc');

  const equipmentTag = isCNC ? '8 CNC Centers' : 'Box Build & AOI';

  // Crisp, concise discipline chips (less wordy)
  const subDisciplines = isCNC
    ? ['CNC Milling', 'CNC Turning', 'Multi-Axis', 'Custom Tooling']
    : ['Mechanical Assembly', 'Wiring Harnesses', 'PCBA Mounting', 'AOI Testing'];

  // Crisp specs
  const specs = isCNC
    ? [
        { label: 'Tolerance', value: '±0.01 mm' },
        { label: 'Materials', value: 'Alloy & Steel' },
        { label: 'Envelope', value: '950 × 450 mm' }
      ]
    : [
        { label: 'Specialties', value: '4 Domains' },
        { label: 'Integration', value: '100+ Parts' },
        { label: 'Testing', value: '100% AOI' }
      ];

  const imageSrc = service.supportingImage || service.heroImage || service.image || (isCNC ? 'img/precision_turning.jpg' : 'img/box_build_assembly.jpg');

  return (
    <Link to={link} className={`capability-card-pro reveal reveal-d${index + 1}`}>
      {/* Visual Header */}
      <div className="cap-pro-visual">
        <img 
          src={imageSrc.startsWith('/') ? imageSrc.substring(1) : imageSrc} 
          alt={service.name || 'Capability'} 
          loading="lazy"
        />
        <div className="cap-pro-visual-overlay"></div>
        <div className="cap-pro-badge-top">
          <span className="cap-pro-num-pill">0{index + 1}</span>
          <span className="cap-pro-fleet-pill">
            <span className="cap-pro-beacon"></span>
            {equipmentTag}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="cap-pro-body">
        <div className="cap-pro-header">
          <h3 className="cap-pro-title">{service.name || ''}</h3>
          <p className="cap-pro-desc">
            {service.shortDescription || service.description || ''}
          </p>
        </div>

        {/* Concise Sub-Disciplines List */}
        <div className="cap-pro-disciplines">
          {subDisciplines.map((item, idx) => (
            <span key={idx} className="cap-pro-tag">
              <i className="ph ph-check"></i>
              {item}
            </span>
          ))}
        </div>

        {/* Clean Engineering Metrics */}
        <div className="cap-pro-specs-bar">
          {specs.map((s, idx) => (
            <div key={idx} className="cap-pro-spec-item">
              <span className="cap-pro-spec-label">{s.label}</span>
              <strong className="cap-pro-spec-val">{s.value}</strong>
            </div>
          ))}
        </div>

        {/* Action Link Footer */}
        <div className="cap-pro-footer">
          <span className="cap-pro-action-text">Explore Capability</span>
          <span className="cap-pro-arrow-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
