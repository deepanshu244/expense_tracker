package com.deepanshu.expense_tracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Apply to all /api routes
                .allowedOrigins("http://localhost:5173") // Your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}