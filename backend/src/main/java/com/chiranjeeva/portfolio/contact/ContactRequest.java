package com.chiranjeeva.portfolio.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Body of POST /api/contact.
 * {@code website} is a honeypot: real visitors never see or fill it, bots usually do.
 */
public record ContactRequest(
        @NotBlank(message = "Please enter your name.")
        @Size(max = 100, message = "Name is too long (100 characters max).")
        String name,

        @NotBlank(message = "Please enter your email.")
        @Email(message = "That email address doesn't look right.")
        @Size(max = 200, message = "Email is too long.")
        String email,

        @NotBlank(message = "Please write a message.")
        @Size(min = 10, max = 2000, message = "Message must be between 10 and 2000 characters.")
        String message,

        @Size(max = 200)
        String website
) {
}
