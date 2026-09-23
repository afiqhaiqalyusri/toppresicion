import React, { useState, useEffect, useRef } from 'react';
import { Octokit } from '@octokit/rest';

const FILES = [
  'content/homepage.json',
  'content/about.json',
  'content/services.json',
  'content/company.json',
  'content/careers.json',
  'content/contact.json',
  'content/settings.json'
];

const ICON_LIBRARY = {
  "Box / Layers": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>',
  "Checkmark / Quality": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
  "Globe / Network": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  "Hexagon / Part": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  "Users / Team": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  "Settings / Gear": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
  "Factory": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/></svg>',
  "Target / Precision": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  "Tool / Wrench": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
};

const formatKey = (key) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const ImageUploader = ({ value, onChange, octokit, owner, repo, setUploadMessage }) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadMessage({ type: "info", text: "Uploading image..." });

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
          message: `Upload image ${fileName} via Admin Dashboard`,
          content: base64data,
        });

        const publicPath = `img/uploads/${fileName}`;
        onChange(publicPath);
        setUploadMessage({ type: "success", text: "Image uploaded successfully!" });
      };
    } catch (error) {
      console.error(error);
      setUploadMessage({ type: "error", text: "Failed to upload image." });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="admin-image-upload-wrapper">
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <input 
          type="text" 
          className="admin-input"
          value={value || ""} 
          onChange={e => onChange(e.target.value)}
          placeholder="e.g. img/hero.jpg"
          style={{ flex: 1 }}
        />
        <button 
          className="admin-btn-outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title="Upload an image from your computer directly to the website"
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
      {value && (
        <div style={{ marginTop: "12px", padding: "8px", background: "#f8fafc", borderRadius: "6px", border: "1px solid #e2e8f0", display: "inline-block" }}>
          <img src={`/${value.replace(/^\//, "")}`} alt="Preview" style={{ height: "60px", width: "auto", borderRadius: "4px", objectFit: "cover", opacity: isUploading ? 0.5 : 1 }} onError={(e) => e.target.style.display = "none"} />
        </div>
      )}
    </div>
  );
};

