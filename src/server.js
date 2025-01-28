const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const { parseMaxFile } = require('./parsers/max-parser');
const { parseMaxtFile } = require('./parsers/maxt-parser');

class AniMaxServer {
  constructor() {
    this.app = express();
    this.setupMiddleware();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.static('public'));
    
    // .max ve .maxt dosyalarını işle
    this.app.use(async (req, res, next) => {
      if (req.path.endsWith('.max')) {
        try {
          const filePath = path.join(process.cwd(), 'src/pages', req.path);
          const result = await parseMaxFile(filePath);
          return res.send(result);
        } catch (error) {
          return next(error);
        }
      }
      next();
    });
  }

  setupWatcher() {
    const watcher = chokidar.watch(['src/pages/**/*.max', 'src/styles/**/*.maxt'], {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });

    watcher
      .on('change', path => {
        console.log(`Dosya değişti: ${path}`);
        // Dosya değişikliklerinde gerekli işlemleri yap
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