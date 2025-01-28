const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const maxParser = require('./parsers/max-parser');
const { parseMaxtFile } = require('./parsers/maxt-parser');
const fs = require('fs');

class AniMaxServer {
  constructor() {
    this.app = express();
    this.setupMiddleware();
  }

  setupMiddleware() {
    this.app.use(express.json());
    
    // Debug middleware
    this.app.use((req, res, next) => {
      console.log('İstek:', req.method, req.url);
      next();
    });
    
    // Güvenlik başlıkları ve CSP
    this.app.use((req, res, next) => {
      res.setHeader(
        'Content-Security-Policy',
        [
          "default-src 'self'",
          "font-src 'self' https: data: *",
          "img-src 'self' data: https: *",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' *",
          "style-src 'self' 'unsafe-inline' *",
          "connect-src 'self' *"
        ].join('; ')
      );
      next();
    });

    // Statik dosya servisi
    this.app.use(express.static(path.join(process.cwd(), 'public')));
    this.app.use(express.static(path.join(process.cwd(), 'src')));
    this.app.use('/assets', express.static(path.join(process.cwd(), 'src', 'assets')));
    
    // Root path için yönlendirme
    this.app.get('/', async (req, res) => {
      try {
        console.log('Ana sayfa isteği alındı');
        const indexPath = path.join(process.cwd(), 'src', 'pages', 'index.max');
        console.log('index.max dosya yolu:', indexPath);
        
        if (!fs.existsSync(indexPath)) {
          console.error('index.max dosyası bulunamadı!');
          return res.status(404).send('index.max dosyası bulunamadı');
        }
        
        console.log('index.max dosyası bulundu, render ediliyor...');
        const result = await maxParser.render(indexPath);
        console.log('Render sonucu:', result);
        
        const html = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>AniMax App</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }

                body {
                  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  background: linear-gradient(135deg, #f6f8fd 0%, #f1f4f9 100%);
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  padding: 2rem;
                  color: #1a1f36;
                }

                .container {
                  max-width: 1200px;
                  width: 100%;
                  margin: 0 auto;
                  padding: 3rem;
                  background: rgba(255, 255, 255, 0.95);
                  border-radius: 24px;
                  box-shadow: 0 8px 32px -8px rgba(0, 0, 0, 0.1);
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255, 255, 255, 0.2);
                  position: relative;
                  overflow: hidden;
                }

                .container::before {
                  content: '';
                  position: absolute;
                  top: -50%;
                  left: -50%;
                  width: 200%;
                  height: 200%;
                  background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
                  pointer-events: none;
                  z-index: 1;
                }

                .title {
                  font-size: 4rem;
                  font-weight: 700;
                  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  margin-bottom: 1.5rem;
                  line-height: 1.2;
                  position: relative;
                  z-index: 2;
                }

                .text {
                  font-size: 1.5rem;
                  color: #4b5563;
                  line-height: 1.7;
                  font-weight: 400;
                  max-width: 800px;
                  position: relative;
                  z-index: 2;
                }

                .button {
                  display: inline-flex;
                  align-items: center;
                  padding: 1rem 2rem;
                  background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
                  color: white;
                  border: none;
                  border-radius: 12px;
                  font-size: 1.1rem;
                  font-weight: 600;
                  cursor: pointer;
                  transition: all 0.3s ease;
                  text-decoration: none;
                  margin-top: 2rem;
                }

                .button:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 8px 16px -4px rgba(37, 99, 235, 0.3);
                }

                .grid {
                  display: grid;
                  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                  gap: 2rem;
                  margin-top: 3rem;
                }

                .card {
                  background: white;
                  padding: 2rem;
                  border-radius: 16px;
                  box-shadow: 0 4px 16px -4px rgba(0, 0, 0, 0.1);
                  transition: all 0.3s ease;
                }

                .card:hover {
                  transform: translateY(-4px);
                  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
                }

                .input {
                  width: 100%;
                  padding: 1rem 1.5rem;
                  border: 2px solid #e5e7eb;
                  border-radius: 12px;
                  font-size: 1rem;
                  transition: all 0.3s ease;
                  outline: none;
                  font-family: inherit;
                }

                .input:focus {
                  border-color: #3b82f6;
                  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
                }

                @media (max-width: 768px) {
                  body {
                    padding: 1rem;
                  }

                  .container {
                    padding: 2rem;
                  }

                  .title {
                    font-size: 3rem;
                  }

                  .text {
                    font-size: 1.25rem;
                  }
                }
              </style>
            </head>
            <body>
              ${result}
            </body>
          </html>
        `;
        
        console.log('HTML gönderiliyor...');
        res.send(html);
      } catch (error) {
        console.error('Ana sayfa render hatası:', error);
        res.status(500).send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Hata</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { 
                  font-family: system-ui;
                  padding: 2rem;
                  background: #f9fafb;
                  margin: 0;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .error-container {
                  background: white;
                  padding: 2rem;
                  border-radius: 8px;
                  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                  max-width: 600px;
                  width: 100%;
                }
                .error { color: #dc2626; margin-top: 0; }
                pre { 
                  background: #f3f4f6;
                  padding: 1rem;
                  border-radius: 4px;
                  overflow-x: auto;
                }
              </style>
            </head>
            <body>
              <div class="error-container">
                <h1 class="error">Sayfa yüklenirken bir hata oluştu</h1>
                <pre>${error.stack}</pre>
              </div>
            </body>
          </html>
        `);
      }
    });
    
    // .max ve .maxt dosyalarını işle
    this.app.use(async (req, res, next) => {
      if (req.path.endsWith('.max')) {
        try {
          const filePath = path.join(process.cwd(), 'src', 'pages', req.path);
          const result = await maxParser.render(filePath);
          return res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>AniMax App</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body {
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                    margin: 0;
                    padding: 20px;
                  }
                  .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                  }
                  .title {
                    font-size: 2.5rem;
                    color: #333;
                    margin-bottom: 1rem;
                  }
                  .text {
                    font-size: 1.2rem;
                    color: #666;
                    line-height: 1.6;
                  }
                </style>
              </head>
              <body>
                ${result}
              </body>
            </html>
          `);
        } catch (error) {
          console.error('Hata:', error);
          return next(error);
        }
      }
      next();
    });

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>404 - Sayfa Bulunamadı</title>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                margin: 0;
                padding: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: #f5f5f5;
              }
              .error-container {
                text-align: center;
                padding: 40px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              h1 { color: #333; margin-bottom: 1rem; }
              p { color: #666; }
            </style>
          </head>
          <body>
            <div class="error-container">
              <h1>404 - Sayfa Bulunamadı</h1>
              <p>Aradığınız sayfa bulunamadı.</p>
            </div>
          </body>
        </html>
      `);
    });
  }

  setupWatcher() {
    const watcher = chokidar.watch([
      path.join(process.cwd(), 'src', 'pages', '**', '*.max'),
      path.join(process.cwd(), 'src', 'styles', '**', '*.maxt')
    ], {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });

    watcher
      .on('change', filePath => {
        console.log(`Dosya değişti: ${filePath}`);
      })
      .on('error', error => console.error(`Watcher hatası: ${error}`));
  }

  dev() {
    const port = process.env.PORT || 3000;
    
    this.setupWatcher();
    
    this.app.listen(port, () => {
      console.log(`🚀 Geliştirme sunucusu http://localhost:${port} adresinde çalışıyor`);
    });
  }

  start() {
    const port = process.env.PORT || 3000;
    
    this.app.listen(port, () => {
      console.log(`✨ Prodüksiyon sunucusu port ${port} üzerinde çalışıyor`);
    });
  }
}

module.exports = new AniMaxServer(); 