package attachementmodule.services;

import attachementmodule.models.Attachement;
import attachementmodule.repositories.AttachementRepository;
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
public class DocService {
    @Value("${file.upload-docs-dir}")
    private String uploadDir;
    private static final String validFileTypes = "pdf";
    private final AttachementRepository repository;

    @Autowired
    public DocService(AttachementRepository repository) {
        this.repository = repository;
    }
    public String addDoc(MultipartFile file,String userId) throws IOException {
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
        if(!validFileTypes.equals(fileType)) {
            throw new IOException("File type is not acceptable");
        }
        String newFileName = UUID.randomUUID().toString();
        Path filePath = uploadPath.resolve(newFileName +"."+fileType);
        Attachement attachement = new Attachement();
        attachement.setProfil(newFileName +"."+fileType);
        attachement.setType(AttachementType.LEGAL_DOCUMENT);
        attachement.setAddedAt(LocalDateTime.now());
        attachement.setUserId(userId);
        repository.save(attachement);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filePath.toString();
    }
    public Attachement getDoc(String userId) {
        Attachement attachement = repository.findByTypeAndUserId(AttachementType.LEGAL_DOCUMENT, userId).get();
        if (attachement == null) {
            throw new RuntimeException("File not found");
        }
        return attachement;
    }

    public void deleteDoc(String userId) {
        Attachement attachement = repository.findByTypeAndUserId(AttachementType.LEGAL_DOCUMENT, userId).get();
        if (attachement == null) {
            throw new RuntimeException("File not found");
        }
        repository.delete(attachement);
    }
    public void updateDoc(String userId, MultipartFile file) throws IOException {
        Attachement attachement = repository.findByTypeAndUserId(AttachementType.LEGAL_DOCUMENT, userId).get();
        if (attachement == null) {
            throw new RuntimeException("File not found");
        }
        String fileType = file.getContentType().split("/")[1];
        String fileSize = String.valueOf(file.getSize());
        if (fileSize == null || fileSize.isEmpty()) {
            throw new IOException("File size is empty");
        }
        if(!validFileTypes.equals(fileType)) {
            throw new IOException("File type is not acceptable");
        }
        Path uploadPath = Paths.get(uploadDir);
        String fileName = UUID.randomUUID().toString();
        Path filePath = uploadPath.resolve(fileName +"."+fileType);
        attachement.setProfil(fileName +"."+fileType);
        attachement.setAddedAt(LocalDateTime.now());
        repository.save(attachement);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    }

    public byte[] getDocByName(String doc) {
        Path filePath = Paths.get(uploadDir).resolve(doc);
        try {
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file: " + e.getMessage());
        }
    }
}
