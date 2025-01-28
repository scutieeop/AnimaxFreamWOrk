const fs = require('fs-extra');
const { hazirTasarimlar, animasyonlar, temalar } = require('./maxt-tasarim');

class MaxtParser {
  constructor() {
    this.cache = new Map();
    this.styleRules = new Map();
    this.themes = new Map();
    this.animations = new Map();
    this.loadPresets();
  }

  loadPresets() {
    // Hazır tasarımları yükle
    Object.entries(hazirTasarimlar).forEach(([category, items]) => {
      Object.entries(items).forEach(([name, styles]) => {
        this.styleRules.set(`@${category}-${name}`, styles);
      });
    });

    // Hazır animasyonları yükle
    Object.entries(animasyonlar).forEach(([name, animation]) => {
      this.animations.set(name, animation);
    });

    // Hazır temaları yükle
    Object.entries(temalar).forEach(([name, theme]) => {
      this.themes.set(name, theme);
    });
  }

  async parseFile(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    return this.parse(content);
  }

  parse(content) {
    // Tüm bölümleri çıkar
    const styleRules = this.extractStyleRules(content);
    const componentRules = this.extractComponentRules(content);
    const themeRules = this.extractThemeRules(content);
    const animationRules = this.extractAnimationRules(content);

    // Her bölümü işle
    const styles = this.processRules('style', styleRules);
    const components = this.processRules('component', componentRules);
    const themes = this.processThemes(themeRules);
    const animations = this.processAnimations(animationRules);

    return {
      styles,
      components,
      themes,
      animations
    };
  }

  extractStyleRules(content) {
    return this.extractRulesByType(content, 'style');
  }

  extractComponentRules(content) {
    return this.extractRulesByType(content, 'component');
  }

  extractThemeRules(content) {
    return this.extractRulesByType(content, 'theme');
  }

