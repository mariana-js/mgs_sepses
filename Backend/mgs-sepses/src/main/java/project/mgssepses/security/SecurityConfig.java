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
            .requestMatchers("/hospital/**").permitAll()
            .requestMatchers("/paciente/**").permitAll()
            
            .anyRequest().authenticated() // 🔹 Outras rotas precisarão de autenticação
            );

        return http.build();
}
}
