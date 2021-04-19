package com.securityservice.feignInterface;
import com.securityservice.model.User;
//import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;

@FeignClient(value = "userModule", url = "${feign.client.url.userService}")
public interface UserInterface {
    @RequestMapping("/users/{username}")
    public User findByUsername(@PathVariable(value="username") String username);
}