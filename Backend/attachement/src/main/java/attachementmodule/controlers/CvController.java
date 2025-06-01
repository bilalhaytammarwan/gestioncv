package attachementmodule.controlers;


import attachementmodule.services.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads/cv")
public class CvController {

    private final CvService cvService;
    public CvController(CvService cvService) {
        this.cvService = cvService;
    }
    @PostMapping
    public ResponseEntity<String> AddCv(@RequestParam("cv") MultipartFile file, @RequestParam("userId") String userId) {
        try {
            // Save the file to the directory
            cvService.addCv(file, userId);
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
    @GetMapping("/get")
    public String getCvprofil(@RequestParam String userId) {
        try{
            cvService.getCv(userId);
            return cvService.getCv(userId).getProfil();
        }catch (Exception e){
            return null;
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
    @GetMapping("/{cv}")
    public ResponseEntity<byte[]> getDocByName(@PathVariable String doc) {
        try {
            byte[] docData = cvService.getCvByName(doc);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(docData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
