package com.repository;

import com.model.User;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface UserRepository extends ReactiveMongoRepository<User, String> {
    Mono<User> findByUsername(String identify);

    @Query(value = "{roles: {$nin: [\"ROLE_ADMIN\"]}}", count = true)
    Mono<Long> countAllUser();

    @Aggregation({"{$match: {$and: [{roles: {$nin: [\"ROLE_ADMIN\"]}}, {$or: [{username: { $regex: ?0, '$options' : 'i' }},{fullName: { $regex: ?0, '$options' : 'i' }}]}]}}",
            "{$skip: ?1}",
            "{$limit: ?2}",
            "{$sort: {?3: ?4}}",
            })
    Flux<User> findAllByCriteria(String filter, Integer skip, Integer limit, String sort, Integer order);
}
