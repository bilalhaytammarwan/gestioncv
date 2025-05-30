package com.marouane.opportunityservice.feign;

import com.marouane.opportunityservice.dto.CompanyWrapper;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("USER-TOKEN")
public interface UserTokenInterface {
    @GetMapping("/api/user/{id}")
    public ResponseEntity<CompanyWrapper> getUserById(@PathVariable String id);
}
