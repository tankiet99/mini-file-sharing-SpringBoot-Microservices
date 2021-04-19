package com.controller;

import com.feignInterface.UserInterface;
import com.model.Comment;
import com.model.File;
import com.service.impl.FileServiceImpl;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.repository.FileRepository;
import com.service.FileManager;
import com.util.FileUtils;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/files")
public class FileOperationController {

    @Autowired
    private FileServiceImpl fileService;

    @GetMapping
    public ResponseEntity<List<File>> getAllFiles() {
        return fileService.getAllFiles();
    }

    @GetMapping("/count/{username}")
    public ResponseEntity<Long> countAllFileUploaded(@PathVariable String username) {
        return fileService.countAllFileUploaded(username);
    }

    @GetMapping("/{username}")
    public ResponseEntity<List<File>> getFileByUsername(@PathVariable String username,
                                        @RequestParam("_start") Integer start,
                                        @RequestParam("_end") Integer end) {
        return fileService.getFileByUsername(username, start, end);
    }

    @GetMapping("/search")
    public ResponseEntity<List<File>> searchFile(@RequestParam("name") String name,
                                 @RequestParam(value = "minSize", required = false) Integer minSize,
                                 @RequestParam(value = "maxSize", required = false) Integer maxSize,
                                 @RequestParam(value = "category", required = false) String category) {
        return fileService.searchFile(name, minSize, maxSize, category);
    }

    @PostMapping
    public ResponseEntity<File> addNewFiles(@RequestBody File file) {
        return fileService.addNewFiles(file);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateFileById(@PathVariable("id") ObjectId id, @RequestBody File file) {
        return fileService.updateFileById(id, file);
    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<?> deleteFileById(@PathVariable("id") ObjectId id, @RequestParam("username") String username) {
        return fileService.deleteFileById(id, username);
    }

    @PostMapping("/{id}/comment")
    public ResponseEntity<?> addComment(@PathVariable("id") ObjectId id, @RequestBody Comment comment) {
        return fileService.addComment(id, comment);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file,
                                             @RequestParam("category") String category,
                                             @RequestParam("username") String username) {
        return fileService.uploadFile(file, category, username);
    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downloadFileById(@PathVariable String id, @RequestParam("username") String username, HttpServletResponse response) {
        return fileService.downloadFileById(id, username, response);
    }
}