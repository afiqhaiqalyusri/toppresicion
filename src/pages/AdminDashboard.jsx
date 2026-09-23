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

export default function AdminDashboard() {
  const [token, setToken] = useState(() => sessionStorage.getItem('gh_token') || '');
  const [owner, setOwner] = useState(() => sessionStorage.getItem('gh_owner') || '');
  const [repo, setRepo] = useState(() => sessionStorage.getItem('gh_repo') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem('gh_token'));
  
  const [octokit, setOctokit] = useState(null);
  
  const [activeFile, setActiveFile] = useState(FILES[0]);
  const [fileContent, setFileContent] = useState('');
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

      // GitHub returns content in base64
      const content = atob(response.data.content);
      // Format it nicely just in case it's minified
      const formatted = JSON.stringify(JSON.parse(content), null, 2);
      
      setFileContent(formatted);
      setFileSha(response.data.sha);
      setActiveFile(filepath);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(`Failed to load ${filepath}. Ensure the file exists and you have access.`);
      setFileContent('');
      setFileSha('');
    } finally {
      setIsLoading(false);
    }
  };

  const saveFile = async () => {
    if (!octokit) return;
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      // Validate JSON before saving
      JSON.parse(fileContent);

      const encodedContent = btoa(unescape(encodeURIComponent(fileContent)));

      await octokit.rest.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: activeFile,
        message: `Update ${activeFile} via Admin Dashboard`,
        content: encodedContent,
        sha: fileSha,
      });

      setMessage(`Successfully saved ${activeFile}!`);
      // Re-fetch to get the new SHA
      await fetchFile(activeFile);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setMessage(error instanceof SyntaxError ? 'Invalid JSON format. Please fix syntax errors before saving.' : 'Failed to save changes to GitHub.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (octokit && isAuthenticated) {
      fetchFile(activeFile);
    }
  }, [octokit, isAuthenticated]); // only run when octokit initializes

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', maxWidth: '400px', width: '100%' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', textAlign: 'center' }}>GitHub CMS Login</h1>
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
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '6px' }}>Needs 'Contents: write' permissions.</p>
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
        .admin-header { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; }
        .admin-content { padding: 32px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; }
        .json-editor { flex: 1; width: 100%; font-family: monospace; font-size: 14px; padding: 16px; border: 1px solid #cbd5e1; border-radius: 8px; resize: none; outline: none; background: #fff; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02); }
        .json-editor:focus { border-color: #1a56db; box-shadow: 0 0 0 3px rgba(26,86,219,0.1); }
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
              {file}
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
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Editing: {activeFile}</h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>SHA: {fileSha || 'Unknown'}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="/" target="_blank" style={{ color: '#1a56db', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none' }}>View Live Site ↗</a>
            <button 
              onClick={saveFile}
              disabled={isLoading}
              style={{ background: '#1a56db', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? 'Saving...' : 'Commit Changes'}
            </button>
          </div>
        </div>

        <div className="admin-content">
          {message && (
            <div style={{ padding: '12px 16px', background: isError ? '#fee2e2' : '#dcfce7', color: isError ? '#991b1b' : '#166534', borderRadius: '6px', marginBottom: '24px', fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
              {message}
              <button onClick={() => setMessage('')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 700 }}>×</button>
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontWeight: 600, color: '#334155' }}>JSON Content</span>
            <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Must be valid JSON formatting. Do not remove essential keys.</span>
          </div>

          <textarea 
            className="json-editor"
            value={fileContent}
            onChange={e => setFileContent(e.target.value)}
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
