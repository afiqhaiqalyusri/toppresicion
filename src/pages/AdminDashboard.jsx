import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Octokit } from '@octokit/rest';

// Pre-load current local content as baseline / local mode
import homepageLocal from '../../content/homepage.json';
import aboutLocal from '../../content/about.json';
import servicesLocal from '../../content/services.json';
import companyLocal from '../../content/company.json';
import careersLocal from '../../content/careers.json';
import contactLocal from '../../content/contact.json';
import settingsLocal from '../../content/settings.json';

const INITIAL_DATA_MAP = {
  'content/homepage.json': homepageLocal,
  'content/about.json': aboutLocal,
  'content/services.json': servicesLocal,
  'content/company.json': companyLocal,
  'content/careers.json': careersLocal,
  'content/contact.json': contactLocal,
  'content/settings.json': settingsLocal
};

const FILE_REGISTRY = [
  {
    path: 'content/homepage.json',
    title: 'Homepage',
    subtitle: 'Hero, Who We Are, Design-to-Mfg, & Sectors',
    icon: 'ph-house-line',
    badge: 'Core',
    previewHash: '#/'
  },
  {
    path: 'content/about.json',
    title: 'About Us',
    subtitle: 'Story, Strategic Vision, Mission, & Environment',
    icon: 'ph-buildings',
    badge: 'Story',
    previewHash: '#/about'
  },
  {
    path: 'content/services.json',
    title: 'Services & Capabilities',
    subtitle: 'CNC Machining, Box Build Assembly, Fleet Specs',
    icon: 'ph-gear-six',
    badge: 'Manufacturing',
    previewHash: '#/capabilities'
  },
  {
    path: 'content/company.json',
    title: 'Company & Governance',
    subtitle: 'Company Info, History, Core Values, & Policies',
    icon: 'ph-shield-check',
    badge: 'Corporate',
    previewHash: '#/certificates'
  },
  {
    path: 'content/careers.json',
    title: 'Careers & Openings',
    subtitle: 'Job Vacancies, Requirements, & Departments',
    icon: 'ph-briefcase',
    badge: 'Talent',
    previewHash: '#/careers'
  },
  {
    path: 'content/contact.json',
    title: 'Contact Information',
    subtitle: 'Bayan Lepas Factory, Emails, Phone, & CAD Specs',
    icon: 'ph-phone',
    badge: 'Info',
    previewHash: '#/contact'
  },
  {
    path: 'content/settings.json',
    title: 'Navigation & Media',
    subtitle: 'Navbar Link Visibility & Media Assets',
    icon: 'ph-sliders-horizontal',
    badge: 'Config',
    previewHash: '#/'
  }
];

const WEBSITE_IMAGES = [
  { path: 'img/top-precision-factory-entrance.jpg', label: 'Bayan Lepas Factory Entrance & Dock', category: 'Facility', usedIn: ['About Page', 'Facilities Page', 'Contact Page'] },
  { path: 'img/assembly-floor-workshop.jpg', label: 'Assembly Floor & Workstations', category: 'Facility', usedIn: ['About Page', 'Facilities Floor', 'Homepage Who We Are', 'Careers Culture'] },
  { path: 'img/box-build-aoi-assembly.jpg', label: 'AOI Assembly Team & Machine', category: 'Capability', usedIn: ['Box Build Hero', 'Facilities Gallery'] },
  { path: 'img/electrical-panel-wiring.jpg', label: 'Electrical Panel & Enclosure Wiring', category: 'Capability', usedIn: ['Box Build Supporting', 'Capability Cards', 'Facilities Gallery'] },
  { path: 'img/engineering-dfm-cad-design.jpg', label: 'CAD & DFM Engineering Review', category: 'Engineering', usedIn: ['Homepage From Design to Mfg', 'Facilities Gallery', 'Contact Supported CAD'] },
  { path: 'img/hero-cnc.jpg', label: 'Hero CNC Machining Fleet', category: 'Machining', usedIn: ['Homepage Hero', 'Services Overview', 'Capabilities Hero'] },
  { path: 'img/precision_turning.jpg', label: 'High-Tolerance CNC Turning', category: 'Machining', usedIn: ['CNC Machining Card', 'Facilities Gallery'] },
  { path: 'img/cleanroom.jpg', label: 'Cleanroom & Assembly', category: 'Facility', usedIn: ['General Facility References'] },
  { path: 'img/box_build_assembly.jpg', label: 'Box Build Assembly Enclosure', category: 'Assembly', usedIn: ['Secondary Box Build Asset'] },
  { path: 'img/cap-quality.jpg', label: 'Quality Assurance & CMM Lab', category: 'Quality', usedIn: ['Policies Hero', 'Certificates Hero', 'Facilities Metrology'] },
  { path: 'img/industry_automation.jpg', label: 'Industrial Automation Sector', category: 'Industry', usedIn: ['Homepage Sectors'] },
  { path: 'img/industry_semiconductor.jpg', label: 'Semiconductor / Electrical', category: 'Industry', usedIn: ['Homepage Sectors'] },
  { path: 'img/industry_automotive.jpg', label: 'Automotive Precision', category: 'Industry', usedIn: ['Homepage Sectors'] },
  { path: 'img/industry_medical.jpg', label: 'Medical Assemblies', category: 'Industry', usedIn: ['Homepage Sectors'] },
  { path: 'img/industry_oilgas.jpg', label: 'Industrial & Communication', category: 'Industry', usedIn: ['Homepage Sectors'] },
  { path: 'img/new-logo.png', label: 'Top Precision Official Vector Logo', category: 'Branding', usedIn: ['Header', 'Footer', 'Browser Favicon'] }
];

const PHOSPHOR_ICON_PRESETS = [
  { id: 'gear', label: 'Gear / Machining', iconClass: 'ph-gear' },
  { id: 'target', label: 'Target / Tolerance (±0.001 cm)', iconClass: 'ph-target' },
  { id: 'layers', label: 'Layers / Sheet Metal', iconClass: 'ph-layers' },
  { id: 'dimensions', label: 'Dimensions / Max Size', iconClass: 'ph-ruler' },
  { id: 'package', label: 'Package / Box Build', iconClass: 'ph-package' },
  { id: 'circuit', label: 'Circuit / PCBA', iconClass: 'ph-cpu' },
  { id: 'search', label: 'Search / AOI Inspection', iconClass: 'ph-magnifying-glass' },
  { id: 'users', label: 'Users / Assembly Team', iconClass: 'ph-users' },
  { id: 'shield-check', label: 'Shield / Quality ISO 9001', iconClass: 'ph-shield-check' },
  { id: 'wrench', label: 'Wrench / Tooling', iconClass: 'ph-wrench' },
  { id: 'factory', label: 'Factory / Facility', iconClass: 'ph-factory' },
  { id: 'medal', label: 'Medal / Excellence', iconClass: 'ph-medal' },
  { id: 'handshake', label: 'Handshake / Partnership', iconClass: 'ph-handshake' },
  { id: 'map-pin', label: 'Map Pin / Bayan Lepas', iconClass: 'ph-map-pin' }
];

