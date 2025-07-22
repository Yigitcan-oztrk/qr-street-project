package com.qrproject.qr_street_backend.repository;

import com.qrproject.qr_street_backend.model.Content;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContentRepository extends MongoRepository<Content, String> {
    List<Content> findByCategory(String category);

    Optional<Content> findByExternalId(Integer externalId);

    Content findByIdAndCategory(String id, String category);

}
