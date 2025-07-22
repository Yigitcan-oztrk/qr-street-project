# QR Street Project - Teknoloji Stack Dokümantasyonu

## Proje Özeti
Sokak sanatı ve teknoloji birleşen, QR kod aracılığıyla rastgele içerik sunan web tabanlı platform. Kullanıcılar sokağa yapıştırılan QR kodları okutarak motivasyon sözleri, karakter bilgileri ve eğlenceli içeriklere erişebilirler.

## Seçilen Teknoloji Stack

### Backend
- **Spring Boot 3.x** (Java 17+)
- **Maven** (Dependency Management)
- **MongoDB** (NoSQL Database)
- **Spring Data MongoDB** (ORM)
- **Spring Web** (REST API)
- **ZXing** (QR Code Generation)

### Frontend
- **React 18+** (JavaScript Framework)
- **Vite** (Build Tool)
- **Axios** (HTTP Client)
- **React Router** (Navigation)
- **Tailwind CSS** (Styling)

### Database
- **MongoDB 7.0**
- **MongoDB Compass** (GUI - Development)
- **MongoDB Atlas** (Cloud - Production)

### Deployment & DevOps
- **Docker** (Containerization)
- **Docker Compose** (Multi-container orchestration)
- **Nginx** (Reverse Proxy)
- **VPS** (DigitalOcean/Hetzner)

### External APIs
- **Rick & Morty API** (Character data)
- **Quotable API** (Motivational quotes)
- **Marvel API** (Superhero data)

## Teknoloji Uyumluluk Matrisi

| Teknoloji | Uyumluluk | Sebep |
|-----------|-----------|--------|
| Spring Boot + MongoDB | ✅ Mükemmel | Spring Data MongoDB native desteği |
| React + Spring Boot | ✅ Mükemmel | RESTful API üzerinden JSON iletişimi |
| Docker + Spring Boot | ✅ Mükemmel | Official Docker support |
| Docker + React | ✅ Mükemmel | Nginx ile static serve |
| MongoDB + Docker | ✅ Mükemmel | Official MongoDB Docker image |
| Maven + Docker | ✅ Mükemmel | Multi-stage build desteği |

## Sistem Mimarisi

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Web     │    │   Spring Boot   │    │   MongoDB       │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (Database)    │
│   Port: 3000    │    │   Port: 8080    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        
         │                        │                        
         ▼                        ▼                        
┌─────────────────┐    ┌─────────────────┐                 
│   Nginx         │    │   External APIs │                 
│   (Proxy)       │    │   (Rick&Morty,  │                 
│   Port: 80/443  │    │   Quotable, etc)│                 
└─────────────────┘    └─────────────────┘                 
```

## Veri Akışı

### 1. QR Code Generation Flow
```
Admin Panel → Spring Boot QR Service → ZXing Library → QR Code Image → Database
```

### 2. Content Consumption Flow
```
QR Code Scan → React Router → API Call → Spring Boot Controller → 
MongoDB Query → External API (if needed) → JSON Response → React Component
```

### 3. Caching Strategy
```
External API → Spring Boot Service → MongoDB Cache → 
Subsequent Requests → Direct MongoDB → No API Call
```

## Proje Yapısı

```
qr-street-project/
├── backend/                    # Spring Boot Application
│   ├── src/main/java/com/qrproject/
│   │   ├── QrProjectApplication.java
│   │   ├── controller/
│   │   │   ├── ContentController.java
│   │   │   └── QrCodeController.java
│   │   ├── service/
│   │   │   ├── ContentService.java
│   │   │   ├── QrCodeService.java
│   │   │   └── ExternalApiService.java
│   │   ├── repository/
│   │   │   └── ContentRepository.java
│   │   ├── model/
│   │   │   ├── Content.java
│   │   │   └── QrCode.java
│   │   └── config/
│   │       ├── WebConfig.java
│   │       └── MongoConfig.java
│   ├── src/main/resources/
│   │   ├── application.yml
│   │   └── application-prod.yml
│   ├── pom.xml
│   └── Dockerfile
├── frontend/                   # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContentCard.jsx
│   │   │   ├── QrDisplay.jsx
│   │   │   └── CategorySelector.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Content.jsx
│   │   │   └── Admin.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── hooks/
│   │   │   └── useContent.js
│   │   ├── utils/
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── Dockerfile
├── docker-compose.yml          # Development environment
├── docker-compose.prod.yml     # Production environment
├── nginx.conf                  # Nginx configuration
└── README.md
```

## API Endpoint Tasarımı

### Content Endpoints
```
GET    /api/content/{category}           # Random content by category
GET    /api/content/{category}/{id}      # Specific content
POST   /api/content                      # Create new content
PUT    /api/content/{id}                 # Update content
DELETE /api/content/{id}                 # Delete content
```

### QR Code Endpoints
```
POST   /api/qr/generate                  # Generate QR code
GET    /api/qr/{id}                      # Get QR code image
GET    /api/qr/{id}/stats                # QR code statistics
```

### Statistics Endpoints
```
GET    /api/stats/content                # Content view statistics
GET    /api/stats/qr                     # QR code scan statistics
```

## Database Schema (MongoDB)

### Content Collection
```json
{
  "_id": "ObjectId",
  "category": "rickandmorty | marvel | motivation",
  "title": "String",
  "description": "String",
  "imageUrl": "String",
  "metadata": {
    "source": "external_api | manual",
    "apiId": "String",
    "additionalData": "Object"
  },
  "createdAt": "Date",
  "updatedAt": "Date",
  "viewCount": "Number"
}
```

### QR Code Collection
```json
{
  "_id": "ObjectId",
  "qrId": "String (unique)",
  "targetUrl": "String",
  "category": "String",
  "imageData": "String (base64)",
  "scanCount": "Number",
  "createdAt": "Date",
  "isActive": "Boolean"
}
```

## Development Workflow

### 1. Local Development
```bash
# Start MongoDB
docker run -d -p 27017:27017 --name qr-mongodb mongo:7.0

