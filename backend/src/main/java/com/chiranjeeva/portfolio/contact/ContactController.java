package com.chiranjeeva.portfolio.contact;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final ContactService service;
    private final ContactRateLimiter limiter;

    public ContactController(ContactService service, ContactRateLimiter limiter) {
        this.service = service;
        this.limiter = limiter;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> contact(@Valid @RequestBody ContactRequest request,
                                                       HttpServletRequest http) {
        // Honeypot filled in: pretend it worked so bots don't learn anything, but store nothing.
        if (request.website() != null && !request.website().isBlank()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("status", "received"));
        }
        if (!limiter.tryAcquire(http.getRemoteAddr())) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                    .body(Map.of("message", "Too many messages from this address. Please try again later."));
        }
        service.receive(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("status", "received"));
    }
}
