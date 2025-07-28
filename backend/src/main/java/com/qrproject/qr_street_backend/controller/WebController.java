package com.qrproject.qr_street_backend.controller;

import com.qrproject.qr_street_backend.model.Content;
import com.qrproject.qr_street_backend.service.ContentService;
import com.qrproject.qr_street_backend.service.ExternalApiService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/content")
public class WebController {
    @Autowired
    private ContentService contentService;

    @Autowired
    private ExternalApiService externalApiService;

    @GetMapping("/random")
    public String showRandomContent(Model model) {
        Content content = externalApiService.fetchRickAndMortyCharacter();
        Content savedContent = contentService.saveContent(content);

        model.addAttribute("content", savedContent);
        return "content-carousel";
    }

}
