package attachementmodule.controlers;

import attachementmodule.models.Attachement;
import attachementmodule.repositories.AttachementRepository;
import attachementmodule.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/uploads/image")
public class ImageController {

    private final ImageService imageService;
    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping
    public ResponseEntity<String> AddImage(@RequestParam("image") MultipartFile file,@RequestParam("userId") String userId) {
        try {
            // Save the file to the directory
            String filePath = imageService.addImage(file,userId);
            return ResponseEntity.ok("Image uploaded successfully in "+filePath);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity getImage(@RequestParam("userId") String userId) {
        try{
            Attachement image=imageService.getImage(userId);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(image);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/get")
    public String getImageprofil(@RequestParam("userId") String userId) {
        try{
            Attachement image=imageService.getImage(userId);
            return image.getProfil();
        }catch (Exception e){
            return null;
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteImage(@RequestParam("userId") String userId) {
        try{
            imageService.deleteImage(userId);
            return ResponseEntity.ok("Image deleted successfully "+userId);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<String> updateImage(@RequestParam("userId") String userId, @RequestParam("image") MultipartFile file) {
        try{
            imageService.updateImage(userId, file);
            return ResponseEntity.ok("Image updated successfully "+userId);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/{image}")
    public ResponseEntity<byte[]> getImageByName(@PathVariable String image) {
        byte[] imageData = imageService.getImageByName(image);
        return ResponseEntity.ok().contentType(MediaType.ALL).body(imageData);
    }

}
