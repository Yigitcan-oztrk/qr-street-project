package com.qrproject.qr_street_backend.service;

import com.qrproject.qr_street_backend.model.Content;
import com.qrproject.qr_street_backend.repository.ContentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Optional;

@Service
public class ExternalApiService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ContentRepository contentRepository;

    @Value("${marvel.api.public-key}")
    private String marvelPublicKey;

    @Value("${marvel.api.private-key}")
    private String marvelPrivateKey;

    public Content fetchRickAndMortyCharacter() {
        int randomId = new Random().nextInt(826) + 1;

        // önce db'de var mı kontrolü ekliyoruz (source ile birlikte)
        Optional<Content> existingContent = contentRepository.findByExternalIdAndSource(randomId, "rickandmorty");

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
        content.setExternalId(randomId);
        content.setSource("rickandmorty");

        return content;
    }

    public Content fetchMarvelCharacter() {
        // Marvel API'de yaklaşık 1500+ karakter var
        int randomOffset = new Random().nextInt(1500);

        // Önce db'de var mı kontrolü
        Optional<Content> existingContent = contentRepository.findByExternalIdAndSource(randomOffset, "marvel");

        if (existingContent.isPresent()) {
            return existingContent.get();
        }

        // Marvel API authentication için hash oluştur
        String timestamp = String.valueOf(System.currentTimeMillis());
        String hash = generateMarvelHash(timestamp);

        // Marvel API URL'i oluştur
        String url = String.format(
            "https://gateway.marvel.com/v1/public/characters?limit=1&offset=%d&ts=%s&apikey=%s&hash=%s",
            randomOffset, timestamp, marvelPublicKey, hash
        );

        try {
            // API'yi çağır
            Map<String, Object> apiResponse = restTemplate.getForObject(url, Map.class);
            Map<String, Object> data = (Map<String, Object>) apiResponse.get("data");
            List<Map<String, Object>> results = (List<Map<String, Object>>) data.get("results");

            if (results == null || results.isEmpty()) {
                throw new RuntimeException("Marvel API'den karakter alınamadı");
            }

            Map<String, Object> character = results.get(0);

            // Thumbnail bilgisini al
            Map<String, String> thumbnail = (Map<String, String>) character.get("thumbnail");
            String imageUrl = thumbnail.get("path") + "." + thumbnail.get("extension");

            // Description oluştur - boşsa fallback ekle
            String description = (String) character.get("description");
            if (description == null || description.trim().isEmpty()) {
                // Comics bilgisini al
                Map<String, Object> comics = (Map<String, Object>) character.get("comics");
                int comicsCount = comics != null ? (Integer) comics.get("available") : 0;

                // Series bilgisini al
                Map<String, Object> series = (Map<String, Object>) character.get("series");
                int seriesCount = series != null ? (Integer) series.get("available") : 0;

                description = String.format("Marvel Universe character. Appears in %d comics and %d series.",
                    comicsCount, seriesCount);
            }

            // Content objesine çevir
            Content content = new Content();
            content.setTitle((String) character.get("name"));
            content.setDescription(description);
            content.setCategory("marvel");
            content.setImageUrl(imageUrl);
            content.setExternalId(((Number) character.get("id")).intValue());
            content.setSource("marvel");

            return content;

        } catch (Exception e) {
            throw new RuntimeException("Marvel API hatası: " + e.getMessage(), e);
        }
    }

    // Marvel API için MD5 hash oluşturma
    private String generateMarvelHash(String timestamp) {
        try {
            String value = timestamp + marvelPrivateKey + marvelPublicKey;
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] messageDigest = md.digest(value.getBytes());
            BigInteger no = new BigInteger(1, messageDigest);
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }
            return hashtext;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("MD5 algorithm not found", e);
        }
    }

}