const IconPicker = ({ value, onChange }) => {
  const currentKey = Object.keys(ICON_LIBRARY).find(k => ICON_LIBRARY[k] === value) || (value ? "Custom SVG" : "");
  const [mode, setMode] = useState(currentKey === "Custom SVG" ? "code" : "select");

  return (
    <div className="admin-icon-picker">
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
        <select 
          className="admin-select"
          value={mode === "code" ? "Custom SVG" : currentKey}
          onChange={(e) => {
            const selected = e.target.value;
            if (selected === "Custom SVG") {
              setMode("code");
            } else if (selected === "") {
              setMode("select");
              onChange("");
            } else {
              setMode("select");
              onChange(ICON_LIBRARY[selected]);
            }
          }}
          style={{ flex: 1 }}
        >
          <option value="">-- No Icon --</option>
          {Object.keys(ICON_LIBRARY).map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
          <option value="Custom SVG">Custom SVG (Code)</option>
        </select>
        
        {value && mode === "select" && (
          <div 
            style={{ width: "32px", height: "32px", color: "#1a56db", display: "flex", alignItems: "center", justifyContent: "center", background: "#eff6ff", borderRadius: "6px" }}
            dangerouslySetInnerHTML={{ __html: value }} 
          />
        )}
      </div>

      {mode === "code" && (
        <textarea 
          className="admin-textarea"
          value={value || ""} 
          onChange={e => onChange(e.target.value)}
          placeholder="<svg>...</svg>"
          rows={3}
          style={{ fontFamily: "monospace", fontSize: "12px" }}
        />
      )}
    </div>
  );
};

const JsonFormNode = ({ data, onChange, fieldKey, octokit, owner, repo, setUploadMessage }) => {
  if (Array.isArray(data)) {
    return (
      <div className="admin-form-array">
        {data.map((item, index) => (
          <div key={index} className="admin-form-array-item">
            <div className="admin-form-array-header">
              <span style={{ fontWeight: 700, color: "#0f172a" }}>Item {index + 1}</span>
              <button 
                className="admin-btn-delete"
                onClick={() => {
                  const newData = [...data];
                  newData.splice(index, 1);
                  onChange(newData);
                }}
              >
                Delete Item
              </button>
            </div>
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
              />
            </div>
          </div>
        ))}
        <button 
          className="admin-btn-add"
          onClick={() => {
            let newItem = "";
            if (data.length > 0 && typeof data[0] === "object" && data[0] !== null) {
              newItem = Object.keys(data[0]).reduce((acc, k) => {
                acc[k] = typeof data[0][k] === "string" ? "" : (Array.isArray(data[0][k]) ? [] : {});
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
    return (
      <div className="admin-form-object">
        {Object.keys(data).map(key => (
          <div key={key} className="admin-form-field">
            <label className="admin-form-label">{formatKey(key)}</label>
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
            />
          </div>
        ))}
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
        <span style={{ fontSize: "0.9rem", color: "#475569" }}>{data ? "Enabled" : "Disabled"}</span>
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
    
    if (keyLower === "icon") {
      return <IconPicker value={data} onChange={onChange} />;
    }

    const isLongText = (data && data.length > 60) || 
                       (keyLower.includes("desc") || keyLower.includes("text") || keyLower.includes("content") || keyLower.includes("overview") || keyLower.includes("body"));
    
    if (isLongText) {
      return (
        <textarea 
          className="admin-textarea"
          value={data || ""} 
          onChange={e => onChange(e.target.value)} 
          rows={Math.max(3, Math.min(10, Math.ceil((data?.length || 0) / 60)))}
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

export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem("gh_token") || "");
  const [owner, setOwner] = useState(() => sessionStorage.getItem("gh_owner") || "");
  const [repo, setRepo] = useState(() => sessionStorage.getItem("gh_repo") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("gh_token"));
  
  const [octokit, setOctokit] = useState(null);
  
  const [activeFile, setActiveFile] = useState(FILES[0]);
  const [parsedData, setParsedData] = useState(null);
  const [fileSha, setFileSha] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);

  useEffect(() => {
    if (isAuthenticated && token) {
      setOctokit(new Octokit({ auth: token }));
    }
  }, [isAuthenticated, token]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (token && owner && repo) {
      sessionStorage.setItem("gh_token", token);
      sessionStorage.setItem("gh_owner", owner);
      sessionStorage.setItem("gh_repo", repo);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("gh_token");
    sessionStorage.removeItem("gh_owner");
    sessionStorage.removeItem("gh_repo");
    setToken("");
    setOwner("");
    setRepo("");
    setIsAuthenticated(false);
    setOctokit(null);
  };

  const fetchFile = async (filepath) => {
    if (!octokit) return;
    setIsLoading(true);
    setMessage("");
    try {
      const response = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: filepath,
      });

      const content = atob(response.data.content);
      setParsedData(JSON.parse(content));
      setFileSha(response.data.sha);
      setActiveFile(filepath);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(`Failed to load ${filepath}. Check if repository name is exactly correct.`);
      setParsedData(null);
      setFileSha("");
    } finally {
      setIsLoading(false);
    }
  };

  const saveFile = async () => {
    if (!octokit || !parsedData) return;
    setIsLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const fileContent = JSON.stringify(parsedData, null, 2);
      const encodedContent = btoa(unescape(encodeURIComponent(fileContent)));

      await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: activeFile,
        message: `Update ${activeFile} via Admin CMS`,
        content: encodedContent,
        sha: fileSha,
      });

      setMessage(`Successfully published changes to ${activeFile}!`);
      await fetchFile(activeFile);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage("Failed to save changes. Make sure you have the correct permissions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (octokit && isAuthenticated) {
      fetchFile(activeFile);
    }
  }, [octokit, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ background: "#fff", padding: "48px", borderRadius: "16px", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)", maxWidth: "420px", width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "0 0 8px 0" }}>Content Manager</h1>
            <p style={{ color: "#64748b", fontSize: "0.95rem", margin: 0 }}>Log in to edit your website content</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px", color: "#334155" }}>GitHub Username</label>
              <input type="text" value={owner} onChange={e => setOwner(e.target.value)} required style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px", transition: "border-color 0.2s" }} placeholder="e.g. afiqhaiqalyusri" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px", color: "#334155" }}>Repository Name (Exact match)</label>
              <input type="text" value={repo} onChange={e => setRepo(e.target.value)} required style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px" }} placeholder="e.g. toppresicion" />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, marginBottom: "8px", color: "#334155" }}>Personal Access Token</label>
              <input type="password" value={token} onChange={e => setToken(e.target.value)} required style={{ width: "100%", padding: "12px 14px", border: "1px solid #cbd5e1", borderRadius: "8px", fontSize: "15px" }} placeholder="ghp_xxxxxxxxxxxx" />
            </div>
            <button type="submit" style={{ background: "#2563eb", color: "#fff", border: "none", padding: "14px", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer", marginTop: "12px", transition: "background 0.2s" }}>
              Secure Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc", fontFamily: "system-ui, sans-serif" }}>
      <style dangerouslySetInnerHTML={{__html: `
        /* Global Admin Styles */
        * { box-sizing: border-box; }
        
        .admin-sidebar { width: 280px; background: #0f172a; color: #fff; display: flex; flex-direction: column; border-right: 1px solid #1e293b; }
        .admin-sidebar-header { padding: 32px 24px 24px; border-bottom: 1px solid #1e293b; margin-bottom: 16px; }
        .admin-sidebar-title { font-size: 1.25rem; font-weight: 800; letter-spacing: -0.025em; }
        
        .admin-nav-item { padding: 14px 24px; cursor: pointer; transition: all 0.2s; color: #94a3b8; font-weight: 500; font-size: 0.95rem; border-left: 3px solid transparent; }
        .admin-nav-item:hover { background: #1e293b; color: #f8fafc; }
        .admin-nav-item.active { background: #1e293b; color: #fff; border-left: 3px solid #3b82f6; font-weight: 600; }
        
        .admin-main { flex: 1; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .admin-header { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; z-index: 10; flex-shrink: 0; box-shadow: 0 1px 2px rgba(0,0,0,0.02); }
        .admin-content { padding: 40px; flex: 1; overflow-y: auto; background: #f8fafc; }
        
        /* Form Components */
        .admin-form-object { display: flex; flex-direction: column; gap: 24px; }
        .admin-form-field { display: flex; flex-direction: column; gap: 8px; }
        .admin-form-label { font-size: 0.85rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; }
        
        .admin-input, .admin-select { width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; color: #0f172a; font-family: inherit; transition: all 0.2s; background: #fff; }
        .admin-textarea { width: 100%; padding: 12px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; color: #0f172a; font-family: inherit; resize: vertical; line-height: 1.6; transition: all 0.2s; background: #fff; }
        .admin-input:focus, .admin-textarea:focus, .admin-select:focus { border-color: #3b82f6; outline: none; box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
        
        .admin-checkbox-wrapper { display: flex; align-items: center; gap: 10px; cursor: pointer; }
        .admin-checkbox { width: 20px; height: 20px; accent-color: #3b82f6; cursor: pointer; }
        
        /* Buttons */
        .admin-btn-primary { background: #2563eb; color: #fff; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s; display: inline-flex; align-items: center; justify-content: center; }
        .admin-btn-primary:hover:not(:disabled) { background: #1d4ed8; }
        .admin-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
        
        .admin-btn-outline { background: #fff; border: 1px solid #cbd5e1; color: #475569; padding: 10px 16px; border-radius: 6px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .admin-btn-outline:hover:not(:disabled) { border-color: #94a3b8; color: #0f172a; background: #f8fafc; }
        
        /* Arrays & Lists */
        .admin-form-array { display: flex; flex-direction: column; gap: 20px; }
        .admin-form-array-item { border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.02); overflow: hidden; }
        .admin-form-array-header { padding: 16px 24px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
        .admin-form-array-body { padding: 24px; }
        
        .admin-btn-add { align-self: flex-start; background: #fff; border: 2px dashed #cbd5e1; color: #64748b; padding: 12px 24px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .admin-btn-add:hover { border-color: #94a3b8; color: #334155; background: #f8fafc; }
        
        .admin-btn-delete { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; font-size: 0.85rem; font-weight: 600; cursor: pointer; padding: 6px 12px; border-radius: 6px; transition: all 0.2s; }
        .admin-btn-delete:hover { background: #fee2e2; border-color: #fca5a5; }
        
        /* Toast Notifications */
        .admin-toast { padding: 14px 20px; border-radius: 8px; margin-bottom: 24px; font-weight: 500; font-size: 0.95rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { transform: translateY(-10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}} />

      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-title">Content Manager</div>
          <div style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "6px", wordBreak: "break-all" }}>{owner}/{repo}</div>
        </div>
        
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ padding: "0 24px 12px", fontSize: "0.75rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Pages</div>
          {FILES.map(file => (
            <div 
              key={file} 
              className={`admin-nav-item ${activeFile === file ? "active" : ""}`}
              onClick={() => fetchFile(file)}
            >
              {file.replace("content/", "").replace(".json", "")}
            </div>
          ))}
        </div>

        <div style={{ padding: "24px" }}>
          <button onClick={handleLogout} style={{ width: "100%", padding: "12px", background: "#1e293b", border: "1px solid #334155", color: "#cbd5e1", borderRadius: "8px", cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", textTransform: "capitalize", margin: "0 0 4px 0" }}>
              {activeFile.replace("content/", "").replace(".json", "")}
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#64748b", margin: 0 }}>Editing live content</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <a href="/" target="_blank" style={{ color: "#475569", fontSize: "0.95rem", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
              View Website ↗
            </a>
            <button 
              className="admin-btn-primary"
              onClick={saveFile}
              disabled={isLoading}
            >
              {isLoading ? "Publishing..." : "Publish Changes"}
            </button>
          </div>
        </div>

        <div className="admin-content">
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            {message && (
              <div className="admin-toast" style={{ background: isError ? "#fef2f2" : "#ecfdf5", color: isError ? "#991b1b" : "#065f46", border: `1px solid ${isError ? "#fecaca" : "#a7f3d0"}` }}>
                {message}
                <button onClick={() => setMessage("")} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700 }}>×</button>
              </div>
            )}
            
            {uploadMessage && (
              <div className="admin-toast" style={{ background: uploadMessage.type === "error" ? "#fef2f2" : (uploadMessage.type === "success" ? "#ecfdf5" : "#eff6ff"), color: uploadMessage.type === "error" ? "#991b1b" : (uploadMessage.type === "success" ? "#065f46" : "#1e40af"), border: `1px solid ${uploadMessage.type === "error" ? "#fecaca" : (uploadMessage.type === "success" ? "#a7f3d0" : "#bfdbfe")}` }}>
                {uploadMessage.text}
                <button onClick={() => setUploadMessage(null)} style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", fontSize: "1.2rem", fontWeight: 700 }}>×</button>
              </div>
            )}
            
            {parsedData ? (
              <div style={{ background: "#fff", padding: "40px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" }}>
                <JsonFormNode 
                  data={parsedData} 
                  onChange={setParsedData} 
                  octokit={octokit}
                  owner={owner}
                  repo={repo}
                  setUploadMessage={setUploadMessage}
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
