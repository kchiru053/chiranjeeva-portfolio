package com.chiranjeeva.portfolio;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:portfolio-test;DB_CLOSE_DELAY=-1",
        "portfolio.admin.key=test-key"
})
class PortfolioApiTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void servesPortfolioJson() throws Exception {
        mvc.perform(get("/api/portfolio"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.profile.displayName").value("Kappala Chiranjeeva"))
                .andExpect(jsonPath("$.projects.length()").value(2));
    }

    @Test
    void acceptsValidContactMessage() throws Exception {
        mvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Asha\",\"email\":\"asha@example.com\",\"message\":\"Hello, I'd like to talk about a role.\"}"))
                .andExpect(status().isCreated());
    }

    @Test
    void rejectsInvalidContactMessage() throws Exception {
        mvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"\",\"email\":\"not-an-email\",\"message\":\"short\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").exists());
    }

    @Test
    void adminEndpointNeedsKey() throws Exception {
        mvc.perform(get("/api/admin/messages")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/admin/messages").header("X-Admin-Key", "test-key")).andExpect(status().isOk());
    }
}
