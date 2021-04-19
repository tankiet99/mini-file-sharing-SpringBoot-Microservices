package com.model;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class Auth {
    private String username;
    private List<Role> rolesMap;

    public Auth() {
    }

    public Auth(String username, List<Role> rolesMap) {
        this.username = username;
        this.rolesMap = rolesMap;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<Role> getRolesMap() {
        return rolesMap;
    }

    public void setRolesMap(List<Role> rolesMap) {
        this.rolesMap = rolesMap;
    }
}