# Start Backend
cd backend
mvn spring-boot:run

# Start Frontend
cd frontend
npm run dev
```

### 2. Full Stack Development
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 3. Production Deployment
```bash
# Build and deploy
docker-compose -f docker-compose.prod.yml up -d

# Monitor services
docker-compose -f docker-compose.prod.yml ps
```

## Performans Optimizasyonları

### Backend
- **Connection Pooling**: MongoDB connection pool configuration
- **Caching**: External API responses cached in MongoDB
- **Indexing**: MongoDB indexes on frequently queried fields
- **Lazy Loading**: Content metadata loaded on demand

### Frontend
- **Code Splitting**: React.lazy for route-based splitting
- **Image Optimization**: Lazy loading for content images
- **PWA**: Service workers for offline functionality
- **Bundling**: Vite for optimized builds

### Database
- **Indexes**: 
  ```javascript
  db.contents.createIndex({ "category": 1 })
  db.contents.createIndex({ "createdAt": -1 })
  db.qrcodes.createIndex({ "qrId": 1 })
  ```

## Güvenlik Önlemleri

### Backend Security
- **CORS Configuration**: Restricted origins
- **Input Validation**: JSR-303 Bean Validation
- **Rate Limiting**: API endpoint rate limiting
- **Environment Variables**: Sensitive data in env vars

### Frontend Security
- **XSS Protection**: DOMPurify for user-generated content
- **HTTPS**: SSL/TLS encryption
- **Content Security Policy**: CSP headers
- **API Keys**: Environment-based API key management

## Monitoring & Logging

### Application Monitoring
- **Spring Boot Actuator**: Health checks and metrics
- **Docker Health Checks**: Container health monitoring
- **Log Aggregation**: Centralized logging strategy

### Performance Monitoring
- **Response Time**: API response time tracking
- **Error Tracking**: Exception monitoring
- **Resource Usage**: Memory and CPU monitoring

## Ölçeklenebilirlik Planı

### Phase 1: MVP (Single Instance)
- Single server deployment
- Basic monitoring
- Manual backups

### Phase 2: Horizontal Scaling
- Load balancer (Nginx)
- Multiple backend instances
- MongoDB replica set
- Automated backups

### Phase 3: Microservices
- Separate services for different APIs
- Message queue (RabbitMQ)
- Service discovery
- Container orchestration (Kubernetes)

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database connections tested
- [ ] External API keys validated
- [ ] SSL certificates installed
- [ ] Backup strategy implemented
- [ ] Monitoring tools configured
- [ ] Performance tests completed
- [ ] Security audit performed

## Sonuç

Bu teknoloji stack, projenin hem öğrenme hem de production hedeflerini karşılayacak şekilde tasarlanmıştır. Docker-based deployment stratejisi, gelecekte mobile expansion (React Native) ve scaling ihtiyaçlarını desteklemektedir.

**Güçlü Yönler:**
- Modern ve endüstri standardı teknolojiler
- Kolay geliştirme ve deployment
- Yüksek performans ve ölçeklenebilirlik
- React Native'e geçiş kolaylığı

**Dikkat Edilmesi Gerekenler:**
- MongoDB schema design dikkatli planlanmalı
- External API rate limiting stratejisi uygulanmalı
- Production'da monitoring ve logging kritik
- Backup ve disaster recovery planı hazırlanmalı