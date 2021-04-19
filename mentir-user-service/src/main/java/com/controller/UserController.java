package com.controller;

import com.model.User;
import com.repository.UserRepository;
import com.service.impl.UserServiceImpl;
import com.utils.UserUtils;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Calendar;
import java.util.Date;
import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService;


    @GetMapping
    public Mono<ResponseEntity<List<User>>> getAllUsers(@RequestParam("_start") Integer start,
                                                        @RequestParam("_end") Integer end,
                                                        @RequestParam("_order") String order,
                                                        @RequestParam("_sort") String sort,
                                                        @RequestParam(value = "q", required = false) String filter) {
        return userService.getAllUsers(start, end, order, sort, filter);
    }

    @GetMapping("/{identify}")
    public Mono<ResponseEntity<?>> getUserByIdOrUsername(@PathVariable String identify) {
        return userService.getUserByIdOrUsername(identify);
    }

    @PostMapping
    public Mono<ResponseEntity<User>> addNewUser(@RequestBody User user) {
        return userService.addNewUser(user);
    }


    @PutMapping("/{id}")
    public Mono<ResponseEntity<User>> updateUserById(@PathVariable("id") ObjectId id, @RequestBody User user) {
        return userService.updateUserById(id, user);
    }

    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<?>> deleteUserById(@PathVariable("id") ObjectId id) {
        return userService.deleteUserById(id);
    }

    @PostMapping("/{id}/block")
    public Mono<ResponseEntity<User>> blockUser(@PathVariable("id") String id, @RequestBody User user) {
        return userService.blockUser(id, user);
    }

    @PostMapping("/updatetotaluploaded")
    public Mono<ResponseEntity<?>> updateTotalUploadedFile(@RequestParam("username") String username, @RequestParam("size") Long size) {
        return userService.updateTotalUploadedFile(username, size);
    }

    @PostMapping("/checklimitdownload")
    public Mono<ResponseEntity<?>> checkLimitDownloadingQuota(@RequestParam("username") String username, @RequestParam Long size) {
        return userService.checkLimitDownloadingQuota(username, size);
    }
}