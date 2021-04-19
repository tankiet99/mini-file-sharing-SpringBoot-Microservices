package com.service;

import com.model.Auth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class AuthService {

    @Autowired
    WebClient webClient;

    public Mono<Auth> authToken(String token) {
        return webClient.get()
                .uri("/auth/authToken/" + token)
                .retrieve()
                .bodyToMono(Auth.class);
    }
}
