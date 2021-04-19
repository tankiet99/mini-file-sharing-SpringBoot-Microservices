package com.service.impl;

import com.model.User;
import com.repository.UserRepository;
import com.service.UserService;
import com.utils.UserUtils;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    @Autowired
    private UserRepository userRepository;

    @Override
    public Mono<ResponseEntity<List<User>>> getAllUsers(Integer start, Integer end, String order, String sort, String filter) {
        String filterNormalized = filter == null ? "." : filter;
        Integer limit = end - start;
        Integer orderNormalized = "DESC".equals(order) ? -1 : 1;

        return userRepository.findAllByCriteria(filterNormalized, start, limit, sort, orderNormalized)
                .collectList()
                .map(list -> ResponseEntity.ok()
                        .header("Access-Control-Expose-Headers", "X-Total-Count")
                        .header("X-Total-Count", String.valueOf(list.size()))
                        .body(list));
    }

    @Override
    public Mono<ResponseEntity<?>> getUserByIdOrUsername(String identify) {
        Mono<User> user = userRepository.findByUsername(identify)
                .switchIfEmpty(userRepository.findById(identify));

        return user.map(user1 -> {
            if (user1 == null || user1.getIsBlock() == 1) return ResponseEntity.notFound().build();
            return ResponseEntity.ok().body(user1);
        });
    }

    @Override
    public Mono<ResponseEntity<User>> addNewUser(User user) {
        // hash password use Bcrypt
        user.setPassword(new BCryptPasswordEncoder(12).encode(user.getPassword()));

        return userRepository.findByUsername(user.getUsername())
                .map(existUser -> ResponseEntity.badRequest().body(user))
                .switchIfEmpty(userRepository.save(user)
                        .map(u -> ResponseEntity.ok().body(u)));
    }

    @Override
    public Mono<ResponseEntity<User>> updateUserById(ObjectId id, User user) {
        user.setId(id.toString());
        return userRepository.save(user)
                .map(u -> ResponseEntity.ok().body(u));
    }

    @Override
    public Mono<ResponseEntity<?>> deleteUserById(ObjectId id) {
        return Mono.just(ResponseEntity.ok().body(userRepository.deleteById(id.toString())));
    }

    @Override
    public Mono<ResponseEntity<User>> blockUser(String id, User user) {
        user.setId(id);
        return userRepository.save(user)
                .map(u -> ResponseEntity.ok().body(u));
    }

    @Override
    public Mono<ResponseEntity<?>> updateTotalUploadedFile(String username, Long size) {
        return userRepository.findByUsername(username)
                .map(user -> {
                    user.setTotalUploadedFileSize(user.getTotalUploadedFileSize() + size);
                    if (user.getTotalUploadedFileSize() >= UserUtils.getTotalUploadedFileCorrespondLevel(UserUtils.returnNextLevel(user.getLevel()))) {
                        user.setLevel(UserUtils.returnNextLevel(user.getLevel()));
                    } else if (user.getTotalUploadedFileSize() <
                            UserUtils.getTotalUploadedFileCorrespondLevel(
                                    user.getLevel())) {
                        user.setLevel(UserUtils.returnPreviousLevel(user.getLevel()));
                    }
                    return ResponseEntity.ok()
                            .body(userRepository.save(user));
                });
    }

    @Override
    public Mono<ResponseEntity<?>> checkLimitDownloadingQuota(String username, Long size) {
        return userRepository.findByUsername(username)
                .map(u -> {
                    Calendar currentDate = Calendar.getInstance();
                    Calendar resetDate = Calendar.getInstance();
                    currentDate.setTime(new Date());
                    resetDate.setTime(u.getResetDate());
                    boolean sameDate = currentDate.get(Calendar.DAY_OF_YEAR) == resetDate.get(Calendar.DAY_OF_YEAR) &&
                            currentDate.get(Calendar.YEAR) == resetDate.get(Calendar.YEAR);

                    if (!sameDate) {
                        u.setResetDate(currentDate.getTime());
                        u.setDailyDownloadingQuota(0L);
                    } else {
                        if (u.getDailyDownloadingQuota() + size > UserUtils.getDailyDownloadingQuota(u.getLevel())) {
                            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                    .body("You have reached limit downloading today.");
                        }
                    }

                    u.setDailyDownloadingQuota(u.getDailyDownloadingQuota() + size);
                    return ResponseEntity.ok().body(userRepository.save(u));
                });
    }
}