const TECHNICAL_SVG_PRESETS = {
  "Layered Stack": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  "Precision Wrench Tool": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
  "Integrated Clockwork": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  "Crosshair Precision Target": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/><circle cx="12" cy="12" r="3"/></svg>',
  "Quality Shield Verification": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
  "DFM Blueprint Document": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  "CNC Machining Part Hexagon": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>'
};

const formatKey = (key) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const getItemLabel = (item, index) => {
  if (typeof item === 'object' && item !== null) {
    if (item.name && item.brand && item.model) return `${item.brand} ${item.model} (${item.name})`;
    if (item.name) return item.name;
    if (item.title && item.year) return `${item.year} — ${item.title}`;
    if (item.title) return item.title;
    if (item.label && item.value) return `${item.label}: ${item.value}`;
    if (item.label) return item.label;
    if (item.id && item.name) return `${item.name} (${item.id})`;
    if (item.id) return item.id;
  }
  if (typeof item === 'string') return item.length > 40 ? item.substring(0, 40) + '...' : item;
  return `Item ${index + 1}`;
};

// --- Custom Image Uploader & Preset Selector ---
const ImageUploader = ({ value, onChange, octokit, owner, repo, setUploadMessage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!octokit) {
      setUploadMessage({
        type: "error",
        text: "GitHub connection required to upload files to repository. In Local Mode, select a preset or type a file path."
      });
      return;
    }

    setIsUploading(true);
    setUploadMessage({ type: "info", text: "Uploading image to GitHub..." });

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];
        const timestamp = Date.now();
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "");
        const fileName = `${timestamp}-${safeName}`;
        const filePath = `public/img/uploads/${fileName}`;

        await octokit.rest.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: filePath,
          message: `Upload image ${fileName} via Admin CMS`,
          content: base64data,
        });

        const publicPath = `img/uploads/${fileName}`;
        onChange(publicPath);
        setUploadMessage({ type: "success", text: `Image uploaded successfully as ${publicPath}!` });
      };
    } catch (error) {
      console.error(error);
      setUploadMessage({ type: "error", text: "Failed to upload image. Verify GitHub permissions." });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="admin-image-upload-wrapper">
      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        <input 
          type="text" 
          className="admin-input"
          value={value || ""} 
          onChange={e => onChange(e.target.value)}
          placeholder="e.g. img/engineering-dfm-cad-design.jpg"
          style={{ flex: 1, minWidth: "220px" }}
        />
        <button 
          type="button"
          className="admin-btn-outline"
          onClick={() => setShowPresets(!showPresets)}
          title="Pick an existing website image"
        >
          🖼 Choose Preset
        </button>
        <button 
          type="button"
          className="admin-btn-outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title={octokit ? "Upload an image directly to the repository" : "Requires GitHub connection"}
        >
          {isUploading ? "Uploading..." : "⬆ Upload New"}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleUpload} 
          accept="image/*" 
          style={{ display: "none" }} 
        />
      </div>

      {showPresets && (
        <div style={{ marginTop: "12px", padding: "14px", background: "#f1f5f9", borderRadius: "10px", border: "1px solid #cbd5e1" }}>
          <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "8px" }}>
            Select from Current Website Images:
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "8px", maxHeight: "240px", overflowY: "auto" }}>
            {WEBSITE_IMAGES.map((img) => (
              <button
                key={img.path}
                type="button"
                onClick={() => {
                  onChange(img.path);
                  setShowPresets(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 10px",
                  background: value === img.path ? "#dbeafe" : "#ffffff",
                  border: `1px solid ${value === img.path ? "#2563eb" : "#cbd5e1"}`,
                  borderRadius: "6px",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "0.82rem"
                }}
              >
                <img src={`/${img.path}`} alt="" style={{ width: "32px", height: "32px", objectFit: "cover", borderRadius: "4px", background: '#e2e8f0' }} onError={(e) => e.target.style.display = 'none'} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600, color: '#0f172a' }}>{img.label}</div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{img.category}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {value && (
        <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "12px", padding: "8px 14px", background: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <img 
            src={`/${value.replace(/^\//, "")}`} 
            alt="Preview" 
            style={{ height: "54px", width: "auto", maxWidth: "90px", borderRadius: "6px", objectFit: "cover", border: '1px solid #cbd5e1' }} 
            onError={(e) => { e.target.style.display = "none"; }} 
          />
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
            <span style={{ fontWeight: 700, color: "#0f172a", display: "block" }}>Active Image:</span>
            <code style={{ color: '#2563eb' }}>{value}</code>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Custom Icon Picker ---
const IconPicker = ({ value, onChange }) => {
  const isSvg = typeof value === 'string' && value.trim().startsWith('<svg');
  const [tab, setTab] = useState(isSvg ? 'svg' : 'phosphor');

  return (
    <div className="admin-icon-picker">
      <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
        <button
          type="button"
          onClick={() => setTab('phosphor')}
          style={{
            padding: "6px 14px",
            fontSize: "0.82rem",
            fontWeight: 700,
            borderRadius: "6px",
            border: "1px solid",
            borderColor: tab === 'phosphor' ? '#2563eb' : '#cbd5e1',
            background: tab === 'phosphor' ? '#eff6ff' : '#ffffff',
            color: tab === 'phosphor' ? '#1a56db' : '#475569',
            cursor: "pointer"
          }}
        >
          Phosphor / Preset Icons
        </button>
        <button
          type="button"
          onClick={() => setTab('svg')}
          style={{
            padding: "6px 14px",
            fontSize: "0.82rem",
            fontWeight: 700,
            borderRadius: "6px",
            border: "1px solid",
            borderColor: tab === 'svg' ? '#2563eb' : '#cbd5e1',
            background: tab === 'svg' ? '#eff6ff' : '#ffffff',
            color: tab === 'svg' ? '#1a56db' : '#475569',
            cursor: "pointer"
          }}
        >
          Technical SVG Code
        </button>
      </div>

      {tab === 'phosphor' ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "8px", maxHeight: "180px", overflowY: "auto", padding: "8px", background: "#f8fafc", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            {PHOSPHOR_ICON_PRESETS.map((p) => {
              const isSelected = value === p.id || value === p.iconClass;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onChange(p.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px",
                    background: isSelected ? "#dbeafe" : "#ffffff",
                    border: `1px solid ${isSelected ? "#2563eb" : "#cbd5e1"}`,
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    textAlign: "left"
                  }}
                >
                  <i className={`ph ${p.iconClass}`} style={{ fontSize: "1.2rem", color: isSelected ? "#1a56db" : "#3b82f6" }}></i>
                  <span style={{ fontWeight: isSelected ? 700 : 500, color: "#0f172a" }}>{p.label}</span>
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: "8px", display: "flex", gap: "10px", alignItems: "center" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Or type icon slug:</span>
            <input 
              type="text" 
              className="admin-input" 
              value={value || ""} 
              onChange={e => onChange(e.target.value)} 
              placeholder="e.g. layers, gear, target"
              style={{ width: "200px", padding: "6px 10px", fontSize: "0.85rem" }} 
            />
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
            {Object.keys(TECHNICAL_SVG_PRESETS).map(name => (
              <button
                key={name}
                type="button"
                className="admin-btn-outline"
                style={{ fontSize: "0.78rem", padding: "4px 8px" }}
                onClick={() => onChange(TECHNICAL_SVG_PRESETS[name])}
              >
                + {name}
              </button>
            ))}
          </div>
          <textarea
            className="admin-textarea"
            value={value || ""}
            onChange={e => onChange(e.target.value)}
            placeholder="<svg viewBox='0 0 24 24'>...</svg>"
            rows={4}
            style={{ fontFamily: "monospace", fontSize: "12px" }}
          />
        </div>
      )}

      {/* Visual Live Preview */}
      {value && (
        <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: "#eff6ff", borderRadius: "8px", border: "1px solid #bfdbfe", width: "fit-content" }}>
          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#1e40af" }}>Live Preview:</span>
          {isSvg ? (
            <div 
              style={{ width: "24px", height: "24px", color: "#1a56db", display: "flex", alignItems: "center", justifyContent: "center" }}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <i className={`ph ph-${value.replace(/^ph-/, '')}`} style={{ fontSize: "1.3rem", color: "#1a56db" }}></i>
          )}
          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>({isSvg ? 'Raw SVG Markup' : `Icon: ${value}`})</span>
        </div>
      )}
    </div>
  );
};

// --- Rich Materials Tag Editor ---
const MaterialsTagEditor = ({ materials, onChange }) => {
  const [newMaterial, setNewMaterial] = useState('');

  const addMaterial = () => {
    if (!newMaterial.trim()) return;
    if (materials.includes(newMaterial.trim())) return;
    onChange([...materials, newMaterial.trim()]);
    setNewMaterial('');
  };

  const removeMaterial = (index) => {
    const updated = [...materials];
    updated.splice(index, 1);
    onChange(updated);
  };

  return (
    <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        {materials.map((mat, idx) => (
          <span 
            key={idx} 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '6px 12px', 
              background: '#ffffff', 
              border: '1px solid #cbd5e1', 
              borderRadius: '20px', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              color: '#1e293b' 
            }}
          >
            {mat}
            <button 
              type="button" 
              onClick={() => removeMaterial(idx)} 
              style={{ border: 'none', background: '#fee2e2', color: '#dc2626', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', cursor: 'pointer', padding: 0 }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', maxWidth: '360px' }}>
        <input 
          type="text" 
          className="admin-input" 
          value={newMaterial} 
          onChange={e => setNewMaterial(e.target.value)} 
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addMaterial(); } }}
          placeholder="e.g. Titanium, Delrin, Brass" 
          style={{ fontSize: '0.85rem', padding: '7px 12px' }}
        />
        <button 
          type="button" 
          className="admin-btn-primary" 
          onClick={addMaterial}
          style={{ padding: '7px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
        >
          + Add
        </button>
      </div>
    </div>
  );
};

// --- Live Component Preview Panel ---
const LiveComponentPreview = ({ activeFile, data }) => {
  if (!data) return null;

  if (activeFile === 'content/services.json') {
    const cncService = (data.services || []).find(s => s.slug === 'cnc-machining') || data.services?.[0];
    const stats = cncService?.stats || [];

    return (
      <div style={{ background: '#0f172a', padding: '24px', borderRadius: '14px', marginBottom: '24px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#60a5fa' }}>
            Live Design Preview: Telemetry Specs Bar (ServiceDetail)
          </span>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Real-Time Frontend Rendering</span>
        </div>

        {/* Compact Telemetry Pill matching frontend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', background: '#ffffff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', maxWidth: '860px', margin: '0 auto', boxShadow: '0 4px 18px rgba(0,0,0,0.1)' }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ flex: 1, minWidth: '180px', padding: '12px 18px', borderRight: idx < stats.length - 1 ? '1px solid #edf2f7' : 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#eff6ff', border: '1px solid #dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a56db', flexShrink: 0 }}>
                <i className={`ph ph-${stat.icon || 'gear'}`} style={{ fontSize: '20px' }}></i>
              </div>
              <div>
                <div style={{ color: '#1a56db', fontSize: '1.15rem', fontWeight: 800, lineHeight: 1.15 }}>{stat.value}</div>
                <div style={{ color: '#475569', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activeFile === 'content/homepage.json' && data.whyChooseUs) {
    return (
      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #cbd5e1', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2563eb' }}>
            Live Preview: Homepage "From Design to Manufacturing" Feature
          </span>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Synced with Active Data</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'center', background: '#fff', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <img src={`/${(data.whyChooseUs.image || 'img/engineering-dfm-cad-design.jpg').replace(/^\/+/, '')}`} alt="Preview" style={{ width: '100%', height: '170px', objectFit: 'cover', borderRadius: '8px' }} onError={e => e.target.style.display = 'none'} />
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1a56db', textTransform: 'uppercase' }}>{data.whyChooseUs.tagline}</span>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '4px 0 8px', color: '#0f172a' }} dangerouslySetInnerHTML={{ __html: data.whyChooseUs.title || '' }}></h4>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data.whyChooseUs.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// --- Dedicated Media & Assets Library View ---
const MediaLibraryView = ({ onSelectFile }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [copiedPath, setCopiedPath] = useState('');

  const categories = ['All', 'Facility', 'Capability', 'Machining', 'Assembly', 'Engineering', 'Industry', 'Branding'];

  const filteredImages = useMemo(() => {
    if (filterCategory === 'All') return WEBSITE_IMAGES;
    return WEBSITE_IMAGES.filter(img => img.category === filterCategory);
  }, [filterCategory]);

  const copyToClipboard = (path) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(''), 2000);
  };

  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#ffffff', padding: '24px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px' }}>
            Media &amp; Asset Library
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
            Browse, copy paths, and manage authentic photography across factory operations, machinery, and assembly lines.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilterCategory(cat)}
              style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                fontWeight: 700,
                borderRadius: '6px',
                border: '1px solid',
                borderColor: filterCategory === cat ? '#2563eb' : '#cbd5e1',
                background: filterCategory === cat ? '#2563eb' : '#ffffff',
                color: filterCategory === cat ? '#ffffff' : '#475569',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredImages.map((img) => (
          <div 
            key={img.path}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ height: '180px', background: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={`/${img.path}`} 
                alt={img.label} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.src = '/img/logo.png'; }}
              />
              <span style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(15, 23, 42, 0.75)', color: '#fff', fontSize: '0.7rem', padding: '3px 8px', borderRadius: '4px', fontWeight: 600, backdropFilter: 'blur(4px)' }}>
                {img.category}
              </span>
            </div>

            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', margin: '0 0 4px' }}>
                  {img.label}
                </h4>
                <code style={{ fontSize: '0.75rem', color: '#2563eb', background: '#eff6ff', padding: '3px 6px', borderRadius: '4px', display: 'inline-block', marginBottom: '10px' }}>
                  {img.path}
                </code>

                {img.usedIn && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                    {img.usedIn.map((loc, lidx) => (
                      <span key={lidx} style={{ fontSize: '0.68rem', padding: '2px 6px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', color: '#64748b' }}>
                        {loc}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => copyToClipboard(img.path)}
                  style={{
                    flex: 1,
                    padding: '7px 12px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: copiedPath === img.path ? '#ecfdf5' : '#ffffff',
                    color: copiedPath === img.path ? '#059669' : '#0f172a',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  {copiedPath === img.path ? '✓ Copied Path' : '📋 Copy Path'}
                </button>
                <a
                  href={`/${img.path}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: '7px 10px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#475569',
                    textDecoration: 'none'
                  }}
                  title="Open full-resolution asset"
                >
                  ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Recursive Form Node with Smart Component Handlers ---
const JsonFormNode = ({ data, onChange, fieldKey, octokit, owner, repo, setUploadMessage, searchFilter, forceExpandAll }) => {
  const [collapsedItems, setCollapsedItems] = useState({});

  const toggleCollapse = (idx) => {
    setCollapsedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Dedicated Materials tag cloud
  if (fieldKey === 'materials' && Array.isArray(data) && data.every(i => typeof i === 'string')) {
    return <MaterialsTagEditor materials={data} onChange={onChange} />;
  }

  if (Array.isArray(data)) {
    return (
      <div className="admin-form-array">
        {data.map((item, index) => {
          const itemTitle = getItemLabel(item, index);
          const isCollapsed = forceExpandAll ? false : !!collapsedItems[index];

          return (
            <div key={index} className="admin-form-array-item">
              <div 
                className="admin-form-array-header"
                onClick={() => toggleCollapse(index)}
                style={{ cursor: "pointer" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ color: "#64748b", fontSize: "0.85rem", fontWeight: 700 }}>#{index + 1}</span>
                  <span style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95rem" }}>
                    {itemTitle}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{isCollapsed ? '▼ Expand' : '▲ Collapse'}</span>
                </div>
                <div style={{ display: "flex", gap: "8px" }} onClick={e => e.stopPropagation()}>
                  <button 
                    type="button"
                    className="admin-btn-delete"
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete "${itemTitle}"?`)) {
                        const newData = [...data];
                        newData.splice(index, 1);
                        onChange(newData);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {!isCollapsed && (
                <div className="admin-form-array-body">
                  <JsonFormNode 
                    data={item} 
                    onChange={(newVal) => {
                      const newData = [...data];
                      newData[index] = newVal;
                      onChange(newData);
                    }} 
                    octokit={octokit}
                    owner={owner}
                    repo={repo}
                    setUploadMessage={setUploadMessage}
                    searchFilter={searchFilter}
                    forceExpandAll={forceExpandAll}
                  />
                </div>
              )}
            </div>
          );
        })}

        <button 
          type="button"
          className="admin-btn-add"
          onClick={() => {
            let newItem = "";
            if (data.length > 0 && typeof data[0] === "object" && data[0] !== null) {
              newItem = Object.keys(data[0]).reduce((acc, k) => {
                acc[k] = typeof data[0][k] === "string" ? "" : (Array.isArray(data[0][k]) ? [] : (typeof data[0][k] === "number" ? 0 : {}));
                return acc;
              }, {});
            }
            onChange([...data, newItem]);
          }}
        >
          + Add New Item
        </button>
      </div>
    );
  } else if (typeof data === "object" && data !== null) {
    const keys = Object.keys(data).filter(key => {
      if (!searchFilter) return true;
      return key.toLowerCase().includes(searchFilter.toLowerCase()) || 
             String(data[key]).toLowerCase().includes(searchFilter.toLowerCase());
    });

    if (keys.length === 0 && searchFilter) {
      return (
        <div style={{ padding: '14px', background: '#f8fafc', borderRadius: '8px', color: '#94a3b8', fontSize: '0.85rem' }}>
          No fields matching "{searchFilter}"
        </div>
      );
    }

    return (
      <div className="admin-form-object">
        {keys.map(key => {
          const isHtmlCapable = ['details', 'overview', 'headline', 'title', 'environment', 'body', 'description', 'subheadline'].includes(key.toLowerCase());

          return (
            <div key={key} className="admin-form-field">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <label className="admin-form-label">{formatKey(key)}</label>
                {isHtmlCapable && (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        const current = data[key] || '';
                        onChange({ ...data, [key]: current + ' <span class="accent">highlight</span>' });
                      }}
                      style={{ fontSize: '0.68rem', padding: '2px 6px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: '4px', cursor: 'pointer' }}
                      title="Insert Accent Span"
                    >
                      + Accent
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const current = data[key] || '';
                        onChange({ ...data, [key]: current + '<br>' });
                      }}
                      style={{ fontSize: '0.68rem', padding: '2px 6px', background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1d4ed8', borderRadius: '4px', cursor: 'pointer' }}
                      title="Insert Line Break"
                    >
                      + &lt;br&gt;
                    </button>
                  </div>
                )}
              </div>
              <JsonFormNode 
                fieldKey={key}
                data={data[key]} 
                onChange={(newVal) => {
                  onChange({ ...data, [key]: newVal });
                }} 
                octokit={octokit}
                owner={owner}
                repo={repo}
                setUploadMessage={setUploadMessage}
                searchFilter={searchFilter}
                forceExpandAll={forceExpandAll}
              />
            </div>
          );
        })}
      </div>
    );
  } else if (typeof data === "boolean") {
    return (
      <label className="admin-checkbox-wrapper">
        <input 
          type="checkbox" 
          className="admin-checkbox"
          checked={data} 
          onChange={e => onChange(e.target.checked)} 
        />
        <span style={{ fontSize: "0.9rem", color: data ? "#10b981" : "#64748b", fontWeight: 600 }}>
          {data ? "Active / Visible" : "Hidden / Inactive"}
        </span>
      </label>
    );
  } else if (typeof data === "number") {
    return (
      <input 
        type="number" 
        className="admin-input"
        value={data} 
        onChange={e => onChange(Number(e.target.value))} 
      />
    );
  } else {
    const keyLower = (fieldKey || "").toLowerCase();
    
    // Image uploader field
    if (keyLower.includes("image") || keyLower === "logo") {
      return (
        <ImageUploader 
          value={data} 
          onChange={onChange} 
          octokit={octokit}
          owner={owner}
          repo={repo}
          setUploadMessage={setUploadMessage}
        />
      );
    }
    
    // Icon picker field
    if (keyLower === "icon") {
      return <IconPicker value={data} onChange={onChange} />;
    }

    // Long multi-line text fields
    const isLongText = (data && data.length > 55) || 
                       (keyLower.includes("desc") || keyLower.includes("text") || keyLower.includes("content") || keyLower.includes("overview") || keyLower.includes("body") || keyLower.includes("requirements") || keyLower.includes("environment") || keyLower.includes("details"));
    
    if (isLongText) {
      return (
        <textarea 
          className="admin-textarea"
          value={data || ""} 
          onChange={e => onChange(e.target.value)} 
          rows={Math.max(3, Math.min(10, Math.ceil((data?.length || 0) / 60) + 1))}
        />
      );
    }

    return (
      <input 
        type="text" 
        className="admin-input"
        value={data || ""} 
        onChange={e => onChange(e.target.value)} 
      />
    );
  }
};

// --- Executive Overview / Dashboard Home Component ---
const DashboardOverview = ({ onSelectFile, onExportBackup, onCopyAllJson, isAuthenticated, owner, repo }) => {
  return (
    <div style={{ maxWidth: '1060px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Banner */}
      <div style={{ background: 'linear-gradient(135deg, #090d16 0%, #1e3a8a 100%)', borderRadius: '16px', padding: '32px', color: '#ffffff', boxShadow: '0 10px 25px rgba(15, 23, 42, 0.15)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              {isAuthenticated ? `GitHub Connected: ${owner}/${repo}` : '⚡ Local Dev Server API Active (Direct Disk Save)'}
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.025em' }}>
              Top Precision CMS Dashboard
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
              Centralized administrative interface to manage manufacturing specifications, CNC machine fleets, career vacancies, corporate history, and website copy.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <a 
              href="#/" 
              target="_blank" 
              rel="noreferrer" 
              style={{ background: '#ffffff', color: '#0f172a', padding: '10px 18px', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            >
              👁 View Live Site ↗
            </a>
            <button 
              type="button" 
              onClick={onExportBackup} 
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', color: '#ffffff', padding: '10px 18px', borderRadius: '8px', fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              📦 Full Site Backup (.json)
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Content Files</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>7 Sections</div>
          <div style={{ fontSize: '0.78rem', color: '#10b981', marginTop: '4px', fontWeight: 600 }}>All Bundled &amp; Synced</div>
        </div>

        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Core Capabilities</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1d4ed8', marginTop: '6px' }}>2 Disciplines</div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>CNC Machining &amp; Box Build</div>
        </div>

        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Machine Fleet</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>8 Units</div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Brother SPEEDIO 3-Axis</div>
        </div>

        <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Quality Standards</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#059669', marginTop: '6px' }}>4 Standards</div>
          <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>ISO 9001, AS9100, ISO 14001</div>
        </div>
      </div>

      {/* Website Sections Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Website Sections &amp; Data Models
          </h2>
          <span style={{ fontSize: '0.82rem', color: '#64748b' }}>Select any module below to edit its content</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {FILE_REGISTRY.map((file) => (
            <div 
              key={file.path} 
              style={{ 
                background: '#ffffff', 
                borderRadius: '12px', 
                border: '1px solid #e2e8f0', 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between', 
                transition: 'all 0.2s ease', 
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)' 
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={`ph ${file.icon}`} style={{ fontSize: '1.4rem' }}></i>
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#475569' }}>
                    {file.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }}>
                  {file.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 16px', lineHeight: 1.5 }}>
                  {file.subtitle}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => onSelectFile(file.path)} 
                  style={{ flex: 1, padding: '8px 14px', background: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'background 0.2s' }}
                >
                  Edit Content &rarr;
                </button>
                <a 
                  href={file.previewHash} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ padding: '8px 12px', background: '#ffffff', border: '1px solid #cbd5e1', color: '#475569', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
                  title="Preview this section on the live website"
                >
                  ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main Admin Dashboard Component ---
export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem("gh_token") || "");
  const [owner, setOwner] = useState(() => sessionStorage.getItem("gh_owner") || "afiqhaiqal-code");
  const [repo, setRepo] = useState(() => sessionStorage.getItem("gh_repo") || "toppresicion");
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("gh_token"));
  
  const [octokit, setOctokit] = useState(null);
  
  // Active view: 'overview', 'media-library', or a file path
  const [activeFile, setActiveFile] = useState('overview');
  const [dataCache, setDataCache] = useState(INITIAL_DATA_MAP);
  const [parsedData, setParsedData] = useState(null);
  const [activeSubTab, setActiveSubTab] = useState('all');
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [fileSha, setFileSha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  const [forceExpandAll, setForceExpandAll] = useState(false);
  
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);

  // Initialize Octokit when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      setOctokit(new Octokit({ auth: token }));
    } else {
      setOctokit(null);
    }
  }, [isAuthenticated, token]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (token && owner && repo) {
      sessionStorage.setItem("gh_token", token);
      sessionStorage.setItem("gh_owner", owner);
      sessionStorage.setItem("gh_repo", repo);
      setIsAuthenticated(true);
      setMessage("Authenticated with GitHub! Live sync connected.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gh_token");
    setToken("");
    setIsAuthenticated(false);
    setOctokit(null);
    setMessage("Switched to Local CMS Mode. Direct disk saves enabled.");
  };

  // Fetch file from GitHub or bundled local data
  const fetchFile = async (filepath) => {
    setActiveFile(filepath);
    setMessage("");
    setSearchFilter("");
    setActiveSubTab('all');
    setHasUnsavedChanges(false);

    if (filepath === 'overview' || filepath === 'media-library') {
      setParsedData(null);
      return;
    }

    if (octokit && isAuthenticated) {
      setIsLoading(true);
      try {
        const response = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: filepath,
        });

        const content = atob(response.data.content);
        const json = JSON.parse(content);
        setParsedData(json);
        setDataCache(prev => ({ ...prev, [filepath]: json }));
        setFileSha(response.data.sha);
      } catch (error) {
        console.warn(`Could not fetch ${filepath} from GitHub:`, error);
        setIsError(true);
        setMessage(`Could not load ${filepath} from GitHub. Falling back to local bundled data.`);
        const fallback = dataCache[filepath] || INITIAL_DATA_MAP[filepath] || {};
        setParsedData(fallback);
        setFileSha("");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Local Mode: load from dataCache or bundled content
      const localData = dataCache[filepath] || INITIAL_DATA_MAP[filepath] || {};
      setParsedData(localData);
      setFileSha("");
    }
  };

  // Save changes directly to disk (Vite endpoint) or fallback to GitHub/download
  const saveChanges = async () => {
    if (!parsedData || activeFile === 'overview' || activeFile === 'media-library') return;
    setIsSaving(true);
    setMessage("");
    setIsError(false);

    try {
      // Attempt local Vite API endpoint
      const res = await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filePath: activeFile, data: parsedData })
      });

      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setMessage(`Saved directly to ${activeFile}! Website preview updated instantly.`);
          setIsError(false);
          setHasUnsavedChanges(false);
          setDataCache(prev => ({ ...prev, [activeFile]: parsedData }));
          setIsSaving(false);
          return;
        }
      }
      throw new Error("Local API endpoint not available");
    } catch (err) {
      // If local dev API is not running or failed, check GitHub or trigger download
      if (octokit && isAuthenticated) {
        await saveFileToGithub();
      } else {
        downloadJson();
        setMessage(`Downloaded updated ${activeFile.split("/").pop()}! (Save API not reachable)`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  // Publish to GitHub (if authenticated)
  const saveFileToGithub = async () => {
    if (!octokit || !parsedData) return;
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const fileContent = JSON.stringify(parsedData, null, 2);
      const encodedContent = btoa(unescape(encodeURIComponent(fileContent)));

      const res = await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: activeFile,
        message: `Update ${activeFile} via Admin CMS`,
        content: encodedContent,
        sha: fileSha || undefined,
      });

      setFileSha(res.data.content.sha);
      setMessage(`Successfully published live changes to ${activeFile} on GitHub!`);
      setHasUnsavedChanges(false);
      setDataCache(prev => ({ ...prev, [activeFile]: parsedData }));
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to publish to GitHub. Check repository write permissions or PAT validity.");
    } finally {
      setIsLoading(false);
    }
  };

  // Download updated JSON file directly
  const downloadJson = () => {
    if (!parsedData) return;
    const blob = new Blob([JSON.stringify(parsedData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMessage(`Downloaded ${activeFile.split("/").pop()}!`);
  };

  // Copy JSON to clipboard
  const copyJson = () => {
    if (!parsedData) return;
    navigator.clipboard.writeText(JSON.stringify(parsedData, null, 2));
    setMessage(`Copied ${activeFile} JSON to clipboard!`);
  };

  // Export complete site content backup bundle
  const handleExportFullBackup = () => {
    const fullBackup = {
      exportedAt: new Date().toISOString(),
      company: 'Top Precision Manufacturing Sdn. Bhd.',
      content: dataCache
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `top-precision-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setMessage(`Full site backup exported successfully!`);
  };

  const activeMeta = FILE_REGISTRY.find(f => f.path === activeFile) || FILE_REGISTRY[0];

  // Derive sub-tabs if active file has top-level object keys
  const subTabs = useMemo(() => {
    if (!parsedData || typeof parsedData !== 'object' || Array.isArray(parsedData)) return [];
    return Object.keys(parsedData);
  }, [parsedData]);

  // Update parsedData and track unsaved status
  const handleDataChange = (newData) => {
    setParsedData(newData);
    setHasUnsavedChanges(true);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        * { box-sizing: border-box; }
        
        .admin-sidebar { 
          width: 320px; 
          background: #090d16; 
          color: #fff; 
          display: flex; 
          flex-direction: column; 
          border-right: 1px solid #1e293b;
          flex-shrink: 0;
        }
        .admin-sidebar-header { 
          padding: 24px 20px 20px; 
          border-bottom: 1px solid #1e293b; 
        }
        .admin-sidebar-title { 
          font-size: 1.15rem; 
          font-weight: 800; 
          letter-spacing: -0.02em; 
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .admin-nav-item { 
          padding: 12px 18px; 
          cursor: pointer; 
          transition: all 0.2s; 
          color: #94a3b8; 
          border-left: 3px solid transparent; 
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .admin-nav-item:hover { 
          background: #111827; 
          color: #f8fafc; 
        }
        .admin-nav-item.active { 
          background: #1e293b; 
          color: #fff; 
          border-left: 3px solid #3b82f6; 
        }
        
        .admin-main { 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
          height: 100vh; 
          overflow: hidden; 
        }
        .admin-header { 
          background: #ffffff; 
          border-bottom: 1px solid #e2e8f0; 
          padding: 16px 32px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          z-index: 10; 
          flex-shrink: 0; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.03); 
        }
        .admin-content { 
          padding: 32px; 
          flex: 1; 
          overflow-y: auto; 
          background: #f8fafc; 
        }
        
        /* Form Components */
        .admin-form-object { display: flex; flex-direction: column; gap: 22px; }
        .admin-form-field { display: flex; flex-direction: column; gap: 8px; }
        .admin-form-label { font-size: 0.82rem; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .admin-input, .admin-select { 
          width: 100%; 
          padding: 10px 14px; 
          border: 1px solid #cbd5e1; 
          border-radius: 8px; 
          font-size: 14px; 
          color: #0f172a; 
          font-family: inherit; 
          transition: all 0.2s; 
          background: #fff; 
        }
        .admin-textarea { 
          width: 100%; 
          padding: 12px 14px; 
          border: 1px solid #cbd5e1; 
          border-radius: 8px; 
          font-size: 14px; 
          color: #0f172a; 
          font-family: inherit; 
          resize: vertical; 
          line-height: 1.6; 
          transition: all 0.2s; 
          background: #fff; 
        }
        .admin-input:focus, .admin-textarea:focus, .admin-select:focus { 
          border-color: #3b82f6; 
          outline: none; 
          box-shadow: 0 0 0 3px rgba(59,130,246,0.15); 
        }
        
        .admin-checkbox-wrapper { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; padding: 6px 0; }
        .admin-checkbox { width: 18px; height: 18px; accent-color: #2563eb; cursor: pointer; }
        
        /* Buttons */
        .admin-btn-primary { 
          background: #2563eb; 
          color: #fff; 
          border: none; 
          padding: 9px 18px; 
          border-radius: 8px; 
          font-weight: 700; 
          font-size: 0.88rem; 
          cursor: pointer; 
          transition: all 0.2s; 
          display: inline-flex; 
          align-items: center; 
          gap: 6px;
        }
        .admin-btn-primary:hover:not(:disabled) { background: #1d4ed8; transform: translateY(-1px); }
        .admin-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .admin-btn-outline { 
          background: #fff; 
          border: 1px solid #cbd5e1; 
          color: #475569; 
          padding: 8px 14px; 
          border-radius: 8px; 
          font-weight: 600; 
          font-size: 0.86rem; 
          cursor: pointer; 
          transition: all 0.2s; 
          white-space: nowrap; 
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .admin-btn-outline:hover:not(:disabled) { border-color: #94a3b8; color: #0f172a; background: #f8fafc; }
        
        /* Arrays & Lists */
        .admin-form-array { display: flex; flex-direction: column; gap: 14px; }
        .admin-form-array-item { border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.02); overflow: hidden; transition: border-color 0.2s; }
        .admin-form-array-item:hover { border-color: #cbd5e1; }
        .admin-form-array-header { padding: 12px 18px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
        .admin-form-array-body { padding: 20px; }
        
        .admin-btn-add { 
          align-self: flex-start; 
          background: #fff; 
          border: 2px dashed #93c5fd; 
          color: #2563eb; 
          padding: 9px 18px; 
          border-radius: 8px; 
          font-weight: 700; 
          font-size: 0.85rem;
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .admin-btn-add:hover { border-color: #2563eb; background: #eff6ff; }
        
        .admin-btn-delete { 
          background: #fef2f2; 
          border: 1px solid #fecaca; 
          color: #dc2626; 
          font-size: 0.78rem; 
          font-weight: 600; 
          cursor: pointer; 
          padding: 4px 8px; 
          border-radius: 6px; 
          transition: all 0.2s; 
        }
        .admin-btn-delete:hover { background: #fee2e2; border-color: #fca5a5; }
        
        /* Toast Notifications */
        .admin-toast { 
          padding: 12px 18px; 
          border-radius: 8px; 
          margin-bottom: 20px; 
          font-weight: 600; 
          font-size: 0.88rem; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); 
          animation: slideIn 0.3s ease; 
        }
        @keyframes slideIn { from { transform: translateY(-8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}} />

      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-title">
            <img src="/img/new-logo.png" alt="Top Precision Logo" style={{ height: "28px", width: "auto" }} onError={(e) => { e.target.style.display = 'none'; }} />
            <div>
              <div style={{ fontSize: "1rem", fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>Top Precision</div>
              <div style={{ fontSize: "0.72rem", color: "#60a5fa", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>CMS Studio</div>
            </div>
          </div>
          <div style={{ fontSize: "0.78rem", color: isAuthenticated ? "#38bdf8" : "#94a3b8", marginTop: "12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isAuthenticated ? "#10b981" : "#3b82f6" }}></span>
            {isAuthenticated ? `GitHub: ${owner}/${repo}` : '⚡ Local Dev Disk Sync Active'}
          </div>
        </div>
        
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
          {/* Overview Nav Item */}
          <div 
            className={`admin-nav-item ${activeFile === 'overview' ? "active" : ""}`}
            onClick={() => fetchFile('overview')}
            style={{ marginBottom: '4px' }}
          >
            <i className="ph ph-squares-four" style={{ fontSize: "1.3rem", marginTop: "2px", color: activeFile === 'overview' ? "#60a5fa" : "#94a3b8" }}></i>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: activeFile === 'overview' ? 700 : 600, fontSize: "0.92rem" }}>Dashboard Overview</span>
                <span style={{ fontSize: "0.68rem", padding: "2px 6px", borderRadius: "4px", background: activeFile === 'overview' ? "#2563eb" : "#1e293b", color: "#e2e8f0" }}>Home</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>
                Executive Status &amp; Modules
              </div>
            </div>
          </div>

          {/* Media & Asset Library Nav Item */}
          <div 
            className={`admin-nav-item ${activeFile === 'media-library' ? "active" : ""}`}
            onClick={() => fetchFile('media-library')}
            style={{ marginBottom: '8px' }}
          >
            <i className="ph ph-images" style={{ fontSize: "1.3rem", marginTop: "2px", color: activeFile === 'media-library' ? "#60a5fa" : "#94a3b8" }}></i>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: activeFile === 'media-library' ? 700 : 600, fontSize: "0.92rem" }}>Media &amp; Assets</span>
                <span style={{ fontSize: "0.68rem", padding: "2px 6px", borderRadius: "4px", background: activeFile === 'media-library' ? "#2563eb" : "#1e293b", color: "#e2e8f0" }}>{WEBSITE_IMAGES.length}</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px" }}>
                Factory Photos &amp; Brand Assets
              </div>
            </div>
          </div>

          <div style={{ padding: "12px 20px 8px", fontSize: "0.72rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Content Modules
          </div>

          {FILE_REGISTRY.map(file => {
            const isActive = activeFile === file.path;
            return (
              <div 
                key={file.path} 
                className={`admin-nav-item ${isActive ? "active" : ""}`}
                onClick={() => fetchFile(file.path)}
              >
                <i className={`ph ${file.icon}`} style={{ fontSize: "1.25rem", marginTop: "2px", color: isActive ? "#60a5fa" : "#94a3b8" }}></i>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: isActive ? 700 : 600, fontSize: "0.9rem" }}>{file.title}</span>
                    <span style={{ fontSize: "0.68rem", padding: "2px 6px", borderRadius: "4px", background: isActive ? "#2563eb" : "#1e293b", color: "#e2e8f0" }}>{file.badge}</span>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#64748b", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {file.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub Auth Section in Sidebar Footer */}
        <div style={{ padding: "16px 18px", background: "#050811", borderTop: "1px solid #1e293b" }}>
          {isAuthenticated ? (
            <div>
              <div style={{ fontSize: "0.78rem", color: "#94a3b8", marginBottom: "8px" }}>
                Connected as <strong style={{ color: "#ffffff" }}>{owner}</strong>
              </div>
              <button 
                onClick={handleLogout} 
                style={{ width: "100%", padding: "7px 12px", background: "#1e293b", border: "1px solid #334155", color: "#e2e8f0", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "0.82rem", transition: "all 0.2s" }}
              >
                Disconnect GitHub (Local Mode)
              </button>
            </div>
          ) : (
            <details style={{ fontSize: "0.82rem" }}>
              <summary style={{ cursor: "pointer", color: "#60a5fa", fontWeight: 700 }}>
                🔗 Connect GitHub Sync
              </summary>
              <form onSubmit={handleLogin} style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <input 
                  type="text" 
                  value={owner} 
                  onChange={e => setOwner(e.target.value)} 
                  placeholder="GitHub Username" 
                  required 
                  style={{ width: "100%", padding: "6px 10px", background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "6px", fontSize: "0.78rem" }} 
                />
                <input 
                  type="text" 
                  value={repo} 
                  onChange={e => setRepo(e.target.value)} 
                  placeholder="Repository Name" 
                  required 
                  style={{ width: "100%", padding: "6px 10px", background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "6px", fontSize: "0.78rem" }} 
                />
                <input 
                  type="password" 
                  value={token} 
                  onChange={e => setToken(e.target.value)} 
                  placeholder="Personal Access Token (ghp_...)" 
                  required 
                  style={{ width: "100%", padding: "6px 10px", background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "6px", fontSize: "0.78rem" }} 
                />
                <button 
                  type="submit" 
                  style={{ padding: "7px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}
                >
                  Save &amp; Connect Live Repo
                </button>
              </form>
            </details>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="admin-main">
        {/* Top Header */}
        <div className="admin-header">
          <div>
            {activeFile === 'overview' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  Admin Dashboard
                </h2>
                <span style={{ fontSize: "0.75rem", background: "#eff6ff", color: "#1d4ed8", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>
                  Executive Overview
                </span>
              </div>
            ) : activeFile === 'media-library' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                  Media &amp; Asset Library
                </h2>
                <span style={{ fontSize: "0.75rem", background: "#eff6ff", color: "#1d4ed8", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>
                  {WEBSITE_IMAGES.length} Assets
                </span>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button 
                    type="button" 
                    onClick={() => fetchFile('overview')}
                    style={{ border: 'none', background: '#f1f5f9', color: '#475569', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    ← Overview
                  </button>
                  <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    {activeMeta.title}
                  </h2>
                  <span style={{ fontSize: "0.75rem", background: "#eff6ff", color: "#1d4ed8", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>
                    {activeFile}
                  </span>
                  {hasUnsavedChanges ? (
                    <span style={{ fontSize: "0.72rem", background: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>
                      ● Unsaved Changes
                    </span>
                  ) : (
                    <span style={{ fontSize: "0.72rem", background: "#ecfdf5", color: "#059669", padding: "2px 8px", borderRadius: "100px", fontWeight: 700 }}>
                      ✓ Up to date
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "4px 0 0" }}>
                  {activeMeta.subtitle}
                </p>
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {activeFile !== 'overview' && activeFile !== 'media-library' && (
              <>
                <button
                  type="button"
                  className="admin-btn-outline"
                  onClick={() => setShowLivePreview(!showLivePreview)}
                  title="Toggle visual component preview"
                >
                  {showLivePreview ? 'Hide Design Preview' : '👁 Show Design Preview'}
                </button>

                <a 
                  href={activeMeta.previewHash || '#/'} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="admin-btn-outline"
                >
                  👁 Preview Page ↗
                </a>

                <button 
                  type="button"
                  className="admin-btn-outline"
                  onClick={copyJson}
                  title="Copy current JSON to clipboard"
                >
                  📋 Copy JSON
                </button>

                <button 
                  type="button"
                  className="admin-btn-outline"
                  onClick={downloadJson}
                  title="Download JSON file"
                >
                  💾 Download
                </button>

                <button 
                  type="button"
                  className="admin-btn-primary"
                  onClick={saveChanges}
                  disabled={isSaving || isLoading}
                  style={{ background: hasUnsavedChanges ? '#2563eb' : '#059669' }}
                >
                  {isSaving ? "Saving..." : (hasUnsavedChanges ? "💾 Save Changes" : "✓ Saved to Disk")}
                </button>

                {isAuthenticated && (
                  <button 
                    type="button"
                    className="admin-btn-primary"
                    onClick={saveFileToGithub}
                    disabled={isLoading}
                    style={{ background: '#4338ca' }}
                  >
                    {isLoading ? "Publishing..." : "🚀 Publish GitHub"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="admin-content">
          {/* Notification Toasts */}
          {message && (
            <div className="admin-toast" style={{ background: isError ? "#fef2f2" : "#ecfdf5", color: isError ? "#991b1b" : "#065f46", border: `1px solid ${isError ? "#fecaca" : "#a7f3d0"}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>{isError ? "⚠️" : "✅"}</span>
                <span>{message}</span>
              </div>
              <button onClick={() => setMessage("")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700 }}>×</button>
            </div>
          )}
          
          {uploadMessage && (
            <div className="admin-toast" style={{ background: uploadMessage.type === "error" ? "#fef2f2" : (uploadMessage.type === "success" ? "#ecfdf5" : "#eff6ff"), color: uploadMessage.type === "error" ? "#991b1b" : (uploadMessage.type === "success" ? "#065f46" : "#1e40af"), border: `1px solid ${uploadMessage.type === "error" ? "#fecaca" : (uploadMessage.type === "success" ? "#a7f3d0" : "#bfdbfe")}` }}>
              <span>{uploadMessage.text}</span>
              <button onClick={() => setUploadMessage(null)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700 }}>×</button>
            </div>
          )}

          {activeFile === 'overview' ? (
            <DashboardOverview 
              onSelectFile={fetchFile}
              onExportBackup={handleExportFullBackup}
              isAuthenticated={isAuthenticated}
              owner={owner}
              repo={repo}
            />
          ) : activeFile === 'media-library' ? (
            <MediaLibraryView onSelectFile={fetchFile} />
          ) : (
            <div style={{ maxWidth: "980px", margin: "0 auto" }}>
              {/* Optional Live Visual Design Preview Component */}
              {showLivePreview && (
                <LiveComponentPreview activeFile={activeFile} data={parsedData} />
              )}

              {/* Quick Sub-Tabs Bar (if object has sub-sections) */}
              {subTabs.length > 1 && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('all')}
                    style={{
                      padding: '7px 16px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      borderRadius: '8px',
                      border: '1px solid',
                      borderColor: activeSubTab === 'all' ? '#2563eb' : '#cbd5e1',
                      background: activeSubTab === 'all' ? '#2563eb' : '#ffffff',
                      color: activeSubTab === 'all' ? '#ffffff' : '#475569',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    All Sections ({subTabs.length})
                  </button>
                  {subTabs.map(tab => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveSubTab(tab)}
                      style={{
                        padding: '7px 16px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: activeSubTab === tab ? '#2563eb' : '#cbd5e1',
                        background: activeSubTab === tab ? '#2563eb' : '#ffffff',
                        color: activeSubTab === tab ? '#ffffff' : '#475569',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {formatKey(tab)}
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Search and Filter Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ position: "relative", width: "320px" }}>
                  <input 
                    type="text" 
                    className="admin-input" 
                    value={searchFilter} 
                    onChange={e => setSearchFilter(e.target.value)} 
                    placeholder="🔍 Search fields in this section..." 
                    style={{ paddingLeft: "12px", fontSize: "0.85rem" }} 
                  />
                  {searchFilter && (
                    <button 
                      onClick={() => setSearchFilter("")} 
                      style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}
                    >
                      ×
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setForceExpandAll(!forceExpandAll)}
                    style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 12px', fontSize: '0.8rem', fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                  >
                    {forceExpandAll ? '▲ Collapse Lists' : '▼ Expand All Lists'}
                  </button>
                  <div style={{ fontSize: "0.8rem", color: "#059669", background: "#ecfdf5", padding: "6px 12px", borderRadius: "6px", border: "1px solid #a7f3d0", fontWeight: 600 }}>
                    ⚡ Direct Disk Save Enabled
                  </div>
                </div>
              </div>

              {/* Main Visual Form Card */}
              {parsedData ? (
                <div style={{ background: "#fff", padding: "32px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -2px rgba(0,0,0,0.02)", border: "1px solid #e2e8f0" }}>
                  {activeSubTab === 'all' ? (
                    <JsonFormNode 
                      data={parsedData} 
                      onChange={handleDataChange} 
                      octokit={octokit}
                      owner={owner}
                      repo={repo}
                      setUploadMessage={setUploadMessage}
                      searchFilter={searchFilter}
                      forceExpandAll={forceExpandAll}
                    />
                  ) : (
                    <div>
                      <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                          {formatKey(activeSubTab)}
                        </h3>
                      </div>
                      <JsonFormNode 
                        fieldKey={activeSubTab}
                        data={parsedData[activeSubTab]} 
                        onChange={(newVal) => {
                          handleDataChange({ ...parsedData, [activeSubTab]: newVal });
                        }} 
                        octokit={octokit}
                        owner={owner}
                        repo={repo}
                        setUploadMessage={setUploadMessage}
                        searchFilter={searchFilter}
                        forceExpandAll={forceExpandAll}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", color: "#94a3b8", background: "#fff", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
                  {isLoading ? "Loading content..." : "Please select a page to edit"}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
