package com.service;

import com.model.Comment;
import com.model.File;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

public interface FileService {
    ResponseEntity<List<File>> getAllFiles();

    ResponseEntity<Long> countAllFileUploaded(String username);

    ResponseEntity<List<File>> getFileByUsername(String username, Integer start, Integer end);

    ResponseEntity<List<File>> searchFile(String name, Integer minSize, Integer maxSize, String category);

    ResponseEntity<File> addNewFiles(File file);

    ResponseEntity<?> updateFileById(ObjectId id, File file);

    ResponseEntity<?> deleteFileById(ObjectId fileId, String username);

    ResponseEntity<?> addComment(ObjectId id, Comment comment);

    ResponseEntity<String> uploadFile(MultipartFile file, String category, String username);

    ResponseEntity<?> downloadFileById(String id,String username, HttpServletResponse response);
}
