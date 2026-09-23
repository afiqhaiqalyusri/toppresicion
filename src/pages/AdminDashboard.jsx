import React, { useState, useEffect } from 'react';
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

// Helper to format keys nicely (e.g., "homeWhoWeAre" -> "Home Who We Are")
const formatKey = (key) => {
  const result = key.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const JsonFormNode = ({ data, onChange, fieldKey }) => {
  if (Array.isArray(data)) {
    return (
      <div className="admin-form-array">
        {data.map((item, index) => (
          <div key={index} className="admin-form-array-item">
            <div className="admin-form-array-header">
              <span>Item {index + 1}</span>
              <button 
                className="admin-btn-delete"
                onClick={() => {
                  const newData = [...data];
                  newData.splice(index, 1);
                  onChange(newData);
                }}
              >
                Delete
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
              />
            </div>
          </div>
        ))}
        <button 
          className="admin-btn-add"
          onClick={() => {
            // Try to infer empty structure from first item
            let newItem = '';
            if (data.length > 0) {
              if (typeof data[0] === 'object' && data[0] !== null) {
                newItem = Object.keys(data[0]).reduce((acc, k) => {
                  acc[k] = typeof data[0][k] === 'string' ? '' : (Array.isArray(data[0][k]) ? [] : {});
                  return acc;
                }, {});
              }
            }
            onChange([...data, newItem]);
          }}
        >
          + Add New Item
        </button>
      </div>
    );
  } else if (typeof data === 'object' && data !== null) {
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
            />
          </div>
        ))}
      </div>
    );
  } else if (typeof data === 'boolean') {
    return (
      <input 
        type="checkbox" 
        className="admin-checkbox"
        checked={data} 
        onChange={e => onChange(e.target.checked)} 
      />
    );
  } else if (typeof data === 'number') {
    return (
      <input 
        type="number" 
        className="admin-input"
        value={data} 
        onChange={e => onChange(Number(e.target.value))} 
      />
    );
  } else {
    // String input
    // Use textarea for longer text or keys that imply long text (desc, text, paragraph)
    const isLongText = (data && data.length > 60) || 
                       (fieldKey && (fieldKey.toLowerCase().includes('desc') || fieldKey.toLowerCase().includes('text') || fieldKey.toLowerCase().includes('content')));
    
    if (isLongText) {
      return (
        <textarea 
          className="admin-textarea"
          value={data || ''} 
          onChange={e => onChange(e.target.value)} 
          rows={Math.max(3, Math.min(10, Math.ceil((data?.length || 0) / 60)))}
        />
      );
    }
    return (
      <input 
        type="text" 
        className="admin-input"
        value={data || ''} 
        onChange={e => onChange(e.target.value)} 
      />
    );
  }
};

