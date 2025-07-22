package com.qrproject.qr_street_backend.service;

import com.qrproject.qr_street_backend.model.Content;
import com.qrproject.qr_street_backend.repository.ContentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Random;
import java.util.Optional;

@Service
public class ExternalApiService {
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ContentRepository contentRepository;

    public Content fetchRickAndMortyCharacter() {
        int randomId = new Random().nextInt(826) + 1;

        // önce db'de var mı kontrolü ekliyoruz
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
        content.setExternalId(randomId);

        return content;
    }
}
