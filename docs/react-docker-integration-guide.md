# React Frontend + Docker Integration - Full Stack Deployment Rehberi

> **Bu rehber, QR Street projesine React frontend ekleme ve tam Docker orchestration kurulumu sürecini kapsar. React + Tailwind CSS ile modern frontend geliştirme ve production-ready Docker deployment yapılandırmasını öğreneceksiniz.**

## 📋 İçindekiler
1. [React Frontend Kurulumu](#react-frontend-kurulumu)
2. [Tailwind CSS Entegrasyonu](#tailwind-css-entegrasyonu)
3. [ContentCarousel Component Geliştirme](#contentcarousel-component-geliştirme)
4. [Docker Multi-Container Setup](#docker-multi-container-setup)
5. [NGINX Configuration](#nginx-configuration)
6. [Docker Compose Orchestration](#docker-compose-orchestration)
7. [Production Deployment Strategy](#production-deployment-strategy)
8. [Troubleshooting ve Debug](#troubleshooting-ve-debug)

---

## 1. React Frontend Kurulumu

### 🚀 Proje Yapısı Planlaması

Monorepo yapısında React frontend ekleme:
```
qr-street-project/
├── backend/     (Spring Boot - mevcut)
├── frontend/    (React - yeni eklenecek)
├── docs/
└── README.md
```

### Create-React-App ile Frontend Oluşturma

#### Kurulum Komutları:
```bash
# Ana proje dizininde
cd qr-street-project

# Create-React-App ile React projesi oluşturma
npx create-react-app frontend
cd frontend
```

#### Alternatif: Vite ile Modern Setup
```bash
# Daha hızlı build için Vite kullanımı
npm create vite@latest frontend -- --template react
cd frontend
npm install
```

### 🎯 Create-React-App vs Vite Karşılaştırması

| Özellik | Create-React-App | Vite |
|---------|------------------|------|
| **Build Hızı** | Yavaş | Çok Hızlı |
| **Dev Server** | Webpack | ES Modules |
| **Config** | Hidden | Açık |
| **Bundle Size** | Büyük | Küçük |
| **Stability** | Çok Stabil | Stabil |

**Proje için Create-React-App tercih edildi:** Stability ve kolay configuration.

---

## 2. Tailwind CSS Entegrasyonu

### 📦 Tailwind CSS Kurulumu

#### Dependency Installation:
```bash
# Stable Tailwind version kurulumu
npm install -D tailwindcss@3.4.16 postcss autoprefixer

# Configuration dosyaları oluşturma
npx tailwindcss init -p
```

#### Common Issues ve Çözümleri:

##### Issue 1: NPX Command Not Found
```bash
# Hata: 'npx' is not recognized
# Çözüm: Node.js güncellemesi gerekiyor
node --version  # 16+ olmalı
```

##### Issue 2: PostCSS Config Module Error
```bash
# Hata: module is not defined in ES module scope
# Çözüm: .cjs uzantısı kullanma
postcss.config.js → postcss.config.cjs
```

### ⚙️ Configuration Dosyaları

#### tailwind.config.js:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

#### postcss.config.js:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 🎨 CSS Setup

#### src/index.css güncelleme:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Tailwind Test Component:
```jsx
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          QR Street - React Test
        </h1>
        <p className="text-gray-600 mb-4">
          Tailwind CSS çalışıyor! 🎉
        </p>
        <button className="bg-blue-500 hover:bg-purple-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          Test Button ✨
        </button>
      </div>
    </div>
  );
}
```

---

## 3. ContentCarousel Component Geliştirme

### 📁 Component Yapısı

#### Klasör Organizasyonu:
```
src/
├── components/
│   └── ContentCarousel.jsx
├── App.js
├── App.css
└── index.css
```

### 🎭 ContentCarousel Component Implementation

#### Tam Component Kodu:
```jsx
import { useState, useEffect } from 'react';

const ContentCarousel = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomContent = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/content/random');
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      const data = await response.json();
      setContent(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white text-xl animate-spin">🎭</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchRandomContent}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full text-center transform hover:-translate-y-2 transition-all duration-300">
        <img 
          src={content?.imageUrl} 
          alt={content?.title}
          className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-blue-500 hover:scale-110 hover:rotate-3 transition-all duration-500 cursor-pointer shadow-lg"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-300">
          {content?.title}
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {content?.description}
        </p>
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm inline-block hover:scale-105 transition-transform cursor-pointer shadow-md">
          QR Street Project
        </div>
      </div>
    </div>
  );
};

export default ContentCarousel;
```

### 🎯 Component Features

#### State Management:
- **content**: Rick & Morty karakter verisi
- **loading**: API request durumu
- **error**: Hata yönetimi

#### API Integration:
```javascript
const response = await fetch('/api/content/random');
```
- **Relative URL**: NGINX proxy üzerinden backend'e yönlendirme
- **Error Handling**: Network ve API hatalarını yakalama
- **Loading States**: Kullanıcı deneyimi için loading gösterimi

#### Responsive Design:
```css
/* Mobile-first yaklaşım */
max-w-md w-full          /* Maksimum genişlik */
p-5                      /* Responsive padding */
hover:-translate-y-2     /* Hover animations */
transition-all duration-300  /* Smooth transitions */
```

---

## 4. Docker Multi-Container Setup

### 🐳 Docker Architecture Overview

#### Container Yapısı:
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    MongoDB     │
│   (React+NGINX) │    │  (Spring Boot)  │    │   (Database)   │
│   Port: 3000    │    │   Port: 8080    │    │  Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                        Docker Network
                         qr-network
```

### 📄 Frontend Dockerfile

#### Multi-Stage Build Strategy:
```dockerfile
# Build stage - Node.js ile React build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage - NGINX ile serve
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Multi-Stage Build Avantajları:
1. **Küçük Final Image**: Production'da Node.js gerekmez
2. **Security**: Sadece gerekli dosyalar final image'da
3. **Performance**: NGINX static file serving optimized
4. **Caching**: Build layer'ları cache edilir

### 📄 Backend Dockerfile

```dockerfile
# Build stage
FROM maven:3.9.6-openjdk-17 AS builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

# Runtime stage  
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

## 5. NGINX Configuration

### 🌐 NGINX Routing Strategy

#### nginx.conf Configuration:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # React SPA Routing Support
        location / {
            try_files $uri $uri/ /index.html;
        }

        # API Proxy to Backend
        location /api/ {
            proxy_pass http://backend:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Thymeleaf Web Pages to Backend
        location /content/ {
            proxy_pass http://backend:8080;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### 🎯 Routing Rules Explanation

#### Frontend Routes (React):
```
http://localhost:3000/           → React App (SPA)
http://localhost:3000/dashboard  → React Router
http://localhost:3000/profile    → React Router
```

#### API Routes (Spring Boot):
```
http://localhost:3000/api/content/random → backend:8080/api/content/random
http://localhost:3000/api/content/123    → backend:8080/api/content/123
```

#### Web Routes (Thymeleaf):
```
http://localhost:3000/content/random → backend:8080/content/random (Thymeleaf)
http://localhost:3000/content/123    → backend:8080/content/123 (Thymeleaf)
```

### ⚙️ NGINX Proxy Headers

#### Security ve Functionality Headers:
```nginx
proxy_set_header Host $host;                    # Original host preserve
proxy_set_header X-Real-IP $remote_addr;        # Client IP forwarding  
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  # Proxy chain
proxy_set_header X-Forwarded-Proto $scheme;     # HTTP/HTTPS scheme
```

---

## 6. Docker Compose Orchestration

### 🎼 docker-compose.yml Configuration

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7.0
    container_name: qr-mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    networks:
      - qr-network

  backend:
    build: ./backend
    container_name: qr-backend
    ports:
      - "8080:8080"
    depends_on:
      - mongodb
    environment:
      - SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/qrproject
    networks:
      - qr-network

  frontend:
    build: ./frontend
    container_name: qr-frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    networks:
      - qr-network

volumes:
  mongodb_data:

networks:
  qr-network:
    driver: bridge
```

### 🎯 Service Dependencies

#### Startup Order:
```
1. MongoDB başlatılır
2. Backend, MongoDB'yi bekler
3. Frontend, Backend'i bekler
4. Tüm servisler hazır!
```

#### Environment Variables:
```yaml
environment:
  - SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/qrproject
```
- **mongodb://mongodb**: Docker network'te service adı
- **27017**: MongoDB default port
- **qrproject**: Database adı

### 🚀 Docker Commands

#### Development Commands:
```bash
# Tüm servisleri build et ve başlat
docker-compose up --build

# Background'da çalıştır
docker-compose up -d

# Sadece rebuild (cache'den)
docker-compose up -d

# Belirli service'i rebuild et
docker-compose build frontend
docker-compose up -d frontend

# Container'ları durdur
docker-compose down

# Volumes ile birlikte temizle
docker-compose down -v
```

#### Monitoring Commands:
```bash
# Çalışan container'ları listele
docker-compose ps

# Service loglarını görüntüle
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongodb

# Realtime log takibi
docker-compose logs -f frontend

# Container'a shell erişimi
docker-compose exec frontend sh
docker-compose exec backend bash
```

---

## 7. Production Deployment Strategy

### 🌐 Production Environment Setup

#### Environment-Specific Configurations:

##### Development (docker-compose.yml):
```yaml
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    volumes:
      - ./frontend/src:/app/src  # Hot reload
```

##### Production (docker-compose.prod.yml):
```yaml
services:
  frontend:
    build: 
      context: ./frontend
      dockerfile: Dockerfile.prod
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.frontend.rule=Host(`qrstreet.com`)"
```

### 🔒 Security Considerations

#### Production NGINX Config:
```nginx
server {
    listen 80;
    server_name qrstreet.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # SSL redirect
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name qrstreet.com;
    
    ssl_certificate /etc/ssl/certs/qrstreet.crt;
    ssl_certificate_key /etc/ssl/private/qrstreet.key;
    
    # ... rest of config
}
```

### 📊 Performance Optimizations

#### NGINX Caching:
```nginx
# Static asset caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# API caching (selective)
location /api/content/ {
    proxy_pass http://backend:8080;
    proxy_cache api_cache;
    proxy_cache_valid 200 5m;
}
```

#### Docker Image Optimization:
```dockerfile
# Use specific tags instead of latest
FROM node:18.19.0-alpine AS builder

# Multi-stage with minimal final image
FROM nginx:1.25.3-alpine

# Remove unnecessary packages
RUN apk del --no-cache curl wget
```

---

## 8. Troubleshooting ve Debug

### 🐛 Common Issues ve Solutions

#### Issue 1: Container Name Conflicts
```bash
# Hata: Container name already in use
Error: Conflict. The container name "/qr-mongodb" is already in use

# Çözüm: Eski container'ları temizle
docker-compose down
docker container prune -f
docker-compose up -d
```

#### Issue 2: NGINX Routing Problems
```bash
# Problem: /content/random React'e gidiyor, backend'e gitmiyor
# Çözüm: nginx.conf'a backend proxy ekleme

location /content/ {
    proxy_pass http://backend:8080;
}
```

#### Issue 3: API CORS Errors
```bash
# Hata: CORS policy blocks request
# Çözüm: Spring Boot CORS configuration

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ContentController {
    // ...
}
```

#### Issue 4: Docker Build Failures
```bash
# Hata: Maven image not found
failed to solve: maven:3.9-openjdk-17: not found

# Çözüm: Doğru image tag kullanma
FROM maven:3.9.6-openjdk-17 AS builder
```

### 🔍 Debug Techniques

#### Container Health Checks:
```bash
# Container status kontrolü
docker-compose ps

# Healthy/unhealthy container'ları görme
docker inspect qr-frontend --format='{{.State.Health.Status}}'

# Network connectivity test
docker-compose exec frontend ping backend
docker-compose exec backend ping mongodb
```

#### Log Analysis:
```bash
# Error log filtering
docker-compose logs frontend 2>&1 | grep -i error

# Real-time log monitoring
docker-compose logs -f --tail=50 backend

# Specific time range logs
docker-compose logs --since="2024-01-01T00:00:00" frontend
```

#### Performance Monitoring:
```bash
# Container resource usage
docker stats qr-frontend qr-backend qr-mongodb

# Memory ve CPU monitoring
docker-compose exec frontend top
docker-compose exec backend ps aux
```

---

## 📊 Proje Durumu - Complete Full Stack

### ✅ Tamamlanan Özellikler:

#### Frontend (React):
- [x] Create-React-App setup ve Tailwind CSS entegrasyonu
- [x] ContentCarousel component ile Rick & Morty API integration
- [x] Responsive design ve interactive animations
- [x] Loading states ve error handling
- [x] Production-ready React build

#### Backend (Spring Boot):
- [x] REST API endpoints (/api/content/*)
- [x] Thymeleaf web interface (/content/*)
- [x] MongoDB integration ve data persistence
- [x] External API integration (Rick & Morty)
- [x] Duplicate prevention ve smart caching

#### DevOps (Docker):
- [x] Multi-stage Dockerfile'lar (Frontend + Backend)
- [x] NGINX reverse proxy configuration
- [x] Docker Compose orchestration
- [x] Container networking ve volume management
- [x] Production-ready deployment strategy

### 🔄 Sonraki Geliştirmeler:
- [ ] SSL/TLS certificate integration
- [ ] CI/CD pipeline setup (GitHub Actions)
- [ ] Kubernetes deployment manifests
- [ ] Monitoring ve logging (Prometheus, Grafana)
- [ ] Advanced caching strategies (Redis)
- [ ] API rate limiting ve security headers

---

## 🎯 Deployment Workflow

### Complete Deployment Process:

#### 1. Development:
```bash
# Local development
cd qr-street-project
docker-compose up --build

# Test endpoints
curl http://localhost:3000                    # React Frontend
curl http://localhost:8080/api/content/random # Spring Boot API
curl http://localhost:3000/content/random     # Thymeleaf via NGINX
```

#### 2. Production Deployment:
```bash
# Production build
docker-compose -f docker-compose.prod.yml up -d --build

# Health check
curl -f http://qrstreet.com/health || exit 1

# Monitor
docker-compose logs -f
```

#### 3. QR Street Workflow:
```
1. 📱 User scans QR sticker: https://qrstreet.com/content/random
2. 🌐 NGINX routes to Spring Boot Thymeleaf
3. 🎭 Beautiful carousel page with Rick & Morty character
4. 🔄 Each QR scan shows same character (perfect for stickers!)

Alternative React flow:
1. 📱 User goes to: https://qrstreet.com/
2. ⚛️ React SPA loads
3. 🎭 ContentCarousel fetches random character via API
4. 🎲 Interactive experience with beautiful animations
```

---

**🎉 Tebrikler! Full-stack React + Spring Boot + Docker deployment başarıyla tamamlandı!**

> **Bu proje artık production-ready durumda!** Domain satın alıp deploy ederek gerçek QR sticker testlerine başlayabilir, sokak sanatı projesi olarak kullanabilirsiniz. React frontend modern bir kullanıcı deneyimi sunarken, Docker orchestration ölçeklenebilir ve güvenilir bir deployment sağlar.