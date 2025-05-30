package com.marouane.opportunityservice.service;

import com.marouane.opportunityservice.model.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "User-Token",url = "http://localhost:8228/api/user")
public interface UserService {
@GetMapping("/{id}")
 ResponseEntity<User> getUserById(@PathVariable String id);
}