export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem('gh_token') || '');
  const [owner, setOwner] = useState(() => sessionStorage.getItem('gh_owner') || '');
  const [repo, setRepo] = useState(() => sessionStorage.getItem('gh_repo') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('gh_token'));
  
  const [octokit, setOctokit] = useState(null);
  
  const [activeFile, setActiveFile] = useState(FILES[0]);
  const [parsedData, setParsedData] = useState(null);
  const [fileSha, setFileSha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token) {
      setOctokit(new Octokit({ auth: token }));
    }
  }, [isAuthenticated, token]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (token && owner && repo) {
      sessionStorage.setItem('gh_token', token);
      sessionStorage.setItem('gh_owner', owner);
      sessionStorage.setItem('gh_repo', repo);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('gh_token');
    sessionStorage.removeItem('gh_owner');
    sessionStorage.removeItem('gh_repo');
    setToken('');
    setOwner('');
    setRepo('');
    setIsAuthenticated(false);
    setOctokit(null);
  };

  const fetchFile = async (filepath) => {
    if (!octokit) return;
    setIsLoading(true);
    setMessage('');
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
      setMessage(`Failed to load ${filepath}. Ensure the file exists and you have access.`);
      setParsedData(null);
      setFileSha('');
    } finally {
      setIsLoading(false);
    }
  };

  const saveFile = async () => {
    if (!octokit || !parsedData) return;
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const fileContent = JSON.stringify(parsedData, null, 2);
      const encodedContent = btoa(unescape(encodeURIComponent(fileContent)));

      await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: activeFile,
        message: `Update ${activeFile} via Visual Admin Dashboard`,
        content: encodedContent,
        sha: fileSha,
      });

      setMessage(`Successfully saved ${activeFile}!`);
      await fetchFile(activeFile);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage('Failed to save changes to GitHub.');
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', maxWidth: '400px', width: '100%' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>Content Admin Login</h1>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>GitHub Owner / Organization</label>
              <input type="text" value={owner} onChange={e => setOwner(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }} placeholder="e.g. your-username" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Repository Name</label>
              <input type="text" value={repo} onChange={e => setRepo(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }} placeholder="e.g. top-precision-web" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px' }}>Personal Access Token</label>
              <input type="password" value={token} onChange={e => setToken(e.target.value)} required style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }} placeholder="ghp_xxxxxxxxxxxx" />
            </div>
            <button type="submit" style={{ background: '#1a56db', color: '#fff', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer', marginTop: '8px' }}>Authenticate</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .admin-sidebar { width: 280px; background: #0f172a; color: #fff; padding: 24px 0; display: flex; flex-direction: column; }
        .admin-sidebar-header { padding: 0 24px 24px; border-bottom: 1px solid #1e293b; margin-bottom: 24px; }
        .admin-sidebar-title { font-size: 1.25rem; font-weight: 800; }
        .admin-nav-item { padding: 12px 24px; cursor: pointer; transition: background 0.2s; color: #94a3b8; font-weight: 500; }
        .admin-nav-item:hover { background: #1e293b; color: #fff; }
        .admin-nav-item.active { background: #1a56db; color: #fff; border-left: 4px solid #60a5fa; }
        .admin-main { flex: 1; display: flex; flex-direction: column; height: 100vh; }
        .admin-header { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; z-index: 10; }
        .admin-content { padding: 32px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
        
        /* Form Styles */
        .admin-form-object { display: flex; flex-direction: column; gap: 20px; }
        .admin-form-field { display: flex; flex-direction: column; gap: 8px; }
        .admin-form-label { font-size: 0.9rem; font-weight: 600; color: #334155; }
        .admin-input { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; font-family: inherit; transition: border-color 0.2s; }
        .admin-textarea { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; font-family: inherit; resize: vertical; line-height: 1.5; transition: border-color 0.2s; }
        .admin-input:focus, .admin-textarea:focus { border-color: #1a56db; outline: none; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
        .admin-checkbox { width: 18px; height: 18px; cursor: pointer; }
        
        .admin-form-array { display: flex; flex-direction: column; gap: 16px; border-left: 2px solid #e2e8f0; padding-left: 16px; }
        .admin-form-array-item { border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .admin-form-array-header { padding: 12px 16px; background: #f1f5f9; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 0.9rem; color: #475569; }
        .admin-form-array-body { padding: 20px; }
        
        .admin-btn-add { align-self: flex-start; background: #f1f5f9; border: 1px dashed #94a3b8; color: #475569; padding: 10px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .admin-btn-add:hover { background: #e2e8f0; border-color: #64748b; color: #334155; }
        .admin-btn-delete { background: transparent; border: none; color: #ef4444; font-size: 0.8rem; font-weight: 600; cursor: pointer; padding: 4px 8px; border-radius: 4px; }
        .admin-btn-delete:hover { background: #fee2e2; }
      `}} />

      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-title">Content Manager</div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{owner}/{repo}</div>
        </div>
        
        <div style={{ flex: 1 }}>
          {FILES.map(file => (
            <div 
              key={file} 
              className={`admin-nav-item ${activeFile === file ? 'active' : ''}`}
              onClick={() => fetchFile(file)}
            >
              {file.replace('content/', '').replace('.json', '')}
            </div>
          ))}
        </div>

        <div style={{ padding: '24px' }}>
          <button onClick={handleLogout} style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid #475569', color: '#94a3b8', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>Log Out</button>
        </div>
      </div>

      <div className="admin-main">
        <div className="admin-header">
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0f172a', textTransform: 'capitalize' }}>
              {activeFile.replace('content/', '').replace('.json', '')} Content
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>File: {activeFile}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="/" target="_blank" style={{ color: '#1a56db', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>View Live Site ↗</a>
            <button 
              onClick={saveFile}
              disabled={isLoading}
              style={{ background: '#1a56db', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '6px', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1, transition: 'opacity 0.2s' }}
            >
              {isLoading ? 'Saving...' : 'Save & Publish'}
            </button>
          </div>
        </div>

        <div className="admin-content">
          {message && (
            <div style={{ padding: '12px 16px', background: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#991b1b' : '#166534', borderRadius: '6px', marginBottom: '24px', fontWeight: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              {message}
              <button onClick={() => setMessage('')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700 }}>×</button>
            </div>
          )}
          
          {parsedData ? (
            <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0' }}>
              <JsonFormNode data={parsedData} onChange={setParsedData} />
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: '#94a3b8' }}>
              {isLoading ? 'Loading content...' : 'Select a file to edit'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
