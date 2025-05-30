package com.marouane.sendemailservice.feign;

import com.marouane.sendemailservice.dto.OpportunitySearchResultWrapper;
import com.marouane.sendemailservice.dto.UserWrapper;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient("OPPORTUNITY-SERVICE")
public interface OpportunityInterface {
    @GetMapping("/api/opportunity/{id}")
    public ResponseEntity<OpportunitySearchResultWrapper> getOpportunityById(@PathVariable String id);
}
