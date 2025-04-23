package attachementmodule.controlers;


import attachementmodule.services.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads/cv")
public class CvController {

    private final CvService cvService;
    @Autowired
    public CvController(CvService cvService) {
        this.cvService = cvService;
    }
    @PostMapping
    public ResponseEntity<String> AddCv(@RequestParam("cv") MultipartFile file) {
        try {
            // Save the file to the directory
            cvService.addCv(file);
            return ResponseEntity.status(200).body("Document uploaded successfully ");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity<String> getCv(@RequestParam String userId) {
        try{
            cvService.getCv(userId);
            return ResponseEntity.ok("Document uploaded successfully: ");
        }catch (Exception e){
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @DeleteMapping
    public ResponseEntity<String> deleteCv(@RequestParam String userId) {
        try{
            cvService.deleteCv(userId);
            return ResponseEntity.ok("Document deleted successfully: ");
        }catch (Exception e){
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @PutMapping
    public ResponseEntity<String> updateCv(@RequestParam String userId, @RequestParam("cv") MultipartFile file) {
        try{
            cvService.updateCv(userId, file);
            return ResponseEntity.ok("Document updated successfully: ");
        }catch (Exception e){
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
}
