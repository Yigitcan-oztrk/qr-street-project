# Spring Boot External API Entegrasyonu - Rick & Morty API

> **Bu rehber, Spring Boot + MongoDB temelinden sonra External API entegrasyonu ve duplicate kontrolü ekleme sürecini kapsar.**

## 📋 İçindekiler
1. [Config Katmanı Oluşturma](#config-katmanı-oluşturma)
2. [RestTemplate Konfigürasyonu](#resttemplate-konfigürasyonu)
3. [Model Güncellemesi (Unique Field)](#model-güncellemesi-unique-field)
4. [External API Service](#external-api-service)
5. [Repository Güncellemesi](#repository-güncellemesi)
6. [Duplicate Kontrolü](#duplicate-kontrolü)
7. [Controller Entegrasyonu](#controller-entegrasyonu)
8. [Import Yönetimi İpuçları](#import-yönetimi-ipuçları)
9. [Sık Sorulan Sorular](#sık-sorulan-sorular)

---

## 1. Config Katmanı Oluşturma

### 📁 Klasör Yapısı:
```
src/main/java/com/qrproject/qr_street_backend/
└── config/
    └── WebConfig.java
```

### ❓ Config Nedir?
> **Config = Configuration (Yapılandırma)**  
> Spring Boot'a **nasıl çalışacağını söylediğimiz yer**.

### 🔧 WebConfig.java:
```java
package com.qrproject.qr_street_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class WebConfig {
    
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

### 🎯 Annotation'ların Anlamları:

| Annotation | Açıklama | Analoji |
|------------|----------|---------|
| `@Configuration` | **"Bu class'taki ayarları oku ve uygula"** | Fabrika ayar dosyası |
| `@Bean` | **"Bu method'un döndürdüğü nesneyi Spring'de kullan"** | Merkezi araç deposu |

### 💡 RestTemplate = Araç Analogisi:

#### ❌ Config Olmasa (Verimsiz):
```java
// Her service'de ayrı ayrı araç almak zorunda
@Service
public class RickMortyService {
    RestTemplate restTemplate = new RestTemplate(); // Yeni araç al
}

@Service  
public class MarvelService {
    RestTemplate restTemplate = new RestTemplate(); // Yeni araç al
}
```

#### ✅ Config İle (Verimli):
```java
// Config: "Ben herkese araç sağlayacağım"
@Configuration
public class WebConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate(); // Tek araç
    }
}

// Service'ler: "Hazır aracı kullanayım"
@Service
public class RickMortyService {
    @Autowired
    private RestTemplate restTemplate; // Hazır aracı al
}
```

---

## 2. RestTemplate Konfigürasyonu

### 🎯 RestTemplate Ne İşe Yarar:
- **HTTP istekleri** göndermek için Spring'in aracı
- **External API'leri** çağırmak için kullanılır
- **GET, POST, PUT, DELETE** istekleri yapabilir

### Kullanım Örnekleri:
```java
// GET isteği
String response = restTemplate.getForObject("https://api.example.com/data", String.class);

// POST isteği  
Content newContent = restTemplate.postForObject("https://api.example.com/create", requestBody, Content.class);
```

---

## 3. Model Güncellemesi (Unique Field)

### ⚠️ Problem: Duplicate Data
```
Random ID = 42 → Rick Sanchez eklenir
Random ID = 42 → Rick Sanchez TEKRAR eklenir ❌
Aynı karakter 10 kere olabilir!
```

### ✅ Çözüm: Unique External ID

#### Content.java Güncellemeleri:

##### 3.1. Import Ekleme:
```java
import org.springframework.data.mongodb.core.index.Indexed;
```

##### 3.2. Field Ekleme:
```java
@Field
@Indexed(unique = true)  // ⭐ Aynı değer 2 kere olamaz!
private Integer externalId;  // Rick&Morty API ID'si
```

##### 3.3. Getter/Setter Ekleme:
```java
public Integer getExternalId() { return externalId; }
public void setExternalId(Integer externalId) { this.externalId = externalId; }
```

### 🎯 @Indexed(unique = true) Açıklaması:

#### Database Level Protection:
```java
// ✅ İlk kayıt
Content rick1 = new Content();
rick1.setExternalId(1); // Rick Sanchez
repository.save(rick1); // Başarılı

// ❌ Aynı ID tekrar
Content rick2 = new Content(); 
rick2.setExternalId(1); // Aynı Rick
repository.save(rick2); // HATA! Duplicate key error
```

#### Real-World Analogy:
```
Okul sistemi:
- Öğrenci No: 12345 → Ahmet ✅
- Öğrenci No: 12345 → Mehmet ❌ (Aynı numara olamaz!)

Rick&Morty API:
- externalId: 1 → Rick Sanchez ✅
- externalId: 1 → Rick Sanchez ❌ (Duplicate engellendi!)
```

---

## 4. External API Service

### 📁 Dosya: ExternalApiService.java
```
src/main/java/com/qrproject/qr_street_backend/service/
└── ExternalApiService.java
```

### 🔧 ExternalApiService.java - Tam Kod:
```java
package com.qrproject.qr_street_backend.service;

import com.qrproject.qr_street_backend.model.Content;
import com.qrproject.qr_street_backend.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
public class ExternalApiService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private ContentRepository contentRepository;
    
    public Content fetchRickAndMortyCharacter() {
        // Random karakter ID (1-826 arası)
        int randomId = new Random().nextInt(826) + 1;
        
        // ⭐ Önce DB'de var mı kontrol et
        Optional<Content> existingContent = contentRepository.findByExternalId(randomId);
        
        if (existingContent.isPresent()) {
            // Varsa mevcut veriyi döndür
            return existingContent.get();
        }
        
        // Yoksa API'den çek
        String url = "https://rickandmortyapi.com/api/character/" + randomId;
        
        // API'yi çağır
        Map<String, Object> apiResponse = restTemplate.getForObject(url, Map.class);
        
        // Content objesine çevir
        Content content = new Content();
        content.setTitle((String) apiResponse.get("name"));
        content.setDescription((String) apiResponse.get("status") + " - " + (String) apiResponse.get("species"));
        content.setCategory("rickandmorty");
        content.setImageUrl((String) apiResponse.get("image"));
        content.setExternalId(randomId);  // ⭐ External ID'yi set et
        
        return content;
    }
}
```

### 🎯 Kod Açıklaması:

#### API Çağrısı:
```java
Map<String, Object> apiResponse = restTemplate.getForObject(url, Map.class);
```

**Bu Satır Ne Yapıyor:**
1. **restTemplate.getForObject():** HTTP GET isteği gönder
2. **url:** `https://rickandmortyapi.com/api/character/42`
3. **Map.class:** Gelen JSON'u Map'e çevir

#### Rick & Morty API Response Örneği:
```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "status": "Alive", 
  "species": "Human",
  "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
}
```

#### Map'e Çevrilince:
```java
apiResponse = {
  "id" = 1,
  "name" = "Rick Sanchez",
  "status" = "Alive", 
  "species" = "Human",
  "image" = "https://..."
}
```

#### (String) Type Casting:
```java
(String) apiResponse.get("name")
```
- **apiResponse.get("name"):** Object tipinde döner
- **(String):** Object'i String'e çevir
- **Sebep:** Java type safety için

---

## 5. Repository Güncellemesi

### ContentRepository.java'ya Method Ekleme:
```java
@Repository
public interface ContentRepository extends MongoRepository<Content, String> {
    
    List<Content> findByCategory(String category);
    
    Content findByIdAndCategory(String id, String category);
    
    Optional<Content> findByExternalId(Integer externalId);  // ⭐ YENİ METHOD
}
```

### ⚠️ Import Unutmayın:
```java
import java.util.Optional;
```

### 🎯 Optional Nedir?

> **Optional = "Belki var, belki yok" demek**

#### ❌ Optional OLMADAN (Tehlikeli):
```java
Content findByExternalId(Integer externalId);

Content content = repository.findByExternalId(42);
if (content == null) {  // ⚠️ Null check yapmayı unutabilirsiniz!
    // NullPointerException riski!
}
```

#### ✅ Optional İLE (Güvenli):
```java
Optional<Content> findByExternalId(Integer externalId);

Optional<Content> contentOpt = repository.findByExternalId(42);
if (contentOpt.isPresent()) {
    Content content = contentOpt.get();  // Güvenli erişim
} else {
    // Bulunamadı, alternatif aksiyon
}
```

### Optional Kullanım Pattern'leri:
```java
// Pattern 1: Var mı kontrol et
if (contentOpt.isPresent()) {
    Content content = contentOpt.get();
}

// Pattern 2: Varsa al, yoksa default
Content content = contentOpt.orElse(defaultContent);

// Pattern 3: Varsa al, yoksa exception
Content content = contentOpt.orElseThrow(() -> new RuntimeException("Not found"));
```

---

## 6. Duplicate Kontrolü

### 🤔 Neden İki Katmanlı Kontrol?

#### Sadece Model Kontrolü (Ilkel):
```java
@Indexed(unique = true)  // MongoDB seviyesinde kontrol
private Integer externalId;

// Duplicate gelince:
💥 "HATA! Bu ID zaten var, eklemeyi RED EDİYORUM!"
// DuplicateKeyException fırlatır, uygulama çöker
```

#### Model + Service Kontrolü (Akıllı):
```java
// 1. Service'de kontrol
Optional<Content> existing = repository.findByExternalId(randomId);
if (existing.isPresent()) {
    return existing.get();  // Mevcut veriyi döndür
}

// 2. Model'de unique constraint
@Indexed(unique = true)

// Duplicate gelince:
😊 "Bu ID zaten var, mevcut veriyi döndüreyim!"
// Graceful handling, uygulama sorunsuz çalışır
```

### 🏢 Real-World Analogi:

#### Model = Kapıcı (Sert):
```
Kullanıcı: "Apartmana girmek istiyorum"
Kapıcı: "Kimliğin var mı?"
Kullanıcı: "Aynı kimlik var birinde"
Kapıcı: "HAYIR! GIREMEZSIN!" 💥
```

#### Service = Akıllı Resepsiyon (Nazik):
```
Kullanıcı: "Apartmana girmek istiyorum"
Resepsiyon: "Kimliğin var mı?"
Kullanıcı: "Aynı kimlik var birinde"
Resepsiyon: "Tamam, seni o odaya yönlendireyim!" 😊
```

### Akış Karşılaştırması:

#### ESKİ AKIŞ:
```
1. Random ID oluştur
2. API'yi çağır (Her seferinde!)
3. Content oluştur
4. Save et
❌ Problem: Aynı karakter tekrar eklenebilir + Gereksiz API çağrıları
```

#### YENİ AKIŞ:
```
1. Random ID oluştur
2. DB'de var mı kontrol et
   ├─ Var ise → Mevcut veriyi döndür (API çağrısı YOK!)
   └─ Yok ise → API'yi çağır → Content oluştur → Save et
✅ Avantaj: Duplicate yok + Performance artışı
```

---

## 7. Controller Entegrasyonu

### ContentController.java Güncellemeleri:

#### 7.1. Import Ekleme:
```java
import com.qrproject.qr_street_backend.service.ExternalApiService;
```

#### 7.2. Service Injection:
```java
@Autowired
private ContentService contentService;

@Autowired  
private ExternalApiService externalApiService;  // ⭐ YENİ INJECTION
```

#### 7.3. Yeni Endpoint:
```java
@GetMapping("/random")
public Content getRandomContent() {
    Content content = externalApiService.fetchRickAndMortyCharacter();
    return contentService.saveContent(content);
}
```

### 🎯 Endpoint Açıklaması:

#### URL:
```
GET /api/content/random
```

#### İşlem Akışı:
```
1. ExternalApiService.fetchRickAndMortyCharacter() çağır
   ├─ DB'de karakter var mı kontrol et
   ├─ Varsa: Mevcut karakteri döndür
   └─ Yoksa: Rick&Morty API'den çek
2. ContentService.saveContent() ile kaydet
3. JSON olarak client'a döndür
```

#### Test URL'si:
```
http://localhost:8080/api/content/random
```

---

## 8. Import Yönetimi İpuçları

### 💡 Import'ları Nasıl Bilebilirim?

#### 1. IDE Otomatik Tamamlama (En Kolay):
```java
@Configuration  // Kırmızı alt çizgi çıkar
// Alt + Enter (VS Code) / Ctrl + Space
// IDE otomatik import önerir
```

#### 2. VS Code Shortcuts:
- **Ctrl + Space:** Otomatik tamamlama
- **Ctrl + .:** Quick fix (import ekle)
- **F1 → "Java: Organize Imports"**

#### 3. Yaygın Spring Import Pattern'leri:
```java
// Configuration için hep bunlar
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// RestTemplate için hep bu
import org.springframework.web.client.RestTemplate;

// Controller için hep bunlar
import org.springframework.web.bind.annotation.*;

// Service için hep bunlar
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
```

#### 4. Import Tanıma Kuralları:
- **`org.springframework`** ile başlayanlar → Spring Framework
- **`java.util`** ile başlayanlar → Java Standard Library
- **`com.qrproject`** ile başlayanlar → Bizim projemiz

#### 5. Google-fu Tekniği:
```
Google: "Spring Boot RestTemplate configuration"
→ Stack Overflow örnekleri
→ Import'ları kopyala 😄
```

### ⚠️ Sık Unutulan Import'lar:
```java
import java.util.Optional;           // Optional kullanımında
import java.util.Map;               // Map kullanımında  
import java.util.Random;            // Random kullanımında
import java.util.List;              // List kullanımında
```

---

## 9. Sık Sorulan Sorular

### ❓ Q: ExternalId field'ı ekledik ama Service'de set etmeyi unutsak ne olur?
**A:** `externalId` null kalır, unique constraint çalışmaz, duplicate'lar oluşur.

### ❓ Q: Optional yerine normal return type kullansak olur mu?
**A:** Olur ama NullPointerException riski var. Optional daha güvenli.

### ❓ Q: RestTemplate yerine başka HTTP client kullanabilir miyiz?
**A:** Evet! OkHttp, HttpClient, WebClient kullanabilirsiniz. RestTemplate kolay başlangıç.

### ❓ Q: Random ID çakışması çok sık olur mu?
**A:** 826 karakter var, başlangıçta nadir. Database büyüdükçe sıklaşır.

### ❓ Q: API çağrısı başarısız olursa ne olur?
**A:** RestTemplate exception fırlatır. Exception handling eklenmeli (gelecek özellik).

### ❓ Q: Aynı anda birden fazla istek gelirse duplicate problem olur mu?
**A:** MongoDB unique constraint race condition'ları da yakalar.

---

## 📊 Proje Durumu - Tamamlanan Özellikler

### ✅ Önceki Adımlardan Gelenler:
- [x] Spring Boot + MongoDB bağlantısı
- [x] Content model/entity
- [x] Repository pattern
- [x] Service katmanı
- [x] Basic CRUD API endpoints

### ✅ Bu Adımda Tamamlanan:
- [x] RestTemplate konfigürasyonu
- [x] External API entegrasyonu (Rick & Morty)
- [x] Duplicate prevention (Model + Service)
- [x] Optional kullanımı
- [x] Smart caching (DB-first approach)
- [x] Random content endpoint

### 🔄 Sonraki Adımlar:
- [ ] QR Code generation
- [ ] Error handling ve validation
- [ ] React frontend entegrasyonu
- [ ] Docker Compose (Full stack)

---

## 🎯 Test Senaryoları

### Test 1: İlk Random Content:
```
URL: http://localhost:8080/api/content/random
Beklenen: Rick & Morty API'den yeni karakter çekilir, MongoDB'ye kaydedilir
```

### Test 2: Aynı Karakter Tekrar:
```
URL: http://localhost:8080/api/content/random (tekrar)
Beklenen: Aynı karakter gelirse DB'den döner, API çağrısı yapılmaz
```

### Test 3: Mevcut Endpoint'ler:
```
URL: http://localhost:8080/api/content
Beklenen: Tüm karakterler (manuel + external API'den gelenler)

URL: http://localhost:8080/api/content/rickandmorty  
Beklenen: Sadece Rick & Morty kategorisindeki karakterler
```

### Test 4: MongoDB Compass Kontrolü:
```
qrproject → contents collection
Beklenen: externalId field'ı olan karakterler görünür
```

---

## 🚨 Önemli Hatırlatmalar

### **Duplicate Kontrolü İki Katmanlı:**
```
1. Service Level: Graceful handling (kullanıcı dostu)
2. Database Level: Son güvenlik ağı (crash önleme)
```

### **Import Management:**
- IDE otomatik tamamlama kullan
- Yaygın pattern'leri ezberle
- Google-fu tekniği ile örnekleri bul

### **Optional Usage:**
- Null safety için kullan
- `isPresent()` kontrolü yapmayı unutma
- Modern Java best practice

### **External API Best Practices:**
- Duplicate kontrolü yap
- Cache mekanizması kullan
- Error handling ekle (gelecek adım)

---

**🎉 Tebrikler! External API entegrasyonu ve akıllı duplicate kontrolü başarıyla tamamlandı!**

> **Not:** Bu rehberi bookmark yapın. QR Code generation'da devam edeceğiz!