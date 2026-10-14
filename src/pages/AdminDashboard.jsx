import React, { useState, useEffect, useRef } from 'react';
import { Octokit } from '@octokit/rest';

// Pre-load current local content as baseline / local mode
import homepageLocal from '../../content/homepage.json';
import aboutLocal from '../../content/about.json';
import servicesLocal from '../../content/services.json';
import companyLocal from '../../content/company.json';
import careersLocal from '../../content/careers.json';
import contactLocal from '../../content/contact.json';
import settingsLocal from '../../content/settings.json';

const LOCAL_DATA_MAP = {
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
    subtitle: 'Hero, Who We Are, Why Choose Us, & Sectors',
    icon: 'ph-house-line',
    badge: 'Core'
  },
  {
    path: 'content/about.json',
    title: 'About Us',
    subtitle: 'Story, Vision, Mission, & Environmental Policy',
    icon: 'ph-buildings',
    badge: 'Story'
  },
  {
    path: 'content/services.json',
    title: 'Services & Capabilities',
    subtitle: 'CNC Machining, Box Build Assembly, Machines & Specs',
    icon: 'ph-gear-six',
    badge: 'Manufacturing'
  },
  {
    path: 'content/company.json',
    title: 'Company & Governance',
    subtitle: 'Company Info, Milestones, Core Values, & Policies',
    icon: 'ph-shield-check',
    badge: 'Corporate'
  },
  {
    path: 'content/careers.json',
    title: 'Careers & Openings',
    subtitle: 'Job Vacancies, Requirements, & Departments',
    icon: 'ph-briefcase',
    badge: 'Talent'
  },
  {
    path: 'content/contact.json',
    title: 'Contact Information',
    subtitle: 'Bayan Lepas Addresses, Emails, Phone, & Map',
    icon: 'ph-phone',
    badge: 'Info'
  },
  {
    path: 'content/settings.json',
    title: 'Navigation & Media',
    subtitle: 'Navbar Link Visibility & Media Assets',
    icon: 'ph-sliders-horizontal',
    badge: 'Config'
  }
];

const WEBSITE_IMAGES = [
  { path: 'img/hero-cnc.jpg', label: 'Hero CNC Machining' },
  { path: 'img/cleanroom.jpg', label: 'Cleanroom & Assembly' },
  { path: 'img/box_build_assembly.jpg', label: 'Box Build Assembly' },
  { path: 'img/cap-engineering.jpg', label: 'Engineering & DFM' },
  { path: 'img/cap-finishing.jpg', label: 'Surface Finishing' },
  { path: 'img/industry_automation.jpg', label: 'Industrial Automation' },
  { path: 'img/industry_semiconductor.jpg', label: 'Semiconductor / Electrical' },
  { path: 'img/industry_automotive.jpg', label: 'Automotive Precision' },
  { path: 'img/industry_medical.jpg', label: 'Medical Assemblies' },
  { path: 'img/industry_oilgas.jpg', label: 'Industrial & Communication' },
  { path: 'img/logo.png', label: 'Company Logo' }
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
          placeholder="e.g. img/box_build_assembly.jpg"
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "8px" }}>
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
                <img src={`/${img.path}`} alt="" style={{ width: "24px", height: "24px", objectFit: "cover", borderRadius: "4px" }} onError={(e) => e.target.style.display = 'none'} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {value && (
        <div style={{ marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "10px", padding: "6px 12px", background: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
          <img 
            src={`/${value.replace(/^\//, "")}`} 
            alt="Preview" 
            style={{ height: "48px", width: "auto", maxWidth: "80px", borderRadius: "4px", objectFit: "cover" }} 
            onError={(e) => { e.target.style.display = "none"; }} 
          />
          <div style={{ fontSize: "0.82rem", color: "#64748b" }}>
            <span style={{ fontWeight: 600, color: "#0f172a", display: "block" }}>Active Image Path:</span>
            <code>{value}</code>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Custom Icon Picker (Phosphor Class, SVG Preset, or Raw SVG) ---
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
            <span style={{ fontSize: "0.82rem", color: "#64748b" }}>Or type custom icon slug:</span>
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
              style={{ width: "26px", height: "26px", color: "#1a56db", display: "flex", alignItems: "center", justifyContent: "center" }}
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <i className={`ph ph-${value.replace(/^ph-/, '')}`} style={{ fontSize: "1.4rem", color: "#1a56db" }}></i>
          )}
          <span style={{ fontSize: "0.78rem", color: "#64748b" }}>({isSvg ? 'Raw SVG Markup' : `phosphor: ${value}`})</span>
        </div>
      )}
    </div>
  );
};

