// Hazır Tasarım Bileşenleri
const hazirTasarimlar = {
  // Kartlar
  cards: {
    modern: {
      base: {
        layout: 'flex column',
        radius: '15px',
        shadow: 'medium',
        padding: '20px',
        background: '#ffffff',
        transition: 'all 0.3s ease'
      },
      states: {
        hover: {
          transform: 'translateY(-5px)',
          shadow: 'large'
        }
      }
    },
    glassmorphic: {
      base: {
        background: 'rgba(255, 255, 255, 0.1)',
        'backdrop-filter': 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        radius: '20px',
        padding: '25px',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      }
    },
    neon: {
      base: {
        background: '#1a1a1a',
        border: '2px solid #ff00ff',
        radius: '10px',
        padding: '20px',
        'box-shadow': '0 0 15px #ff00ff',
        color: '#ffffff'
      },
      states: {
        hover: {
          'box-shadow': '0 0 30px #ff00ff'
        }
      }
    }
  },

  // Düğmeler
  buttons: {
    primary: {
      base: {
        padding: '12px 24px',
        radius: '8px',
        background: 'var(--color-primary)',
        color: '#ffffff',
        border: 'none',
        transition: 'all 0.3s ease'
      },
      states: {
        hover: {
          brightness: '1.1',
          transform: 'scale(1.05)'
        }
      }
    },
    gradient: {
      base: {
        padding: '15px 30px',
        radius: '25px',
        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
        color: '#ffffff',
        border: 'none',
        transition: 'all 0.3s ease'
      },
      states: {
        hover: {
          transform: 'translateY(-2px)',
          'box-shadow': '0 5px 15px rgba(255, 107, 107, 0.4)'
        }
      }
    },
    outline: {
      base: {
        padding: '10px 20px',
        radius: '6px',
        border: '2px solid var(--color-primary)',
        color: 'var(--color-primary)',
        background: 'transparent',
        transition: 'all 0.3s ease'
      },
      states: {
        hover: {
          background: 'var(--color-primary)',
          color: '#ffffff'
        }
      }
    }
  },

  // Form Elemanları
  forms: {
    modern: {
      input: {
        base: {
          padding: '12px 16px',
          radius: '8px',
          border: '2px solid #e0e0e0',
          background: '#ffffff',
          transition: 'all 0.3s ease'
        },
        states: {
          focus: {
            border: '2px solid var(--color-primary)',
            'box-shadow': '0 0 0 4px rgba(var(--color-primary-rgb), 0.1)'
          }
        }
      },
      select: {
        base: {
          padding: '12px 16px',
          radius: '8px',
          border: '2px solid #e0e0e0',
          background: '#ffffff',
          'appearance': 'none'
        }
      }
    },
    floating: {
      group: {
        base: {
          position: 'relative',
          margin: '20px 0'
        }
      },
      label: {
        base: {
          position: 'absolute',
          left: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          transition: 'all 0.3s ease',
          color: '#666'
        },
        states: {
          focus: {
            top: '0',
            transform: 'translateY(-100%) scale(0.8)',
            color: 'var(--color-primary)'
          }
        }
      }
    }
  },

  // Navigasyon
  navigation: {
    navbar: {
      base: {
        layout: 'flex row',
        align: 'center',
        justify: 'space-between',
        padding: '1rem 2rem',
        background: '#ffffff',
        shadow: 'small'
      }
    },
    sidebar: {
      base: {
        layout: 'flex column',
        width: '250px',
        height: '100vh',
        background: '#ffffff',
        padding: '2rem',
        shadow: 'medium'
      }
    },
    tabs: {
      base: {
        layout: 'flex row',
        gap: '10px',
        padding: '10px',
        'border-bottom': '2px solid #eee'
      },
      item: {
        base: {
          padding: '10px 20px',
          radius: '8px 8px 0 0',
          color: '#666',
          transition: 'all 0.3s ease'
        },
        states: {
          active: {
            color: 'var(--color-primary)',
            'border-bottom': '2px solid var(--color-primary)'
          }
        }
      }
    }
  },

  // Bildirimler
  notifications: {
    toast: {
      base: {
        layout: 'flex row',
        align: 'center',
        padding: '16px',
        radius: '8px',
        background: '#ffffff',
        shadow: 'medium',
        animation: {
          type: 'slide-in',
          duration: '0.5s'
        }
      },
      success: {
        background: '#4caf50',
        color: '#ffffff'
      },
      error: {
        background: '#f44336',
        color: '#ffffff'
      }
    },
    alert: {
      base: {
        padding: '15px 20px',
        radius: '6px',
        margin: '10px 0'
      },
      info: {
        background: '#e3f2fd',
        color: '#1976d2',
        border: '1px solid #1976d2'
      },
      warning: {
        background: '#fff3e0',
        color: '#f57c00',
        border: '1px solid #f57c00'
      }
    }
  },

  // Medya
  media: {
    avatar: {
      base: {
        radius: '50%',
        width: '40px',
        height: '40px',
        'object-fit': 'cover'
      },
      sizes: {
        small: { width: '32px', height: '32px' },
        large: { width: '64px', height: '64px' }
      }
    },
    gallery: {
      base: {
        layout: 'grid',
        gap: '20px',
        'grid-template-columns': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      item: {
        base: {
          radius: '10px',
          overflow: 'hidden',
          transition: 'all 0.3s ease'
        },
        states: {
          hover: {
            transform: 'scale(1.05)'
          }
        }
      }
    }
  },

  // Veri Görselleştirme
  dataDisplay: {
    badge: {
      base: {
        padding: '4px 8px',
        radius: '12px',
        'font-size': '12px'
      },
      status: {
        active: { background: '#4caf50', color: '#ffffff' },
        pending: { background: '#ff9800', color: '#ffffff' },
        inactive: { background: '#f44336', color: '#ffffff' }
      }
    },
    progress: {
      base: {
        width: '100%',
        height: '8px',
        background: '#e0e0e0',
        radius: '4px',
        overflow: 'hidden'
      },
      bar: {
        base: {
          height: '100%',
          background: 'var(--color-primary)',
          transition: 'width 0.3s ease'
        }
      }
    }
  },

  // Özel Efektler
  effects: {
    glassmorphism: {
      base: {
        background: 'rgba(255, 255, 255, 0.1)',
        'backdrop-filter': 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }
    },
    neumorphism: {
      base: {
        background: '#e0e0e0',
        'box-shadow': '8px 8px 16px #bebebe, -8px -8px 16px #ffffff'
      }
    },
    gradient: {
      rainbow: {
        background: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff6b6b)',
        'background-size': '400% 400%',
        animation: 'gradient 15s ease infinite'
      },
      neon: {
        color: '#fff',
        'text-shadow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #0ff'
      }
    }
  }
};

