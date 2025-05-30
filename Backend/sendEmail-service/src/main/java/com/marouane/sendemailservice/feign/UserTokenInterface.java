package com.marouane.sendemailservice.feign;


import com.marouane.sendemailservice.dto.UserWrapper;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("USER-TOKEN")
public interface UserTokenInterface {
    @GetMapping("/api/user/{id}")
    public ResponseEntity<UserWrapper> getUserById(@PathVariable String id);
}
