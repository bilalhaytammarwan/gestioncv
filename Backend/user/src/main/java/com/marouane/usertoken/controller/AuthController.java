package com.marouane.usertoken.controller;

import com.marouane.usertoken.dto.UserLoginDTO;
import com.marouane.usertoken.model.User;
import com.marouane.usertoken.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5173")
public class AuthController {
    @Autowired
    AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<?> register(HttpServletRequest request, @RequestBody User user) {
        return authService.register(request, user);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate( @RequestBody UserLoginDTO user) {
        return authService.authenticate( user);
    }

}
