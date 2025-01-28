# 🚀 AniMax Framework

Modern ve özgün web geliştirme deneyimi sunan yeni nesil bir framework.

## ✨ Özellikler

- 🎨 Özel tasarım dili (`.maxt`)
- 🔄 Backend-Frontend entegrasyonu (`.max`)
- 📦 Hazır tasarım bileşenleri
- 🛠️ Kolay geliştirme deneyimi
- 🚀 Hızlı derleme ve yayınlama
- 🔥 Sıcak yeniden yükleme

## 🎯 Hızlı Başlangıç

```bash
# Projeyi klonlayın
git clone https://github.com/kullanici/animax-framework.git

# Bağımlılıkları yükleyin
npm install

# Framework'ü global olarak bağlayın
npm link

# Yeni bir proje oluşturun
animax create my-app

# Projeye gidin
cd my-app

# Geliştirme sunucusunu başlatın
npm run dev
```

## 📚 Dosya Yapısı

```
my-app/
  ├── src/
  │   ├── pages/          # .max sayfaları
  │   │   └── index.max
  │   ├── styles/         # .maxt stil dosyaları
  │   │   └── main.maxt
  │   └── components/     # Yeniden kullanılabilir bileşenler
  ├── public/            # Statik dosyalar
  └── animax.config.js   # Yapılandırma dosyası
```

## 💫 .max Dosya Örneği

```max
@page {
  title: "Ana Sayfa"
  description: "Hoş geldiniz sayfası"
}

@backend {
  // Backend kodları etiketler içinde çalışır
  @db {
    const users = await db.collection('users').find();
  }
  
  @api {
    const weather = await fetch('https://api.weather.com');
  }
  
  @socket {
    io.on('connection', socket => {
      socket.emit('welcome');
    });
  }
}

<template>
  <div @container>
    <h1 @title>Hoş Geldiniz</h1>
    
    <div @card>
      <h2>Kullanıcılar</h2>
      @for(user in users) {
        <div @user-item>
          <img src={user.avatar} @avatar />
          <span @username>{user.name}</span>
        </div>
      }
    </div>
    
    <div @weather-widget>
      <h3>Hava Durumu</h3>
      <p>{weather.temperature}°C</p>
    </div>
  </div>
</template>
```

## 🎨 .maxt Stil Örneği

```maxt
@style container {
  layout: flex column
  spacing: 20px
  align: center
  
  colors: {
    background: #f5f5f5
    text: #333
  }
  
  responsive: {
    mobile: {
      width: 100%
      padding: 10px
    }
    tablet: {
      width: 80%
      padding: 20px
    }
    desktop: {
      width: 1200px
      padding: 40px
    }
  }
}

@component card {
  base: {
    layout: flex column
    radius: 10px
    shadow: medium
    padding: 20px
    
    animation: {
      type: fade-in
      duration: 0.3s
    }
  }
  
  states: {
    hover: {
      scale: 1.02
      shadow: large
    }
    active: {
      scale: 0.98
    }
  }
}

@theme light {
  colors: {
    primary: #007bff
    secondary: #6c757d
    success: #28a745
    danger: #dc3545
    background: #ffffff
    text: #333333
  }
  
  shadows: {
    small: 0 2px 4px rgba(0,0,0,0.1)
    medium: 0 4px 8px rgba(0,0,0,0.1)
    large: 0 8px 16px rgba(0,0,0,0.1)
  }
}

@animations {
  fade-in: {
    from: { opacity: 0 }
    to: { opacity: 1 }
  }
  
  slide-up: {
    from: { 
      transform: translateY(20px)
      opacity: 0
    }
    to: {
      transform: translateY(0)
      opacity: 1
    }
  }
}
```

## 🛠️ Özel Tasarım Kısayolları

### Layout Kısayolları
- `@container`: Duyarlı konteyner
- `@flex`: Flex konteyner
- `@grid`: Grid konteyner
- `@center`: İçeriği ortala

### Bileşen Kısayolları
- `@card`: Kart bileşeni
- `@button`: Düğme
- `@input`: Giriş alanı
- `@avatar`: Profil resmi
- `@badge`: Rozet
- `@alert`: Uyarı kutusu

### Tipografi
- `@title`: Başlık stili
- `@subtitle`: Alt başlık
- `@text`: Normal metin
- `@caption`: Açıklama metni

### Animasyonlar
- `@fade`: Solma efekti
- `@slide`: Kayma efekti
- `@bounce`: Zıplama efekti
- `@rotate`: Dönme efekti

### Duyarlı Tasarım
- `@mobile`: Mobil görünüm
- `@tablet`: Tablet görünüm
- `@desktop`: Masaüstü görünüm

## 🔧 Backend Etiketleri

### Veritabanı İşlemleri
```max
@db {
  const users = await db.users.find();
  const posts = await db.posts.where('author', user.id);
}
```

### API İstekleri
```max
@api {
  const data = await fetch('/api/data');
  const response = await axios.get('/endpoint');
}
```

### WebSocket
```max
@socket {
  io.on('message', data => {
    socket.broadcast.emit('update', data);
  });
}
```

### Güvenlik
```max
@auth {
  if (!user.isAuthenticated) {
    return redirect('/login');
  }
}
```

## 📦 Hazır Bileşenler

```max
<template>
  // Modern kart bileşeni
  <div @modern-card>
    <img @card-image src="image.jpg" />
    <div @card-content>
      <h3 @card-title>Başlık</h3>
      <p @card-text>İçerik</p>
    </div>
  </div>
  
  // Özel form bileşeni
  <form @smart-form>
    <input @form-input type="text" />
    <button @form-button>Gönder</button>
  </form>
  
  // Bildirim bileşeni
  <div @notification type="success">
    İşlem başarılı!
  </div>
</template>
```

## 🤝 Katkıda Bulunma

1. Bu depoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika özellik eklendi'`)
4. Branch'inizi push edin (`git push origin feature/amazing`)
5. Bir Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın. 