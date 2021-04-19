package com.repository;

import com.model.Comment;
import com.model.File;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends MongoRepository<File, String> {

    @Query(value = "{uploader: ?0}", count = true)
    Long countFileUploaded(String username);

    @Aggregation({"{$match: {uploader: ?0}}",
    "{$skip: ?1}",
    "{$limit: ?2}"})
    List<File> findByUploader(String username, Integer skip, Integer limit);

    @Query("{ '$or' : [ {uploader: { $regex: ?0 }}, {name: { $regex: ?0 }} ], " +
            "category: { $regex: ?1 }, " +
            "$and: [{size: { $gt: ?2}}, {size: { $lt: ?3 }}]}")
    List<File> searchByFileNameOrUsername(String nameRegex, String category, Long minSize, Long maxSize);

}