// Animasyonlar
const animasyonlar = {
  'slide-in': {
    from: {
      transform: 'translateX(-100%)',
      opacity: '0'
    },
    to: {
      transform: 'translateX(0)',
      opacity: '1'
    }
  },
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' }
  },
  'bounce': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' }
  },
  'pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' }
  },
  'gradient': {
    '0%': { 'background-position': '0% 50%' },
    '50%': { 'background-position': '100% 50%' },
    '100%': { 'background-position': '0% 50%' }
  }
};

// Temalar
const temalar = {
  light: {
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8',
      background: '#ffffff',
      surface: '#f8f9fa',
      text: '#212529'
    }
  },
  dark: {
    colors: {
      primary: '#4dabf7',
      secondary: '#868e96',
      success: '#40c057',
      danger: '#fa5252',
      warning: '#ffd43b',
      info: '#15aabf',
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#f8f9fa'
    }
  },
  nature: {
    colors: {
      primary: '#2ecc71',
      secondary: '#95a5a6',
      accent1: '#f1c40f',
      accent2: '#e67e22',
      background: '#ecf0f1',
      text: '#2c3e50'
    }
  },
  ocean: {
    colors: {
      primary: '#3498db',
      secondary: '#2c3e50',
      accent1: '#1abc9c',
      accent2: '#16a085',
      background: '#ecf0f1',
      text: '#2c3e50'
    }
  }
};

