package project.mgssepses.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
            
            .requestMatchers(HttpMethod.GET, "/log/**").permitAll() // ✅ Permite GET sem autenticação
            .requestMatchers(HttpMethod.POST, "/log/**").permitAll() // ✅ Permite POST sem autenticação
            
            .requestMatchers(HttpMethod.POST, "/profissional/**").permitAll() 
            .requestMatchers(HttpMethod.GET, "/profissional/**").permitAll() // ✅ Permite GET sem autenticação
            .requestMatchers(HttpMethod.PUT, "/profissional/**").permitAll() // ✅ Permite PUT sem autenticação
            .requestMatchers(HttpMethod.DELETE, "/profissional/**").permitAll() 

            .requestMatchers(HttpMethod.POST, "/hospital/**").permitAll() 
            .requestMatchers(HttpMethod.GET, "/hospital/**").permitAll() // ✅ Permite GET sem autenticação
            .requestMatchers(HttpMethod.PUT, "/hospital/**").permitAll() // ✅ Permite PUT sem autenticação
            .requestMatchers(HttpMethod.DELETE, "/hospital/**").permitAll() 
            // ✅ Permite DELETE sem autenticação
            .anyRequest().authenticated() // 🔹 Outras rotas precisarão de autenticação
            );

        return http.build();
}
}
