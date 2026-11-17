package com.chiranjeeva.portfolio.api;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * Loads the portfolio content (profile, projects, skills, ...) from a JSON document.
 *
 * By default it reads {@code classpath:portfolio.json}. Set {@code portfolio.data-file} to a path on disk
 * (e.g. {@code /opt/portfolio/portfolio.json}) and the file is re-read on every request, so you can edit
 * the content on a running server without rebuilding anything.
 */
@Service
public class PortfolioService {

    private final ObjectMapper mapper;
    private final Resource bundled;
    private final String externalFile;
    private volatile JsonNode cached;

    public PortfolioService(ObjectMapper mapper,
                            @Value("classpath:portfolio.json") Resource bundled,
                            @Value("${portfolio.data-file:}") String externalFile) {
        this.mapper = mapper;
        this.bundled = bundled;
        this.externalFile = externalFile == null ? "" : externalFile.trim();
    }

    public JsonNode getPortfolio() {
        try {
            if (!externalFile.isEmpty()) {
                try (InputStream in = Files.newInputStream(Path.of(externalFile))) {
                    return mapper.readTree(in);
                }
            }
            JsonNode local = cached;
            if (local == null) {
                try (InputStream in = bundled.getInputStream()) {
                    local = mapper.readTree(in);
                }
                cached = local;
            }
            return local;
        } catch (IOException e) {
            throw new UncheckedIOException("Could not read portfolio data", e);
        }
    }
}
