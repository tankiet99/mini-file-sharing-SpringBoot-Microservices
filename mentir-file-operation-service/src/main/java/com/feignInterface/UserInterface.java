package com.feignInterface;


import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(value = "userModule", url = "${feign.client.url.userService}")
public interface UserInterface {

    @PostMapping("/users/updatetotaluploaded")
    String updateTotalUploadedFile(@RequestParam("username") String username, @RequestParam("size") Long size);

}
