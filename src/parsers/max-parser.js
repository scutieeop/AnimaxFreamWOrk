const fs = require('fs-extra');
const vm = require('vm');

class MaxParser {
  constructor() {
    this.cache = new Map();
  }

  async parseFile(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    return this.parse(content);
  }

  parse(content) {
    const sections = this.extractSections(content);
    const pageConfig = this.parsePageConfig(sections.page);
    const backendCode = this.parseBackendCode(sections.backend);
    const template = this.parseTemplate(sections.template);

    return {
      pageConfig,
      backendCode,
      template
    };
  }

  extractSections(content) {
    const sections = {
      page: '',
      backend: '',
      template: ''
    };

    // @page bölümünü çıkar
    const pageMatch = content.match(/@page\s*{([^}]*)}/);
    if (pageMatch) {
      sections.page = pageMatch[1];
    }

    // @backend bölümünü çıkar
    const backendMatch = content.match(/@backend\s*{([^}]*)}/);
    if (backendMatch) {
      sections.backend = backendMatch[1];
    }

    // <template> bölümünü çıkar
    const templateMatch = content.match(/<template>([\s\S]*)<\/template>/);
    if (templateMatch) {
      sections.template = templateMatch[1];
    }

    return sections;
  }

  parseBackendTags(content) {
    const tags = {
      db: [],
      api: [],
      socket: [],
      auth: []
    };

    // Her bir backend etiketini bul ve işle
    Object.keys(tags).forEach(tag => {
      const regex = new RegExp(`@${tag}\\s*{([^}]*)}`, 'g');
      let match;
      while ((match = regex.exec(content)) !== null) {
        tags[tag].push(match[1].trim());
      }
    });

    // Tüm etiketleri birleştir
    return Object.entries(tags)
      .filter(([_, code]) => code.length > 0)
      .map(([tag, code]) => {
        return `// @${tag}\n${code.join('\n')}`;
      })
      .join('\n\n');
  }

  parsePageConfig(configStr) {
    if (!configStr) return {};
    
    try {
      const config = {};
      configStr.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) {
          config[key] = value.replace(/['"]/g, '');
        }
      });
      return config;
    } catch (error) {
      console.error('Page config parsing error:', error);
      return {};
    }
  }

  parseBackendCode(code) {
    if (!code) return '';
    
    try {
      // Backend kodunu olduğu gibi döndür
      return code.trim();
    } catch (error) {
      console.error('Backend kod parse hatası:', error);
      return '';
    }
  }

  parseTemplate(template) {
    if (!template) return '';

    // Özel etiketleri işle
    template = this.processCustomTags(template);

    // Dinamik içerikleri işle
    return template.replace(/{([^}]+)}/g, (match, expr) => {
      try {
        return `\${${expr.trim()}}`;
      } catch (error) {
        console.error('Template parsing error:', error);
        return match;
      }
    });
  }

  processCustomTags(template) {
    // Layout etiketleri
    template = template.replace(/@container/g, 'class="container"');
    template = template.replace(/@flex/g, 'class="flex"');
    template = template.replace(/@grid/g, 'class="grid"');
    template = template.replace(/@center/g, 'class="center"');

    // Bileşen etiketleri
    template = template.replace(/@title/g, 'class="title"');
    template = template.replace(/@text/g, 'class="text"');
    template = template.replace(/@button/g, 'class="button"');
    template = template.replace(/@input/g, 'class="input"');
    template = template.replace(/@card/g, 'class="card"');

    return template;
  }

  // Backend API'leri
  createDatabaseAPI() {
    return {
      collection: (name) => ({
        find: async () => [],
        findOne: async (id) => ({}),
        insert: async (data) => data,
        update: async (id, data) => data,
        delete: async (id) => true
      })
    };
  }

  createAPIClient() {
    return {
      get: async (url) => fetch(url),
      post: async (url, data) => fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
      }),
      put: async (url, data) => fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data)
      }),
      delete: async (url) => fetch(url, {
        method: 'DELETE'
      })
    };
  }

  createSocketAPI() {
    return {
      on: (event, callback) => {},
      emit: (event, data) => {},
      broadcast: {
        emit: (event, data) => {}
      }
    };
  }

  createAuthAPI() {
    return {
      user: {
        isAuthenticated: false,
        id: null,
        roles: []
      },
      login: async (credentials) => {},
      logout: async () => {},
      register: async (userData) => {}
    };
  }

  async render(filePath, data = {}) {
    try {
      console.log('Dosya okunuyor:', filePath);
      const parsed = await this.parseFile(filePath);
      console.log('Parse edilmiş veri:', parsed);
      
      // Backend kodunu çalıştır ve sonucu al
      let backendData = {};
      if (parsed.backendCode) {
        try {
          // Backend kodunu modifiye et - değişkenleri doğrudan döndür
          const wrappedCode = `
            (function() {
              const exports = {};
              ${parsed.backendCode}
              return {
                message,
                ...exports
              };
            })()
          `;

          console.log('Çalıştırılacak kod:', wrappedCode);

          // Backend kodunu çalıştır
          const context = {
            require,
            console,
            process,
            // Backend API'lerini ekle
            db: this.createDatabaseAPI(),
            api: this.createAPIClient(),
            socket: this.createSocketAPI(),
            auth: this.createAuthAPI()
          };

          const script = new vm.Script(wrappedCode);
          const vmContext = vm.createContext(context);
          backendData = script.runInContext(vmContext);
          
          console.log('Backend verisi:', backendData);
        } catch (error) {
          console.error('Backend kodu çalıştırma hatası:', error);
          console.error('Hata detayı:', error.stack);
        }
      }
      
      // Template'i işle
      const processedTemplate = this.processCustomTags(parsed.template);
      console.log('İşlenmiş template:', processedTemplate);
      
      // Template'i HTML'e dönüştür
      const fn = new Function('data', `
        with(data) {
          try {
            return \`${processedTemplate}\`;
          } catch (error) {
            console.error('Template render hatası:', error);
            return 'Render hatası: ' + error.message;
          }
        }
      `);
      
      // Backend verilerini ve dışarıdan gelen verileri birleştir
      const mergedData = { ...backendData, ...data };
      console.log('Birleştirilmiş veriler:', mergedData);
      
      const result = fn(mergedData);
      console.log('Render sonucu:', result);
      return result;
    } catch (error) {
      console.error('Render hatası:', error);
      throw error;
    }
  }
}

module.exports = new MaxParser(); 