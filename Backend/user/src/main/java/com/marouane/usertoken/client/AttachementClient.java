package com.marouane.usertoken.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@FeignClient("attachement-service")
public interface AttachementClient {
    //doc controllers
    @PostMapping("/api/uploads/doc")
    public ResponseEntity<String> AddDoc(@RequestParam("doc") MultipartFile file, @RequestParam("userId") String userId);
    @GetMapping("/api/uploads/doc")
    public ResponseEntity getDoc(@RequestParam("userId") String userId) ;
    @DeleteMapping("/api/uploads/doc")
    public ResponseEntity<String> deleteDoc(@RequestParam("userId") String userId);

    @PutMapping("/api/uploads/doc")
    public ResponseEntity<String> updateDoc(@RequestParam("userId") String userId, @RequestParam("image") MultipartFile file);
    //image controlles
    @GetMapping("/api/uploads/image")
    public ResponseEntity getImage(@RequestParam("userId") String userId);
    @PostMapping("/api/uploads/image")
    public ResponseEntity<String> AddImage(@RequestParam("image") MultipartFile file,@RequestParam("userId") String userId);
    @DeleteMapping
    public ResponseEntity<String> deleteImage(@RequestParam("userId") String userId) ;
    @PutMapping
    public ResponseEntity<String> updateImage(@RequestParam("userId") String userId, @RequestParam("image") MultipartFile file) ;
    //Cv controlles
    @PostMapping("/api/uploads/cv")
    public ResponseEntity<String> AddCv(@RequestParam("cv") MultipartFile file, @RequestParam("userId") String userId);
    @GetMapping("/api/uploads/cv")
    public ResponseEntity<String> getCv(@RequestParam String userId);
    @DeleteMapping("/api/uploads/cv")
    public ResponseEntity<String> deleteCv(@RequestParam String userId) ;
    @PutMapping("/api/uploads/cv")
    public ResponseEntity<String> updateCv(@RequestParam String userId, @RequestParam("cv") MultipartFile file);
}
