package com.chiranjeeva.portfolio.contact;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository repository;
    private final ObjectProvider<JavaMailSender> mailSender;
    private final String notifyTo;
    private final String from;

    public ContactService(ContactMessageRepository repository,
                          ObjectProvider<JavaMailSender> mailSender,
                          @Value("${portfolio.contact.notify-to:}") String notifyTo,
                          @Value("${portfolio.contact.from:}") String from) {
        this.repository = repository;
        this.mailSender = mailSender;
        this.notifyTo = notifyTo == null ? "" : notifyTo.trim();
        this.from = from == null ? "" : from.trim();
    }

    /** Saves the message, then (if mail is configured) emails a notification. Email failures never lose the message. */
    @Transactional
    public void receive(ContactRequest request) {
        ContactMessage saved = repository.save(
                new ContactMessage(request.name().trim(), request.email().trim(), request.message().trim()));
        log.info("Contact message #{} stored", saved.getId());
        notifyOwner(saved);
    }

    private void notifyOwner(ContactMessage saved) {
        JavaMailSender sender = mailSender.getIfAvailable();
        if (sender == null || notifyTo.isEmpty()) {
            return; // mail not configured - the message is still in the database
        }
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(notifyTo);
            if (!from.isEmpty()) {
                mail.setFrom(from);
            }
            mail.setReplyTo(saved.getEmail());
            mail.setSubject("Portfolio message from " + saved.getName().replaceAll("[\\r\\n]+", " "));
            mail.setText("Name: " + saved.getName() + "\nEmail: " + saved.getEmail() + "\n\n" + saved.getMessage());
            sender.send(mail);
        } catch (Exception e) {
            log.warn("Could not send notification email: {}", e.getMessage());
        }
    }
}
