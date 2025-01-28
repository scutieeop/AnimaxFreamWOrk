const fs = require('fs-extra');
const path = require('path');
const { parseMaxFile } = require('./parsers/max-parser');
const { parseMaxtFile } = require('./parsers/maxt-parser');

class Builder {
  constructor() {
    this.buildDir = 'dist';
    this.sourceDir = 'src';
  }

  async build() {
    console.log('🏗️  Derleme başlıyor...');
    
    try {
      // Build dizinini temizle ve oluştur
      await fs.emptyDir(this.buildDir);
      
      // Public dizinini kopyala
      if (await fs.pathExists('public')) {
        await fs.copy('public', this.buildDir);
      }
      
      // .max dosyalarını derle
      await this.buildMaxFiles();
      
      // .maxt dosyalarını derle
      await this.buildMaxtFiles();
      
      console.log('✨ Derleme başarıyla tamamlandı!');
    } catch (error) {
      console.error('❌ Derleme hatası:', error);
      process.exit(1);
    }
  }

  async buildMaxFiles() {
    const maxFiles = await this.findFiles('**/*.max');
    
    for (const file of maxFiles) {
      try {
        const parsed = await parseMaxFile(file);
        const htmlContent = this.generateHTML(parsed);
        
        const relativePath = path.relative(this.sourceDir, file);
        const outputPath = path.join(this.buildDir, relativePath.replace('.max', '.html'));
        
        await fs.ensureDir(path.dirname(outputPath));
        await fs.writeFile(outputPath, htmlContent);
        
        console.log(`📝 ${relativePath} -> ${path.relative(process.cwd(), outputPath)}`);
      } catch (error) {
        console.error(`❌ ${file} derlenirken hata oluştu:`, error);
      }
    }
  }

  async buildMaxtFiles() {
    const maxtFiles = await this.findFiles('**/*.maxt');
    let combinedCSS = '';
    
    for (const file of maxtFiles) {
      try {
        const parsed = await parseMaxtFile(file);
        combinedCSS += Object.values(parsed).join('\\n');
        
        console.log(`🎨 ${path.relative(this.sourceDir, file)} işlendi`);
      } catch (error) {
        console.error(`❌ ${file} derlenirken hata oluştu:`, error);
      }
    }
    
    if (combinedCSS) {
      const outputPath = path.join(this.buildDir, 'styles.css');
      await fs.writeFile(outputPath, combinedCSS);
      console.log(`📝 styles.css oluşturuldu`);
    }
  }

  async findFiles(pattern) {
    const files = await fs.glob(pattern, {
      cwd: this.sourceDir,
      absolute: true
    });
    return files;
  }

  generateHTML({ pageConfig, template }) {
    return `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageConfig.title || 'AniMax Uygulaması'}</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    ${template}
    <script src="/app.js"></script>
</body>
</html>`;
  }
}

module.exports = new Builder(); 