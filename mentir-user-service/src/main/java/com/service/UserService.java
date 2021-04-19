package com.service;

import com.model.User;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;

import java.util.List;

public interface UserService {
    Mono<ResponseEntity<List<User>>> getAllUsers(Integer start,
                                                 Integer end,
                                                 String order,
                                                 String sort,
                                                 String filter);

    Mono<ResponseEntity<?>> getUserByIdOrUsername(String identify);

    Mono<ResponseEntity<User>> addNewUser(User user);

    Mono<ResponseEntity<User>> updateUserById(ObjectId id, User user);

    Mono<ResponseEntity<?>> deleteUserById(ObjectId id);

    Mono<ResponseEntity<User>> blockUser(String id, User user);

    Mono<ResponseEntity<?>> updateTotalUploadedFile(String username, Long size);

    Mono<ResponseEntity<?>> checkLimitDownloadingQuota(String username, Long size);
}
