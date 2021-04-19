package com.service.impl;

import com.feignInterface.UserInterface;
import com.model.Comment;
import com.model.File;
import com.repository.FileRepository;
import com.service.FileManager;
import com.service.FileService;
import com.util.FileUtils;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URISyntaxException;
import java.security.GeneralSecurityException;
import java.util.List;
import java.util.Optional;

@Service
public class FileServiceImpl implements FileService {

    private final Logger LOG = LoggerFactory.getLogger(getClass());

    @Autowired
    private FileManager fileManager;

    @Autowired
    private FileRepository fileRepository;

    @Autowired
    private UserInterface userInterface;

    @Override
    public ResponseEntity<List<File>> getAllFiles() {
        return ResponseEntity.ok().body(fileRepository.findAll());
    }

    @Override
    public ResponseEntity<Long> countAllFileUploaded(String username) {
        return ResponseEntity.ok().body(fileRepository.countFileUploaded(username));
    }

    @Override
    public ResponseEntity<List<File>> getFileByUsername(String username, Integer start, Integer end) {
        return ResponseEntity.ok().body(fileRepository.findByUploader(username, start, end - start));
    }

    @Override
    public ResponseEntity<List<File>> searchFile(String name, Integer minSize, Integer maxSize, String category) {
        if (minSize == null && maxSize == null) {
            minSize = 0;
            maxSize = 100;
        }
        if (category == null) {
            category = ".";
        }
        return ResponseEntity.ok().body(fileRepository.searchByFileNameOrUsername(name,
                category,
                FileUtils.convertMegabyteToByte(minSize),
                FileUtils.convertMegabyteToByte(maxSize)));
    }

    @Override
    public ResponseEntity<File> addNewFiles(File file) {
        return ResponseEntity.ok().body(fileRepository.save(file));
    }

    @Override
    public ResponseEntity<?> updateFileById(ObjectId id, File file) {
        file.setId(id.toString());
        return ResponseEntity.ok().body(fileRepository.save(file));
    }

    @Override
    public ResponseEntity<?> deleteFileById(ObjectId fileId, String username) {
        try {
            Optional<File> file = fileRepository.findById(fileId.toString());
            if (file.isPresent()) {
                fileManager.deleteFile(file.get().getDriveFileId());
                fileRepository.delete(file.get());

                // update total uploaded file
                userInterface.updateTotalUploadedFile(username , -file.get().getSize());

                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.badRequest().body("Can not delete file");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    public ResponseEntity<?> addComment(ObjectId id, Comment comment) {
        Optional<File> file = fileRepository.findById(id.toString());

        // File not found
        if (file.isEmpty()) return ResponseEntity.notFound().build();

        file.get().getComments().add(comment);
        return ResponseEntity.ok().body(fileRepository.save(file.get()));
    }

    @Override
    public ResponseEntity<String> uploadFile(MultipartFile file, String category, String username) {
        String fileId = fileManager.uploadFile(file, "root/" + username);
        if (fileId == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

        File file1 = new File();
        file1.setName(file.getOriginalFilename());
        file1.setSize(file.getSize());
        file1.setType(file.getContentType());
        file1.setUploader(username);
        file1.setCategory(FileUtils.convertCategoryToEnum(category));
        file1.setDriveFileId(fileId);
        fileRepository.save(file1);

        // update total uploaded file to user
        userInterface.updateTotalUploadedFile(username, file.getSize());
        return ResponseEntity.ok("Success, FileId: " + fileId);
    }

    @Override
    public ResponseEntity<?> downloadFileById(String id, String username, HttpServletResponse response) {
        try {
            File file = fileRepository.findById(id).get();

            response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");
            response.setHeader("Content-Type", file.getType());
            response.setHeader("Content-Length", file.getSize().toString());
            fileManager.downloadFile(file.getDriveFileId(), response.getOutputStream());
            return ResponseEntity.ok().build();
        } catch (IOException | GeneralSecurityException | URISyntaxException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
