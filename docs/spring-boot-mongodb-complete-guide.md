# Spring Boot + MongoDB Entegrasyonu - Adım Adım Rehber

> **Bu rehber, Spring Boot projesi oluşturduktan sonra MongoDB entegrasyonu ve CRUD API'si geliştirme sürecini kapsar.**

## 📋 İçindekiler
1. [MongoDB Docker Kurulumu](#mongodb-docker-kurulumu)
2. [MongoDB Compass Kurulumu](#mongodb-compass-kurulumu)
3. [Spring Boot MongoDB Bağlantısı](#spring-boot-mongodb-bağlantısı)
4. [Model (Entity) Oluşturma](#model-entity-oluşturma)
5. [Repository Katmanı](#repository-katmanı)
6. [Service Katmanı](#service-katmanı)
7. [Controller Güncellemesi](#controller-güncellemesi)
8. [API Test İşlemleri](#api-test-işlemleri)
9. [Sık Karşılaşılan Hatalar](#sık-karşılaşılan-hatalar)

---

## 1. MongoDB Docker Kurulumu

### MongoDB Container'ını Başlatma
```bash
docker run -d --name qr-mongodb -p 27017:27017 mongo:7.0
```

### Komut Açıklaması:
- **`docker run`**: Yeni container çalıştır
- **`-d`**: Arka planda çalıştır (detached mode)
- **`--name qr-mongodb`**: Container adı
- **`-p 27017:27017`**: Port mapping (dış:iç)
- **`mongo:7.0`**: MongoDB 7.0 image'ını kullan

### ✅ Kontrol Komutları:
```bash
docker ps                    # Çalışan container'ları listele
docker stop qr-mongodb       # Container'ı durdur
docker start qr-mongodb      # Container'ı başlat
```

---

## 2. MongoDB Compass Kurulumu

### İndirme ve Kurulum:
1. https://www.mongodb.com/try/download/compass adresinden indirin
2. `.exe` dosyasını çalıştırıp kurun
3. Compass'ı açın

### Bağlantı:
```
Connection String: mongodb://localhost:27017
```

### 🎯 Önemli Notlar:
- **Docker container durduğunda** Compass bağlantısı kopar
- **Refresh (F5)** ile bağlantıyı yenileyin
- **İlk başta** sadece `admin`, `config`, `local` veritabanları görünür (normal)

---

## 3. Spring Boot MongoDB Bağlantısı

### application.properties Güncellemesi:
```properties
spring.application.name=qr-street-backend
spring.data.mongodb.uri=mongodb://localhost:27017/qrproject
spring.data.mongodb.database=qrproject
```

### 🔑 Konfigürasyon Açıklaması:
- **`mongodb://localhost:27017`**: MongoDB sunucu adresi
- **`/qrproject`**: Veritabanı adı (otomatik oluşturulur)
- **Bu dosya .env dosyası gibi çalışır** (Node.js'teki gibi)

### Production İçin Güvenlik:
```properties
# Development (application.properties)
spring.data.mongodb.uri=mongodb://localhost:27017/qrproject

# Production (Environment Variables)
SPRING_DATA_MONGODB_URI=${MONGODB_URI}
```

---

## 4. Model (Entity) Oluşturma

### 📁 Klasör Yapısı:
```
src/main/java/com/qrproject/qr_street_backend/
└── model/
    └── Content.java
```

### Content.java - Tam Kod:
```java
package com.qrproject.qr_street_backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "contents")  // ⭐ MongoDB'de tablo adı
public class Content {
    
    @Id                                 // ⭐ Primary Key
    private String id;
    
    @Field                              // ⭐ MongoDB field'ı
    private String title;
    
    @Field
    private String description;
    
    @Field
    private String category;
    
    @Field
    private String imageUrl;
    
    @Field
    private LocalDateTime createdAt;
    
    // ⭐ Constructor - Nesne oluştururken çalışır
    public Content() {
        this.createdAt = LocalDateTime.now();  // Otomatik tarih
    }
    
    // ⭐ Getter ve Setter Methods (Java güvenlik kuralı)
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
```

### 🎯 Annotation'ların Anlamları:

| Annotation | Açıklama | Örnek |
|------------|----------|-------|
| `@Document(collection = "contents")` | **MongoDB'de tablo adı** | SQL'deki `CREATE TABLE contents` |
| `@Id` | **Primary Key** | MongoDB otomatik unique ID verir |
| `@Field` | **MongoDB kolonları** | SQL'deki column tanımları |

### ⚠️ Sık Yapılan Hatalar:
```java
// ❌ YANLIŞ
@Document(collaction = "contents")  // Typo hatası!

// ✅ DOĞRU
@Document(collection = "contents")
```

---

## 5. Repository Katmanı

### 📁 Klasör Yapısı:
```
src/main/java/com/qrproject/qr_street_backend/
└── repository/
    └── ContentRepository.java
```

### ContentRepository.java - Tam Kod:
```java
package com.qrproject.qr_street_backend.repository;

import com.qrproject.qr_street_backend.model.Content;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository                    // ⭐ Spring'e "Repository sınıfı" der
public interface ContentRepository extends MongoRepository<Content, String> {
    
    // ⭐ Spring otomatik query oluşturur
    List<Content> findByCategory(String category);
    
    Content findByIdAndCategory(String id, String category);
    
    // ⭐ Otomatik gelen methodlar:
    // save(Content)          -> INSERT/UPDATE
    // findAll()              -> SELECT ALL
    // findById(String)       -> SELECT BY ID
    // deleteById(String)     -> DELETE
    // count()                -> COUNT
}
```

### 🎯 Repository'nin Sihri:

#### Spring Data'nın Otomatik Query'leri:
```java
// Method adından SQL oluşturur
findByCategory("rickandmorty")
// MongoDB: db.contents.find({category: "rickandmorty"})

findByIdAndCategory("123", "marvel")
// MongoDB: db.contents.find({_id: "123", category: "marvel"})
```

#### Repository Olmasa Ne Olurdu:
```java
// ❌ Repository olmasa: Her işlem için 10+ satır kod
Query query = new Query();
query.addCriteria(Criteria.where("category").is(category));
List<Content> result = mongoTemplate.find(query, Content.class, "contents");

// ✅ Repository ile: 1 satır kod
repository.findByCategory(category);
```

---

## 6. Service Katmanı

### 📁 Klasör Yapısı:
```
src/main/java/com/qrproject/qr_street_backend/
└── service/
    └── ContentService.java
```

### ContentService.java - Tam Kod:
```java
package com.qrproject.qr_street_backend.service;

import com.qrproject.qr_street_backend.model.Content;
import com.qrproject.qr_street_backend.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service                               // ⭐ Spring'e "Business Logic" der
public class ContentService {
    
    @Autowired                         // ⭐ Spring otomatik Repository getir
    private ContentRepository contentRepository;
    
    // ⭐ Business Logic Methods
    public List<Content> getAllContents() {
        return contentRepository.findAll();
    }
    
    public List<Content> getContentsByCategory(String category) {
        return contentRepository.findByCategory(category);
    }
    
    public Optional<Content> getContentById(String id) {
        return contentRepository.findById(id);
    }
    
    public Content saveContent(Content content) {
        return contentRepository.save(content);
    }
    
    public void deleteContent(String id) {
        contentRepository.deleteById(id);
    }
}
```

### 🎯 @Autowired'ın Sihri:
```java
// ❌ @Autowired olmasa (manuel)
ContentRepository repo = new ContentRepository(); // Hata! Interface'i new'leyemeyiz

// ✅ @Autowired ile (otomatik)
@Autowired
private ContentRepository contentRepository; // Spring halleder
```

### Service Katmanının Amacı:
- **Controller ile Repository arasında köprü**
- **Business logic** (gelecekte validasyon, hesaplama vs.)
- **Code organization** (temiz kod yapısı)

---

## 7. Controller Güncellemesi

### TestController → ContentController:
```java
package com.qrproject.qr_street_backend.controller;

import com.qrproject.qr_street_backend.model.Content;
import com.qrproject.qr_street_backend.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController                        // ⭐ REST API Controller
@RequestMapping("/api/content")        // ⭐ Base URL
public class ContentController {
    
    @Autowired                         // ⭐ Service'i otomatik getir
    private ContentService contentService;
    
    // ⭐ GET /api/content - Tüm içerikler
    @GetMapping
    public List<Content> getAllContents() {
        return contentService.getAllContents();
    }
    
    // ⭐ GET /api/content/{category} - Kategoriye göre
    @GetMapping("/{category}")
    public List<Content> getContentsByCategory(@PathVariable String category) {
        return contentService.getContentsByCategory(category);
    }
    
    // ⭐ POST /api/content - Yeni içerik ekle
    @PostMapping
    public Content createContent(@RequestBody Content content) {
        return contentService.saveContent(content);
    }
}
```

### 🎯 HTTP Mapping'lerin Anlamları:

| Annotation | HTTP Method | URL Örneği | Açıklama |
|------------|-------------|------------|----------|
| `@GetMapping` | GET | `/api/content` | **Veri okuma** |
| `@GetMapping("/{category}")` | GET | `/api/content/marvel` | **Parametreli okuma** |
| `@PostMapping` | POST | `/api/content` | **Veri ekleme** |
| `@PutMapping` | PUT | `/api/content/123` | **Veri güncelleme** |
| `@DeleteMapping` | DELETE | `/api/content/123` | **Veri silme** |

---

## 8. API Test İşlemleri

### 🔍 GET Request'leri (Tarayıcıdan):

#### Tüm İçerikleri Getir:
```
URL: http://localhost:8080/api/content
Sonuç: [{"id":"123","title":"Rick","category":"rickandmorty",...}]
```

#### Kategoriye Göre Getir:
```
URL: http://localhost:8080/api/content/rickandmorty
Sonuç: Rick & Morty kategorisindeki içerikler
```

#### Boş Kategori Test:
```
URL: http://localhost:8080/api/content/marvel
Sonuç: [] (boş array)
```

### 📤 POST Request (Postman):

#### Request Ayarları:
- **Method:** POST
- **URL:** `http://localhost:8080/api/content`
- **Headers:** `Content-Type: application/json`

#### Request Body (JSON):
```json
{
    "title": "Rick Sanchez",
    "description": "Genius scientist from dimension C-137",
    "category": "rickandmorty",
    "imageUrl": "https://example.com/rick.jpg"
}
```

#### Başarılı Response (200 OK):
```json
{
    "id": "687ebfe6d9da79a5db1f19f1",
    "title": "Rick Sanchez",
    "description": "Genius scientist from dimension C-137",
    "category": "rickandmorty",
    "imageUrl": "https://example.com/rick.jpg",
    "createdAt": "2025-07-22T01:32:06.69"
}
```

---

## 9. Sık Karşılaşılan Hatalar

### ❌ Hata 1: Typo (Yazım Hatası)
```java
// YANLIŞ
@Document(collaction = "contents")

// DOĞRU
@Document(collection = "contents")
```

### ❌ Hata 2: MongoDB Container Çalışmıyor
```bash
# Kontrol et
docker ps

# Başlat
docker start qr-mongodb
```

### ❌ Hata 3: Port Çakışması
```properties
# application.properties
server.port=8081  # 8080 yerine
```

### ❌ Hata 4: JSON Format Hatası
```json
// YANLIŞ (virgül yok)
{
    "title": "Rick"
    "category": "rickandmorty"
}

// DOĞRU
{
    "title": "Rick",
    "category": "rickandmorty"
}
```

### ❌ Hata 5: Import Eksikliği
```java
// Gerekli import'lar
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.beans.factory.annotation.Autowired;
```

---

## 📊 Proje Durumu - Tamamlanan Özellikler

### ✅ Tamamlanan:
- [x] Spring Boot + MongoDB bağlantısı
- [x] Content model/entity
- [x] Repository pattern
- [x] Service katmanı
- [x] CRUD API endpoints
- [x] Postman ile test
- [x] MongoDB Compass entegrasyonu

### 🔄 Sonraki Adımlar (Gelecek):
- [ ] External API entegrasyonu (Rick & Morty API)
- [ ] QR Code generation
- [ ] Error handling ve validation
- [ ] Docker Compose (Full stack)
- [ ] Frontend (React) entegrasyonu

---

## 🎯 Önemli Hatırlatmalar

### **Spring Boot Katmanları:**
```
Controller (HTTP) → Service (Business Logic) → Repository (Data Access) → MongoDB
```

### **MongoDB Terminology:**
- **SQL Table** = **MongoDB Collection**
- **SQL Row** = **MongoDB Document**
- **SQL Column** = **MongoDB Field**

### **API Test Sequence:**
1. **Spring Boot başlat** (`Started QrStreetBackendApplication`)
2. **MongoDB container kontrol** (`docker ps`)
3. **GET request test** (boş array `[]` döner)
4. **POST request ile veri ekle** (Postman)
5. **GET request tekrar** (veri dolu döner)
6. **MongoDB Compass'ta kontrol** (qrproject/contents collection'ında veri)

---

**🎉 Tebrikler! İlk Spring Boot + MongoDB CRUD API'nizi başarıyla tamamladınız!**

> **Not:** Bu rehberi bookmark yapın - ileride reference olarak kullanabilirsiniz. Bir sonraki oturumda External API entegrasyonu ile devam edeceğiz.