package com.qrproject.qr_street_backend.controller;

import com.qrproject.qr_street_backend.model.Content;
import com.qrproject.qr_street_backend.service.ContentService;
import com.qrproject.qr_street_backend.service.ExternalApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    @Autowired
    private ContentService contentService;

    @Autowired
    private ExternalApiService externalApiService;

    @GetMapping
    public List<Content> getAllContents() {
        return contentService.getAllContents();
    }

    @GetMapping("/{category}")
    public List<Content> getContentsByCategory(@PathVariable String category) {
        return contentService.getContentsByCategory(category);
    }

    @PostMapping
    public Content createContent(@RequestBody Content content) {
        return contentService.saveContent(content);
    }

    @GetMapping("/random")
    public Content getRandomContent() {
        Content content = externalApiService.fetchRickAndMortyCharacter();
        return contentService.saveContent(content);
    }

}