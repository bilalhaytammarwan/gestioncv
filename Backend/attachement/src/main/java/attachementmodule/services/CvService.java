package attachementmodule.services;

import attachementmodule.models.Cv;
import attachementmodule.repositories.CvRepository;
import attachementmodule.types.AttachementType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class CvService {
    @Value("${file.upload-cv-dir}")
    private String uploadDir;
    private static final String validFileType = "pdf";
    private final CvRepository repository;

    @Autowired
    public CvService(CvRepository repository) {
        this.repository = repository;
    }

    public String addCv(MultipartFile file,String userId) throws IOException {
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = file.getOriginalFilename();
        String fileType = file.getContentType().split("/")[1];
        String fileSize = String.valueOf(file.getSize());
        if (fileSize == null || fileSize.isEmpty()) {
            throw new IOException("File size is empty");
        }
        if(!validFileType.equals(fileType)) {
            throw new IOException("File type is not acceptable");
        }
        String newFileName = UUID.randomUUID().toString();
        Path filePath = uploadPath.resolve(newFileName+"."+fileType);
        Cv cv = new Cv();
        cv.setProfil(newFileName+"."+fileType);
        cv.setType(AttachementType.CV);
        cv.setAddedAt(LocalDateTime.now());
        cv.setUserId(userId);
        repository.save(cv);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filePath.toString();
    }

    public Cv getCv(String userId) {
        Cv cv = repository.findById(userId).get();
        if (cv == null) {
            throw new RuntimeException("File not found");
        }
        return cv;
    }
    public void deleteCv(String userId) {
        Cv cv = repository.findById(userId).get();
        if (cv == null) {
            throw new RuntimeException("File not found");
        }
        repository.delete(cv);
    }
    public void updateCv(String userId, MultipartFile file) throws IOException {
        Cv cv = repository.findById(userId).get();
        if (cv == null) {
            throw new RuntimeException("File not found");
        }
        String fileType = file.getContentType().split("/")[1];
        String fileSize = String.valueOf(file.getSize());
        if (fileSize == null || fileSize.isEmpty()) {
            throw new IOException("File size is empty");
        }
        if(!validFileType.equals(fileType)) {
            throw new IOException("File type is not acceptable");
        }
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String newFileName = UUID.randomUUID().toString();
        Path filePath = uploadPath.resolve(newFileName+"."+fileType);
        cv.setProfil(newFileName+"."+fileType);
        cv.setAddedAt(LocalDateTime.now());
        repository.save(cv);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }

    public byte[] getCvByName(String doc) {
        Path filePath = Paths.get(uploadDir).resolve(doc);
        if (!Files.exists(filePath)) {
            throw new RuntimeException("File not found");
        }
        try {
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file: " + e.getMessage());
        }
    }
}
