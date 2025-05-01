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
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {
    @Value("${file.upload-image-dir}")
    private String uploadDir;
    private static final List<String> acceptableImageTypes = List.of("jpeg", "jpg", "png");
    private final AttachementRepository repository;

    @Autowired
    public ImageService(AttachementRepository repository) {
        this.repository = repository;
    }
    public String addImage(MultipartFile file,String userId) throws IOException {
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
        if(!acceptableImageTypes.contains(fileType)) {
            throw new IOException("File type is not acceptable");
        }
        String newFileName = UUID.randomUUID().toString();
        Path filePath = uploadPath.resolve(newFileName+"."+fileType);
        Attachement attachement = new Attachement();
        attachement.setProfil(newFileName);
        attachement.setType(AttachementType.IMAGE);
        attachement.setUserId(userId);
        attachement.setAddedAt(LocalDateTime.now());
        repository.save(attachement);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return filePath.toString();
    }

    public Attachement getImage(String userId) {
        Attachement attachement = repository.findByTypeAndUserId(AttachementType.IMAGE, userId).get();
        if (attachement == null) {
            return null;
        }
        return attachement;
    }

    public void deleteImage(String userId) {
        Attachement attachement = repository.findByTypeAndUserId(AttachementType.IMAGE, userId).get();
        if (attachement != null) {
            repository.delete(attachement);
        }
    }
    public void updateImage(String userId, MultipartFile file) throws IOException {
        Attachement attachement = repository.findByTypeAndUserId(AttachementType.IMAGE, userId).get();
        if (attachement != null) {
            String fileName = file.getOriginalFilename();
            String fileType = file.getContentType().split("/")[1];
            String fileSize = String.valueOf(file.getSize());
            if (fileSize == null || fileSize.isEmpty()) {
                throw new IOException("File size is empty");
            }
            if(!acceptableImageTypes.contains(fileType)) {
                throw new IOException("File type is not acceptable");
            }
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(UUID.randomUUID()+"."+fileType);
            attachement.setProfil(fileName);
            attachement.setType(AttachementType.IMAGE);
            attachement.setAddedAt(LocalDateTime.now());
            repository.save(attachement);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        }
    }



}