// --- Recursive Form Node with Smart Visual Array Headers ---
const JsonFormNode = ({ data, onChange, fieldKey, octokit, owner, repo, setUploadMessage, searchFilter }) => {
  const [collapsedItems, setCollapsedItems] = useState({});

  const toggleCollapse = (idx) => {
    setCollapsedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (Array.isArray(data)) {
    return (
      <div className="admin-form-array">
        {data.map((item, index) => {
          const itemTitle = getItemLabel(item, index);
          const isCollapsed = !!collapsedItems[index];

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
                    Delete Item
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
          + Add New Entry
        </button>
      </div>
    );
  } else if (typeof data === "object" && data !== null) {
    const keys = Object.keys(data).filter(key => {
      if (!searchFilter) return true;
      return key.toLowerCase().includes(searchFilter.toLowerCase()) || 
             String(data[key]).toLowerCase().includes(searchFilter.toLowerCase());
    });

    return (
      <div className="admin-form-object">
        {keys.map(key => {
          const isHtmlCapable = ['details', 'overview', 'headline', 'title', 'environment', 'body', 'description'].includes(key.toLowerCase());

          return (
            <div key={key} className="admin-form-field">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <label className="admin-form-label">{formatKey(key)}</label>
                {isHtmlCapable && (
                  <span style={{ fontSize: "0.72rem", color: "#64748b", fontStyle: "italic" }}>
                    Supports &lt;span class="accent"&gt;highlight&lt;/span&gt; &amp; &lt;br&gt;
                  </span>
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
          rows={Math.max(3, Math.min(12, Math.ceil((data?.length || 0) / 60) + 1))}
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

// --- Main Admin Dashboard Component ---
export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem("gh_token") || "");
  const [owner, setOwner] = useState(() => sessionStorage.getItem("gh_owner") || "afiqhaiqal-code");
  const [repo, setRepo] = useState(() => sessionStorage.getItem("gh_repo") || "toppresicion");
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("gh_token"));
  
  const [octokit, setOctokit] = useState(null);
  
  const [activeFile, setActiveFile] = useState(FILE_REGISTRY[0].path);
  const [parsedData, setParsedData] = useState(() => LOCAL_DATA_MAP[FILE_REGISTRY[0].path] || null);
  const [fileSha, setFileSha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");
  
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
      setMessage("Authenticated with GitHub! Fetching live repository content...");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gh_token");
    setToken("");
    setIsAuthenticated(false);
    setOctokit(null);
    setMessage("Switched to Local CMS Mode. Edits can be downloaded directly as JSON.");
  };

  // Fetch file from GitHub or fallback to pre-loaded local data
  const fetchFile = async (filepath) => {
    setActiveFile(filepath);
    setMessage("");
    setSearchFilter("");

    if (octokit && isAuthenticated) {
      setIsLoading(true);
      try {
        const response = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: filepath,
        });

        const content = atob(response.data.content);
        setParsedData(JSON.parse(content));
        setFileSha(response.data.sha);
      } catch (error) {
        console.warn(`Could not fetch ${filepath} from GitHub:`, error);
        setIsError(true);
        setMessage(`Could not load ${filepath} from GitHub. Falling back to bundled local content.`);
        setParsedData(LOCAL_DATA_MAP[filepath] || {});
        setFileSha("");
      } finally {
        setIsLoading(false);
      }
    } else {
      // Local Mode: load from bundled content
      setParsedData(LOCAL_DATA_MAP[filepath] || {});
      setFileSha("");
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
      setMessage(`Successfully published live changes to ${activeFile}!`);
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
    setMessage(`Downloaded ${activeFile.split("/").pop()}! Replace it in your content/ directory.`);
  };

  // Copy JSON to clipboard
  const copyJson = () => {
    if (!parsedData) return;
    navigator.clipboard.writeText(JSON.stringify(parsedData, null, 2));
    setMessage(`Copied ${activeFile} JSON to clipboard!`);
  };

  // Load active file on mount or when octokit connects
  useEffect(() => {
    if (octokit && isAuthenticated) {
      fetchFile(activeFile);
    }
  }, [octokit, isAuthenticated]);

  const activeMeta = FILE_REGISTRY.find(f => f.path === activeFile) || FILE_REGISTRY[0];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        * { box-sizing: border-box; }
        
        .admin-sidebar { 
          width: 320px; 
          background: #0f172a; 
          color: #fff; 
          display: flex; 
          flex-direction: column; 
          border-right: 1px solid #1e293b;
          flex-shrink: 0;
        }
        .admin-sidebar-header { 
          padding: 28px 24px 20px; 
          border-bottom: 1px solid #1e293b; 
        }
        .admin-sidebar-title { 
          font-size: 1.25rem; 
          font-weight: 800; 
          letter-spacing: -0.025em; 
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .admin-nav-item { 
          padding: 14px 20px; 
          cursor: pointer; 
          transition: all 0.2s; 
          color: #94a3b8; 
          border-left: 3px solid transparent; 
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .admin-nav-item:hover { 
          background: #1e293b; 
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
          background: #fff; 
          border-bottom: 1px solid #e2e8f0; 
          padding: 18px 36px; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          z-index: 10; 
          flex-shrink: 0; 
          box-shadow: 0 1px 3px rgba(0,0,0,0.03); 
        }
        .admin-content { 
          padding: 36px; 
          flex: 1; 
          overflow-y: auto; 
          background: #f8fafc; 
        }
        
        /* Form Components */
        .admin-form-object { display: flex; flex-direction: column; gap: 24px; }
        .admin-form-field { display: flex; flex-direction: column; gap: 8px; }
        .admin-form-label { font-size: 0.85rem; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .admin-input, .admin-select { 
          width: 100%; 
          padding: 11px 14px; 
          border: 1px solid #cbd5e1; 
          border-radius: 8px; 
          font-size: 14.5px; 
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
          font-size: 14.5px; 
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
          padding: 9px 20px; 
          border-radius: 8px; 
          font-weight: 700; 
          font-size: 0.92rem; 
          cursor: pointer; 
          transition: all 0.2s; 
          display: inline-flex; 
          align-items: center; 
          gap: 7px;
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
          font-size: 0.88rem; 
          cursor: pointer; 
          transition: all 0.2s; 
          white-space: nowrap; 
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .admin-btn-outline:hover:not(:disabled) { border-color: #94a3b8; color: #0f172a; background: #f8fafc; }
        
        /* Arrays & Lists */
        .admin-form-array { display: flex; flex-direction: column; gap: 16px; }
        .admin-form-array-item { border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.02); overflow: hidden; transition: border-color 0.2s; }
        .admin-form-array-item:hover { border-color: #cbd5e1; }
        .admin-form-array-header { padding: 14px 20px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
        .admin-form-array-body { padding: 22px; }
        
        .admin-btn-add { 
          align-self: flex-start; 
          background: #fff; 
          border: 2px dashed #93c5fd; 
          color: #2563eb; 
          padding: 10px 20px; 
          border-radius: 8px; 
          font-weight: 700; 
          cursor: pointer; 
          transition: all 0.2s; 
        }
        .admin-btn-add:hover { border-color: #2563eb; background: #eff6ff; }
        
        .admin-btn-delete { 
          background: #fef2f2; 
          border: 1px solid #fecaca; 
          color: #dc2626; 
          font-size: 0.82rem; 
          font-weight: 600; 
          cursor: pointer; 
          padding: 5px 10px; 
          border-radius: 6px; 
          transition: all 0.2s; 
        }
        .admin-btn-delete:hover { background: #fee2e2; border-color: #fca5a5; }
        
        /* Toast Notifications */
        .admin-toast { 
          padding: 12px 18px; 
          border-radius: 8px; 
          margin-bottom: 20px; 
          font-weight: 500; 
          font-size: 0.92rem; 
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
            <span style={{ width: "28px", height: "28px", background: "#2563eb", borderRadius: "6px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem" }}>⚙</span>
            Content Manager
          </div>
          <div style={{ fontSize: "0.82rem", color: isAuthenticated ? "#38bdf8" : "#94a3b8", marginTop: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: isAuthenticated ? "#10b981" : "#eab308" }}></span>
            {isAuthenticated ? `GitHub: ${owner}/${repo}` : 'Mode: Local Preview & Editing'}
          </div>
        </div>
        
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
          <div style={{ padding: "0 20px 10px", fontSize: "0.72rem", fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Website Sections
          </div>
          {FILE_REGISTRY.map(file => {
            const isActive = activeFile === file.path;
            return (
              <div 
                key={file.path} 
                className={`admin-nav-item ${isActive ? "active" : ""}`}
                onClick={() => fetchFile(file.path)}
              >
                <i className={`ph ${file.icon}`} style={{ fontSize: "1.3rem", marginTop: "2px", color: isActive ? "#60a5fa" : "#94a3b8" }}></i>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: isActive ? 700 : 600, fontSize: "0.92rem" }}>{file.title}</span>
                    <span style={{ fontSize: "0.68rem", padding: "2px 6px", borderRadius: "4px", background: isActive ? "#2563eb" : "#1e293b", color: "#e2e8f0" }}>{file.badge}</span>
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#64748b", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {file.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* GitHub Auth Section in Sidebar Footer */}
        <div style={{ padding: "18px 20px", background: "#0b1120", borderTop: "1px solid #1e293b" }}>
          {isAuthenticated ? (
            <div>
              <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginBottom: "8px" }}>
                Connected as <strong style={{ color: "#ffffff" }}>{owner}</strong>
              </div>
              <button 
                onClick={handleLogout} 
                style={{ width: "100%", padding: "8px 12px", background: "#1e293b", border: "1px solid #334155", color: "#e2e8f0", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", transition: "all 0.2s" }}
              >
                Disconnect GitHub (Local Mode)
              </button>
            </div>
          ) : (
            <details style={{ fontSize: "0.85rem" }}>
              <summary style={{ cursor: "pointer", color: "#60a5fa", fontWeight: 700 }}>
                🔗 Connect GitHub for Live Sync
              </summary>
              <form onSubmit={handleLogin} style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <input 
                  type="text" 
                  value={owner} 
                  onChange={e => setOwner(e.target.value)} 
                  placeholder="GitHub Username" 
                  required 
                  style={{ width: "100%", padding: "7px 10px", background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "6px", fontSize: "0.8rem" }} 
                />
                <input 
                  type="text" 
                  value={repo} 
                  onChange={e => setRepo(e.target.value)} 
                  placeholder="Repository Name" 
                  required 
                  style={{ width: "100%", padding: "7px 10px", background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "6px", fontSize: "0.8rem" }} 
                />
                <input 
                  type="password" 
                  value={token} 
                  onChange={e => setToken(e.target.value)} 
                  placeholder="Personal Access Token (ghp_...)" 
                  required 
                  style={{ width: "100%", padding: "7px 10px", background: "#1e293b", border: "1px solid #334155", color: "#fff", borderRadius: "6px", fontSize: "0.8rem" }} 
                />
                <button 
                  type="submit" 
                  style={{ padding: "8px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                {activeMeta.title}
              </h2>
              <span style={{ fontSize: "0.78rem", background: "#eff6ff", color: "#1d4ed8", padding: "3px 8px", borderRadius: "100px", fontWeight: 700 }}>
                {activeFile}
              </span>
            </div>
            <p style={{ fontSize: "0.88rem", color: "#64748b", margin: "4px 0 0" }}>
              {activeMeta.subtitle}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer" 
              className="admin-btn-outline"
            >
              👁 View Website ↗
            </a>

            <button 
              type="button"
              className="admin-btn-outline"
              onClick={copyJson}
              title="Copy current edited JSON to clipboard"
            >
              📋 Copy JSON
            </button>

            <button 
              type="button"
              className="admin-btn-outline"
              onClick={downloadJson}
              title="Download updated JSON file to your local computer"
            >
              💾 Download JSON
            </button>

            {isAuthenticated ? (
              <button 
                type="button"
                className="admin-btn-primary"
                onClick={saveFileToGithub}
                disabled={isLoading}
              >
                {isLoading ? "Publishing..." : "🚀 Publish to GitHub"}
              </button>
            ) : (
              <button 
                type="button"
                className="admin-btn-primary"
                onClick={() => {
                  downloadJson();
                }}
                style={{ background: "#059669" }}
                title="Download JSON file to save changes"
              >
                💾 Save / Download JSON
              </button>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="admin-content">
          <div style={{ maxWidth: "960px", margin: "0 auto" }}>
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

            {/* Quick Search and Filter Bar */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
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

              {!isAuthenticated && (
                <div style={{ fontSize: "0.82rem", color: "#475569", background: "#f1f5f9", padding: "6px 12px", borderRadius: "6px", border: "1px solid #e2e8f0" }}>
                  💡 <strong>Local Mode:</strong> All edits are active in preview. Click <em>Download JSON</em> to update files.
                </div>
              )}
            </div>

            {/* Main Visual Form Card */}
            {parsedData ? (
              <div style={{ background: "#fff", padding: "36px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.04), 0 2px 4px -2px rgba(0,0,0,0.02)", border: "1px solid #e2e8f0" }}>
                <JsonFormNode 
                  data={parsedData} 
                  onChange={setParsedData} 
                  octokit={octokit}
                  owner={owner}
                  repo={repo}
                  setUploadMessage={setUploadMessage}
                  searchFilter={searchFilter}
                />
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px", color: "#94a3b8", background: "#fff", borderRadius: "12px", border: "1px dashed #cbd5e1" }}>
                {isLoading ? "Loading content from GitHub..." : "Please select a page to edit"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
