# 🚀 AniMax Framework

<div align="center">
  <img src="https://cdn.discordapp.com/attachments/1330903506038558891/1333867698026840134/animaxreverse.png?ex=679a7499&is=67992319&hm=b8eba9d70a3a82aadfd2a1e4294c1556a83f911a13ad94985cdc4017b53192b8&" alt="AniMax Framework" style="border-radius: 10px; margin: 20px 0;">

  <p align="center">
    <strong>Modern ve özgün web uygulama geliştirme çerçevesi</strong>
  </p>

  <p align="center">
    <a href="#özellikler">Özellikler</a> •
    <a href="#hızlı-başlangıç">Hızlı Başlangıç</a> •
    <a href="#tasarım-örnekleri">Tasarım Örnekleri</a> •
    <a href="#dokümantasyon">Dokümantasyon</a>
  </p>
</div>

## ✨ Özellikler

- 🎨 **Max Dosyaları** - HTML benzeri syntax ile kolay sayfa oluşturma
- 🎯 **Maxt Tasarım** - CSS'e alternatif modern stil tanımlama dili
- ⚡ **Hızlı Geliştirme** - Sıcak yeniden yükleme ve otomatik derleme
- 🔥 **Backend Entegrasyonu** - Sayfa içinde doğrudan backend kodu yazabilme
- 📦 **Hazır Bileşenler** - Kullanıma hazır modern UI bileşenleri
- 🛡️ **Güvenlik** - Yerleşik güvenlik özellikleri ve CSP desteği

## 🎨 Tasarım Örnekleri

### Modern Kartlar

```max
<template>
  <div class="grid">
    {cards.map(card => `
      <div class="card hover:scale">
        <img src={card.image} class="card-image" />
        <h3 class="card-title">{card.title}</h3>
        <p class="card-text">{card.description}</p>
        <button class="button gradient">{card.action}</button>
      </div>
    `)}
  </div>
</template>
```

```maxt
@style card {
  layout: flex column;
  spacing: 16px;
  padding: 24px;
  radius: 16px;
  shadow: 0 4px 16px -4px rgba(0,0,0,0.1);
  background: white;
  
  transition: {
    property: transform, shadow;
    duration: 0.3s;
    easing: ease;
  }
  
  hover: {
    transform: translateY(-4px);
    shadow: 0 12px 24px -8px rgba(0,0,0,0.15);
  }
  
  .card-image {
    width: 100%;
    height: 200px;
    radius: 8px;
    object-fit: cover;
  }
  
  .card-title {
    font: {
      size: 24px;
      weight: 700;
    }
    color: #1a1f36;
  }
  
  .card-text {
    font: {
      size: 16px;
      weight: 400;
    }
    color: #4b5563;
    line-height: 1.6;
  }
}
```

### Gradient Butonlar

```max
<template>
  <div class="button-group">
    <button class="button gradient primary">Kaydet</button>
    <button class="button gradient secondary">İptal</button>
    <button class="button gradient success">Onayla</button>
  </div>
</template>
```

```maxt
@style button {
  padding: 12px 24px;
  radius: 12px;
  font: {
    size: 16px;
    weight: 600;
  }
  
  transition: {
    property: all;
    duration: 0.3s;
  }
  
  &.gradient {
    &.primary {
      background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
      color: white;
      
      hover: {
        transform: translateY(-2px);
        shadow: 0 8px 16px -4px rgba(37, 99, 235, 0.3);
      }
    }
    
    &.secondary {
      background: linear-gradient(135deg, #4b5563 0%, #6b7280 100%);
      color: white;
    }
    
    &.success {
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
      color: white;
    }
  }
}
```

### Modern Form Elemanları

```max
<template>
  <form class="form">
    <div class="form-group">
      <label class="label">E-posta</label>
      <input type="email" class="input" placeholder="ornek@email.com" />
    </div>
    
    <div class="form-group">
      <label class="label">Şifre</label>
      <div class="input-group">
        <input type="password" class="input" />
        <button class="button icon">👁️</button>
      </div>
    </div>
  </form>
</template>
```

```maxt
@style form {
  layout: flex column;
  spacing: 24px;
  width: 100%;
  max-width: 400px;
  
  .form-group {
    layout: flex column;
    spacing: 8px;
  }
  
  .label {
    font: {
      size: 14px;
      weight: 500;
    }
    color: #4b5563;
  }
  
  .input {
    padding: 12px 16px;
    radius: 12px;
    border: 2px solid #e5e7eb;
    font-size: 16px;
    
    transition: {
      property: border, shadow;
      duration: 0.2s;
    }
    
    focus: {
      border-color: #3b82f6;
      shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
    }
  }
  
  .input-group {
    layout: flex row;
    spacing: 8px;
    align: center;
  }
}
```

### Animasyonlu Bileşenler

```max
<template>
  <div class="features">
    {features.map(feature => `
      <div class="feature animate-in">
        <div class="feature-icon">{feature.icon}</div>
        <h4 class="feature-title">{feature.title}</h4>
        <p class="feature-text">{feature.description}</p>
      </div>
    `)}
  </div>
</template>
```

```maxt
@style feature {
  layout: flex column;
  align: center;
  text-align: center;
  padding: 32px;
  
  animation: {
    name: slideUp;
    duration: 0.6s;
    easing: cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .feature-icon {
    font-size: 48px;
    margin-bottom: 16px;
    
    animation: {
      name: bounce;
      duration: 0.6s;
      delay: 0.3s;
    }
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

## 🚀 Hızlı Başlangıç

1. Yeni bir proje oluşturun:
```bash
npm install -g animax-framework
animax create my-app
cd my-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## 📚 Dokümantasyon

Detaylı dokümantasyon için [docs.animax.dev](https://docs.animax.dev) adresini ziyaret edin.

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/amazing`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

<div align="center">
  <sub>Built with ❤️ by the AniMax Team</sub>
</div> 
