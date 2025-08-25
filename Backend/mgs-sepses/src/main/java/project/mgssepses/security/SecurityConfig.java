package project.mgssepses.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configure(http)) // ✅ Habilita CORS corretamente
                .csrf(AbstractHttpConfigurer::disable) // ✅ Desativa CSRF
                .authorizeHttpRequests(auth -> auth
                .requestMatchers("/log/**").permitAll()
                .requestMatchers("/profissional/**").permitAll()
                .requestMatchers("/hosprof/**").permitAll()
                .requestMatchers("/hospac/**").permitAll()
                .requestMatchers("/hospital/**").permitAll()
                .requestMatchers("/paciente/**").permitAll()
                .requestMatchers("/paciente/dados_clinicos**").permitAll()
                );

        return http.build();
    }
}
