package com.qrproject.qr_street_backend.service;

import com.qrproject.qr_street_backend.model.Content;
import com.qrproject.qr_street_backend.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContentService {

    @Autowired
    private ContentRepository contentRepository;

    // tüm içerikleri getirmek
    public List<Content> getAllContents() {
        return contentRepository.findAll();
    }

    // kategoriye göre içerik getir

    public List<Content> getContentsByCategory(String category) {
        return contentRepository.findByCategory(category);
    }

    // ID ile içerik getir
    public Optional<Content> getContentById(String id) {
        return contentRepository.findById(id);
    }

    // Yeni içerik kaydet
    public Content saveContent(Content content) {
        return contentRepository.save(content);
    }

    // İçerik sil
    public void deleteContent(String id) {
        contentRepository.deleteById(id);
    }
}
