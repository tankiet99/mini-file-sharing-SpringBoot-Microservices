package com.security;

import com.model.Auth;
import com.model.Role;
import com.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.server.context.ServerSecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Component
public class SecurityContextRepository implements ServerSecurityContextRepository {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    @Value("${security.jwt.secret:tankiet}")
    private String secret;

    @Autowired
    private AuthService authService;

    @Override
    public Mono<Void> save(ServerWebExchange swe, SecurityContext sc) {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    @Override
    public Mono<SecurityContext> load(ServerWebExchange swe) {
        ServerHttpRequest request = swe.getRequest();
        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String authToken = authHeader.substring(7);
            try {
//                Claims claims = Jwts.parser()
//                        .setSigningKey(Base64.getEncoder().encodeToString(secret.getBytes()))
//                        .parseClaimsJws(auth.getCredentials().toString())
//                        .getBody();
//                String username = claims.getSubject();
//                List<String> rolesMap = claims.get("role", List.class);
//                List<GrantedAuthority> authorities = new ArrayList<>();
//                for (String rolemap : rolesMap) {
//                    authorities.add(new SimpleGrantedAuthority(rolemap));
//                }
                Mono<Auth> authMono = authService.authToken(authToken);
                Mono<Authentication> authentication = authMono.map(auth -> {
                    List<GrantedAuthority> authorities = new ArrayList<>();
                    for (Role rolemap : auth.getRolesMap()) {
                        authorities.add(new SimpleGrantedAuthority(rolemap.name()));
                    }
                    return new UsernamePasswordAuthenticationToken(auth.getUsername(), null,authorities);
                });
                if (authentication == null) throw new Exception();
                return authentication.map(auth -> {
                    return new SecurityContextImpl(auth);
                });
            } catch (Exception e) {
                e.printStackTrace();
                return Mono.empty();
            }

        } else {
            return Mono.empty();
        }
    }

}
