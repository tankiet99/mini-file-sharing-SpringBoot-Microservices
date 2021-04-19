package com.securityservice.controller;

import com.securityservice.feignInterface.UserInterface;
import com.securityservice.model.Auth;
import com.securityservice.model.User;
import com.securityservice.security.JwtTokenProvider;
import com.securityservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserInterface userInterface;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/signin")
    public String login(@RequestBody User user) {
        return userService.signin(user.getUsername(), user.getPassword());
    }

    @GetMapping("/authToken/{token}")
    public Auth authToken(@PathVariable("token") String token) {
        return userService.authToken(token);
    }
}