// Ek animasyonlar
const ekAnimasyonlar = {
  'float': {
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0)' }
  },
  'shake': {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
  },
  'rotate-360': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  'pop': {
    '0%': { transform: 'scale(0)' },
    '80%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' }
  },
  'slide-up': {
    from: {
      transform: 'translateY(20px)',
      opacity: '0'
    },
    to: {
      transform: 'translateY(0)',
      opacity: '1'
    }
  },
  'slide-down': {
    from: {
      transform: 'translateY(-20px)',
      opacity: '0'
    },
    to: {
      transform: 'translateY(0)',
      opacity: '1'
    }
  },
  'slide-left': {
    from: {
      transform: 'translateX(20px)',
      opacity: '0'
    },
    to: {
      transform: 'translateX(0)',
      opacity: '1'
    }
  },
  'slide-right': {
    from: {
      transform: 'translateX(-20px)',
      opacity: '0'
    },
    to: {
      transform: 'translateX(0)',
      opacity: '1'
    }
  },
  'flip': {
    '0%': { transform: 'perspective(400px) rotateY(0)' },
    '100%': { transform: 'perspective(400px) rotateY(360deg)' }
  },
  'swing': {
    '20%': { transform: 'rotate(15deg)' },
    '40%': { transform: 'rotate(-10deg)' },
    '60%': { transform: 'rotate(5deg)' },
    '80%': { transform: 'rotate(-5deg)' },
    '100%': { transform: 'rotate(0deg)' }
  }
};

// Ek temalar
const ekTemalar = {
  sunset: {
    colors: {
      primary: '#ff7e5f',
      secondary: '#feb47b',
      accent1: '#ff5e62',
      accent2: '#ff9966',
      background: '#fff9f5',
      text: '#2c3e50'
    }
  },
  forest: {
    colors: {
      primary: '#2ecc71',
      secondary: '#27ae60',
      accent1: '#f1c40f',
      accent2: '#e67e22',
      background: '#f5f9f5',
      text: '#2c3e50'
    }
  },
  midnight: {
    colors: {
      primary: '#2c3e50',
      secondary: '#34495e',
      accent1: '#3498db',
      accent2: '#2980b9',
      background: '#1a1a1a',
      text: '#ecf0f1'
    }
  },
  candy: {
    colors: {
      primary: '#ff69b4',
      secondary: '#ff1493',
      accent1: '#ff69b4',
      accent2: '#da70d6',
      background: '#fff0f5',
      text: '#4a4a4a'
    }
  },
  cyber: {
    colors: {
      primary: '#00ff00',
      secondary: '#00ffff',
      accent1: '#ff00ff',
      accent2: '#ffff00',
      background: '#000000',
      text: '#ffffff'
    }
  },
  pastel: {
    colors: {
      primary: '#ffb3ba',
      secondary: '#baffc9',
      accent1: '#bae1ff',
      accent2: '#ffffba',
      background: '#ffffff',
      text: '#4a4a4a'
    }
  },
  autumn: {
    colors: {
      primary: '#d35400',
      secondary: '#e67e22',
      accent1: '#f39c12',
      accent2: '#f1c40f',
      background: '#fdf6e3',
      text: '#2c3e50'
    }
  },
  winter: {
    colors: {
      primary: '#3498db',
      secondary: '#2980b9',
      accent1: '#95a5a6',
      accent2: '#bdc3c7',
      background: '#ecf0f1',
      text: '#2c3e50'
    }
  }
};

// Mevcut hazirTasarimlar nesnesini güncelle
Object.assign(hazirTasarimlar, ekTasarimlar);

// Mevcut nesneleri güncelle
Object.assign(animasyonlar, ekAnimasyonlar);
Object.assign(temalar, ekTemalar);

module.exports = {
  hazirTasarimlar,
  animasyonlar,
  temalar
}; 