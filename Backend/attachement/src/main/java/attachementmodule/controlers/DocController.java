package attachementmodule.controlers;

import attachementmodule.models.Attachement;
import attachementmodule.services.DocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads/doc")
public class DocController {

    private final DocService docService;

    @Autowired
    public DocController(DocService imageService) {
        this.docService = imageService;
    }
    @PostMapping
    public ResponseEntity<String> AddDoc(@RequestParam("doc") MultipartFile file, @RequestParam("userId") String userId) {
        try {
            docService.addDoc(file, userId);
            return ResponseEntity.ok("Document uploaded successfully ");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @GetMapping
    public ResponseEntity getDoc(@RequestParam("userId") String userId) {
        try{

            Attachement doc = docService.getDoc(userId);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(doc);
        }catch (Exception e){
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @GetMapping("/get")
    public String getDocprofil(@RequestParam("userId") String userId) {
        try{

            Attachement doc = docService.getDoc(userId);
            return doc.getProfil();
        }catch (Exception e){
            return null;
        }
    }
    @DeleteMapping
    public ResponseEntity<String> deleteDoc(@RequestParam("userId") String userId) {
        try{
            docService.deleteDoc(userId);
            return ResponseEntity.ok("Document deleted successfully ");
        }catch (Exception e){
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity<String> updateDoc(@RequestParam("userId") String userId, @RequestParam("image") MultipartFile file) {
        try{
            docService.updateDoc(userId, file);
            return ResponseEntity.ok("Document updated successfully ");
        }catch (Exception e){
            return ResponseEntity.status(500).body(e.getMessage());
        }
    }
    @GetMapping("/{doc}")
    public ResponseEntity<byte[]> getDocByName(@PathVariable String doc) {
        try {
            byte[] docData = docService.getDocByName(doc);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(docData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
