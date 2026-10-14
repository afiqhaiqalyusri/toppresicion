import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-cms-api',
      configureServer(server) {
        server.middlewares.use('/api/save-content', (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.end('Method Not Allowed');
            return;
          }

          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });

          req.on('end', () => {
            try {
              const { filePath, data } = JSON.parse(body);
              if (!filePath || !data) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Missing filePath or data' }));
                return;
              }

              const cleanPath = filePath.replace(/^[/\\]+/, '');
              const resolvedPath = path.resolve(process.cwd(), cleanPath);

              fs.writeFileSync(resolvedPath, JSON.stringify(data, null, 2) + '\n', 'utf-8');

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, path: cleanPath }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
        });
      }
    }
  ],
  base: '/',
});

