package project.mgssepses.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    
  
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // Permite todas as requisições sem autenticação
            )
            .csrf(csrf -> csrf.disable()) // Desativa proteção CSRF
            .formLogin(login -> login.disable()) // Desativa formulário de login
            .httpBasic(basic -> basic.disable()); // Desativa autenticação básica

        return http.build();
    }
}
