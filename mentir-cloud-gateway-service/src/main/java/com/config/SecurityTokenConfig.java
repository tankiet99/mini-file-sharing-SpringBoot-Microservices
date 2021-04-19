package com.config;

import com.security.SecurityContextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@Configuration
@EnableWebFluxSecurity
public class SecurityTokenConfig {

    @Autowired
    private SecurityContextRepository securityContextRepository;

    @Bean
    protected SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) throws Exception {
        return http
                    .exceptionHandling()
                    .authenticationEntryPoint((swe, e) -> {
                        return Mono.fromRunnable(() -> {
                            swe.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                        });
                    })
                    .accessDeniedHandler((swe, e) -> {
                        return Mono.fromRunnable(() -> {
                            swe.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
                        });
                    })
                    .and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .securityContextRepository(securityContextRepository)
                    .authorizeExchange()
                    .pathMatchers(HttpMethod.OPTIONS).permitAll()
                    .pathMatchers("/auth/**").permitAll()
                    .pathMatchers("/files/download/**").permitAll()
                    .pathMatchers(HttpMethod.POST, "/users").permitAll()
                    .pathMatchers("/files/search").permitAll()
                    .pathMatchers("/users/{id}/block").hasRole("ADMIN")
                    .pathMatchers(HttpMethod.PUT, "/users/{id}").hasRole("ADMIN")
                    .pathMatchers(HttpMethod.GET, "/users").hasRole("ADMIN")
                    .anyExchange().authenticated()
                    .and().build();
    }

    @Bean
    CorsConfigurationSource corsConfiguration() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.applyPermitDefaultValues();
        corsConfig.addAllowedMethod(HttpMethod.PUT);
        corsConfig.addAllowedMethod(HttpMethod.DELETE);
        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://mentir-react-template.vercel.app"));

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }
}
