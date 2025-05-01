package com.gestioncv.annonce.service;

import com.gestioncv.annonce.entity.Annonce;
import com.gestioncv.annonce.entity.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;

import java.util.List;

@FeignClient(name="user-service",url = "${application.url.user-url}")
public interface Userservice {
    @GetMapping("/api/user")
    public List<User> getAllUsers();
    @PutMapping("/update/notification")
    public void updateNotification(@RequestPart("annonce") Annonce annonce, @RequestPart("user") User user);
}
