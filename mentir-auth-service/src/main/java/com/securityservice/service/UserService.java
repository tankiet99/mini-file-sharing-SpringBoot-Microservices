package com.securityservice.service;

import com.securityservice.exception.CustomException;
import com.securityservice.feignInterface.UserInterface;
import com.securityservice.model.Auth;
import com.securityservice.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;

@Service
public class UserService {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserInterface userInterface;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    public String signin(String username, String password) {
        try {
            LOG.info(userInterface.findByUsername(username).getUsername());
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            return jwtTokenProvider.createToken(username, userInterface.findByUsername(username).getRoles());
        } catch (AuthenticationException e) {
            throw new CustomException("Invalid username/password supplied", HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    public Auth authToken(String token) {
        return jwtTokenProvider.authToken(token);
    }
}
