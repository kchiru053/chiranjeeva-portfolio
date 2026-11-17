package com.chiranjeeva.portfolio.api;

import com.chiranjeeva.portfolio.contact.ContactMessage;
import com.chiranjeeva.portfolio.contact.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.List;

/**
 * Read / delete contact-form messages.
 * Disabled (404) unless an admin key is configured, e.g. ADMIN_KEY=some-long-random-string.
 * Call it with the header  X-Admin-Key: some-long-random-string  (use HTTPS in production).
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final ContactMessageRepository repository;
    private final String adminKey;

    public AdminController(ContactMessageRepository repository,
                           @Value("${portfolio.admin.key:}") String adminKey) {
        this.repository = repository;
        this.adminKey = adminKey == null ? "" : adminKey.trim();
    }

    @GetMapping("/messages")
    public List<MessageView> list(@RequestHeader(value = "X-Admin-Key", required = false) String key) {
        authorize(key);
        return repository.findAllByOrderByCreatedAtDesc().stream().map(MessageView::of).toList();
    }

    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id,
                                       @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        authorize(key);
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void authorize(String provided) {
        if (adminKey.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        boolean ok = provided != null && MessageDigest.isEqual(
                adminKey.getBytes(StandardCharsets.UTF_8), provided.getBytes(StandardCharsets.UTF_8));
        if (!ok) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }
    }

    public record MessageView(Long id, String name, String email, String message, Instant createdAt) {
        static MessageView of(ContactMessage m) {
            return new MessageView(m.getId(), m.getName(), m.getEmail(), m.getMessage(), m.getCreatedAt());
        }
    }
}
