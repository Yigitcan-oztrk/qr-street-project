# Spring Boot Proje Kurulum Rehberi - Adım Adım

## 1. Sistem Hazırlığı

### Java Kurulumu
- **Neden Java 17?** Spring Boot 3.x için minimum Java 17 gerekli
- **OpenJDK vs Oracle JDK:** OpenJDK ücretsiz ve açık kaynak
- **Kontrol komutu:** `java -version`

### Maven vs IDE Maven
- **Maven:** Java projelerinde dependency management aracı
- **VS Code Extension:** Ayrı Maven kurulumuna gerek yok, extension içinde geliyor
- **Ne işe yarar:** Kütüphaneleri indirme, proje build etme, test çalıştırma

## 2. Spring Initializr ile Proje Oluşturma

### VS Code'da Proje Oluşturma
```
Ctrl + Shift + P → Spring Initializr: Create a Maven Project
```

### Seçimler ve Anlamları

#### Spring Boot Version
- **3.5.3 (Stable):** Production'a hazır, test edilmiş versiyon
- **SNAPSHOT:** Geliştirme aşamasında, unstable versiyonlar
- **Seçim:** Her zaman stable version seçin

#### Programming Language
- **Java:** En yaygın, büyük community
- **Kotlin:** Modern, Java ile uyumlu
- **Groovy:** Dynamic typing
- **Seçim:** Java (daha fazla kaynak ve dokümantasyon)

#### Group ID
```
com.qrproject
```
- **Ne demek:** Organizasyon/şirket identifier'ı
- **Format:** Reverse domain notation (com.company.project)
- **Örnek:** com.google, com.microsoft, com.qrproject

#### Artifact ID
```
qr-street-backend
```
- **Ne demek:** Proje adı, jar dosyasının adı
- **Kural:** Küçük harf, tire ile ayırma
- **Sonuç:** qr-street-backend-0.0.1-SNAPSHOT.jar

#### Packaging Type
- **Jar:** Standalone application (Web apps için ideal)
- **War:** Web server'a deploy için (Tomcat, etc.)
- **Seçim:** Jar (Spring Boot embedded Tomcat ile gelir)

#### Java Version
- **17:** LTS (Long Term Support) versiyon
- **21:** Yeni LTS versiyon
- **8, 11:** Eski versiyonlar
- **Seçim:** 17 (sistem Java versiyonu ile uyumlu)

## 3. Dependencies (Bağımlılıklar)

### Seçtiğimiz Dependencies

#### Spring Web
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
- **Ne yapar:** REST API endpoint'leri oluşturma
- **İçeriği:** Spring MVC, Tomcat, Jackson (JSON)
- **Kullanım:** @RestController, @GetMapping, @PostMapping

#### Spring Data MongoDB
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-mongodb</artifactId>
</dependency>
```
- **Ne yapar:** MongoDB ile kolay entegrasyon
- **İçeriği:** MongoDB driver, Repository pattern
- **Kullanım:** @Document, MongoRepository, @Query

#### Validation
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
- **Ne yapar:** Input validation (giriş doğrulama)
- **İçeriği:** Hibernate Validator, JSR-303
- **Kullanım:** @Valid, @NotNull, @Size, @Email

## 4. Proje Yapısı Açıklaması

```
qr-street-backend/
├── src/
│   ├── main/
│   │   ├── java/com/qrproject/qr_street_backend/
│   │   │   └── QrStreetBackendApplication.java    # Ana başlatma dosyası
│   │   └── resources/
│   │       ├── application.properties             # Yapılandırma dosyası
│   │       └── static/                           # Static dosyalar (CSS, JS)
│   └── test/                                     # Test dosyaları
├── target/                                       # Build çıktıları (Maven)
├── pom.xml                                       # Maven yapılandırması
└── mvnw, mvnw.cmd                               # Maven wrapper
```

### Önemli Dosyalar

#### QrStreetBackendApplication.java
```java
@SpringBootApplication  // Spring Boot uygulaması olduğunu belirtir
public class QrStreetBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(QrStreetBackendApplication.class, args);
    }
}
```
- **@SpringBootApplication:** 3 annotation'ı birleştirir
  - `@Configuration`: Bean tanımlamaları
  - `@EnableAutoConfiguration`: Otomatik yapılandırma
  - `@ComponentScan`: Component taraması

#### pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.5.3</version>
    </parent>
    
    <groupId>com.qrproject</groupId>
    <artifactId>qr-street-backend</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    
    <dependencies>
        <!-- Dependencies buraya eklenir -->
    </dependencies>
</project>
```

## 5. Uygulama Çalıştırma

### VS Code'da Çalıştırma
1. **QrStreetBackendApplication.java** dosyasını aç
2. **Ctrl + F5** veya Run butonu
3. Terminal'de "Started QrStreetBackendApplication" mesajını bekle

### Çalışma Kontrolü
```
http://localhost:8080
```
- **Whitelabel Error Page:** Normal! Henüz endpoint yok
- **Hata yoksa:** Spring Boot başarıyla çalışıyor
- **Port 8080:** Spring Boot'un default portu

## 6. Spring Boot Annotations (Gelecek Adımlar İçin)

### Controller Annotations
```java
@RestController          // REST API controller'ı
@RequestMapping("/api")  // Base URL path
@GetMapping("/hello")    // HTTP GET endpoint
@PostMapping("/create")  # HTTP POST endpoint
@PathVariable           // URL'den parameter alma
@RequestBody            // JSON'dan object'e çevirme
```

### Service Annotations
```java
@Service                // Business logic katmanı
@Component              // Genel Spring component
@Autowired              // Dependency injection
```

### Database Annotations
```java
@Document               // MongoDB collection
@Id                     // Primary key
@Field                  // Field mapping
```

## 7. Sık Karşılaşılan Hatalar ve Çözümleri

### Port 8080 Meşgul
```yaml
# application.yml
server:
  port: 8081
```

### Java Version Uyumsuzluğu
- **Hata:** "java.lang.UnsupportedClassVersionError"
- **Çözüm:** Java 17+ kullanın

### Maven Build Hatası
- **Hata:** "mvn command not found"
- **Çözüm:** VS Code extension yeterli, ayrı Maven gerekmez

### MongoDB Bağlantı Hatası
- **Hata:** "Connection refused to MongoDB"
- **Çözüm:** MongoDB Docker container'ını başlatın

## 8. Sonraki Adımlar

1. **Controller oluşturma** (şu anda buradayız)
2. **MongoDB bağlantısı**
3. **Service layer**
4. **Model/Entity sınıfları**
5. **API endpoint'leri**

## 9. Faydalı Komutlar

```bash
# Proje build etme
mvn clean install

# Test çalıştırma
mvn test

# Sadece compile
mvn compile

# Spring Boot çalıştırma
mvn spring-boot:run
```

## 10. VS Code Shortcuts

```
Ctrl + Shift + P    # Command Palette
Ctrl + F5           # Run without debugging
Ctrl + `            # Terminal açma
Ctrl + Shift + E    # Explorer panel
```

Bu rehber, Spring Boot projesi oluştururken karşılaştığımız her adımın anlamını ve önemini açıklar. Proje geliştirmeye devam ederken bu notlara tekrar dönebilirsiniz.