package com.marouane.usertoken.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@FeignClient(name = "attachement-service",url = "http://localhost:8082/api/uploads")
public interface Attachementservice {
    @GetMapping("/image/getimage")
    String getImagebyid(@RequestParam("userId")String userid );
    @GetMapping("/cv/get")
    String getCvbyid(@RequestParam("userId")String userid );
    @GetMapping("/doc/get")
    String getDocbyid(@RequestParam("userId")String userid );
    @DeleteMapping("/cv")
   boolean deleteCv(@RequestParam("userId")String userid );
    @DeleteMapping("/image")
    boolean deleteImage(@RequestParam("userId")String userid );
}