  extractAnimationRules(content) {
    const rules = [];
    const regex = /@animations\s*{([^}]*)}/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      const animationContent = match[1];
      const animationRules = this.parseAnimationBlock(animationContent);
      rules.push(...animationRules);
    }

    return rules;
  }

  extractRulesByType(content, type) {
    const rules = [];
    const regex = new RegExp(`@${type}\\s+([^\\s{]+)\\s*{([^}]*)}`, 'g');
    let match;

    while ((match = regex.exec(content)) !== null) {
      rules.push({
        name: match[1],
        content: match[2]
      });
    }

    return rules;
  }

  parseAnimationBlock(content) {
    const animations = [];
    const regex = /([^:{]+):\s*{([^}]*)}/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
      animations.push({
        name: match[1].trim(),
        content: match[2]
      });
    }

    return animations;
  }

  processRules(type, rules) {
    const processed = {};

    rules.forEach(rule => {
      const properties = this.parseProperties(rule.content);
      
      if (type === 'style') {
        processed[rule.name] = this.convertStyleToCSS(properties);
      } else if (type === 'component') {
        processed[rule.name] = this.convertComponentToCSS(properties);
      }
    });

    return processed;
  }

  processThemes(rules) {
    const themes = {};

    rules.forEach(rule => {
      const properties = this.parseProperties(rule.content);
      themes[rule.name] = this.convertThemeToCSS(properties);
    });

    return themes;
  }

  processAnimations(rules) {
    const animations = {};

    rules.forEach(rule => {
      const properties = this.parseProperties(rule.content);
      animations[rule.name] = this.convertAnimationToCSS(rule.name, properties);
    });

    return animations;
  }

  parseProperties(content) {
    const properties = {};
    const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
    
    let currentContext = properties;
    let contextStack = [properties];

    lines.forEach(line => {
      if (line.endsWith('{')) {
        const blockName = line.slice(0, -1).trim();
        currentContext[blockName] = {};
        currentContext = currentContext[blockName];
        contextStack.push(currentContext);
      } else if (line === '}') {
        contextStack.pop();
        currentContext = contextStack[contextStack.length - 1];
      } else {
        const [key, value] = line.split(':').map(s => s.trim());
        if (key && value) {
          currentContext[key] = value.replace(/;$/, '');
        }
      }
    });

    return properties;
  }

  convertStyleToCSS(properties) {
    let css = '';

    // Hazır tasarım kontrolü
    if (properties.preset) {
      const preset = this.styleRules.get(properties.preset);
      if (preset) {
        Object.assign(properties, preset);
      }
    }

    const processObject = (obj, selector = '') => {
      for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
          if (key === 'responsive') {
            this.processResponsive(value, selector, css);
          } else {
            processObject(value, `${selector}${key}`);
          }
        } else {
          const cssProperty = this.convertPropertyToCSS(key, value);
          if (cssProperty) {
            if (!css.includes(selector)) {
              css += `${selector ? selector + ' ' : ''}{\\n`;
            }
            css += `  ${cssProperty}\\n`;
          }
        }
      }
      if (css.endsWith('\\n')) {
        css += '}\\n';
      }
    };

    processObject(properties);
    return css;
  }

  processResponsive(responsive, selector, css) {
    const breakpoints = {
      mobile: '(max-width: 768px)',
      tablet: '(min-width: 769px) and (max-width: 1024px)',
      desktop: '(min-width: 1025px)'
    };

    Object.entries(responsive).forEach(([device, styles]) => {
      css += `@media ${breakpoints[device]} {\\n`;
      css += `  ${selector} {\\n`;
      Object.entries(styles).forEach(([prop, value]) => {
        css += `    ${this.convertPropertyToCSS(prop, value)}\\n`;
      });
      css += '  }\\n';
      css += '}\\n';
    });
  }

  convertComponentToCSS(properties) {
    let css = '';

    // Base styles
    if (properties.base) {
      css += this.convertStyleToCSS({ '': properties.base });
    }

    // States
    if (properties.states) {
      for (const [state, styles] of Object.entries(properties.states)) {
        css += this.convertStyleToCSS({ [`&:${state}`]: styles });
      }
    }

    return css;
  }

  convertThemeToCSS(theme) {
    let css = ':root {\\n';

    if (theme.colors) {
      Object.entries(theme.colors).forEach(([name, value]) => {
        css += `  --color-${name}: ${value};\\n`;
      });
    }

    if (theme.shadows) {
      Object.entries(theme.shadows).forEach(([name, value]) => {
        css += `  --shadow-${name}: ${value};\\n`;
      });
    }

    css += '}\\n';
    return css;
  }

  convertAnimationToCSS(name, properties) {
    let css = `@keyframes ${name} {\\n`;

    if (properties.from) {
      css += '  from {\\n';
      Object.entries(properties.from).forEach(([prop, value]) => {
        css += `    ${prop}: ${value};\\n`;
      });
      css += '  }\\n';
    }

    if (properties.to) {
      css += '  to {\\n';
      Object.entries(properties.to).forEach(([prop, value]) => {
        css += `    ${prop}: ${value};\\n`;
      });
      css += '  }\\n';
    }

    css += '}\\n';
    return css;
  }

  convertPropertyToCSS(key, value) {
    const conversions = {
      layout: (value) => {
        const [type, direction] = value.split(' ');
        if (type === 'flex') {
          return `
            display: flex;
            flex-direction: ${direction || 'row'};
          `;
        } else if (type === 'grid') {
          return `
            display: grid;
            grid-template-columns: ${direction || 'repeat(auto-fit, minmax(250px, 1fr))'};
          `;
        }
        return '';
      },
      spacing: (value) => `gap: ${value};`,
      align: (value) => {
        if (value === 'center') {
          return `
            display: flex;
            justify-content: center;
            align-items: center;
          `;
        }
        return `text-align: ${value};`;
      },
      shadow: (value) => {
        const shadows = {
          small: '0 2px 4px rgba(0,0,0,0.1)',
          medium: '0 4px 8px rgba(0,0,0,0.1)',
          large: '0 8px 16px rgba(0,0,0,0.1)'
        };
        return `box-shadow: ${shadows[value] || value};`;
      },
      animation: (value) => {
        if (typeof value === 'object') {
          return `
            animation-name: ${value.type};
            animation-duration: ${value.duration || '0.3s'};
            animation-timing-function: ${value.timing || 'ease'};
          `;
        }
        return `animation: ${value};`;
      },
      colors: (value) => {
        if (typeof value === 'object') {
          return Object.entries(value)
            .map(([colorKey, colorValue]) => {
              if (colorKey === 'background') return `background-color: ${colorValue};`;
              if (colorKey === 'text') return `color: ${colorValue};`;
              return '';
            })
            .join('\\n');
        }
        return '';
      },
      radius: (value) => `border-radius: ${value};`,
      scale: (value) => `transform: scale(${value});`,
      brightness: (value) => `filter: brightness(${value});`
    };

    if (conversions[key]) {
      return conversions[key](value);
    }

    // Standart CSS property
    return `${key}: ${value};`;
  }

  processCustomTags(template) {
    // Hazır tasarımları işle
    Object.entries(hazirTasarimlar).forEach(([category, items]) => {
      Object.keys(items).forEach(name => {
        const tag = `@${category}-${name}`;
        template = template.replace(new RegExp(tag, 'g'), `class="${category}-${name}"`);
      });
    });

    return template;
  }
}

module.exports = new MaxtParser(); 