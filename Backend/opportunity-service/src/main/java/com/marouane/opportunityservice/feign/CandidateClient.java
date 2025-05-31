package com.marouane.opportunityservice.feign;

import com.marouane.opportunityservice.dto.CompanyWrapper;
import com.marouane.opportunityservice.model.Candidate;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "USER-TOKEN", url = "http://localhost:8228/api")
public interface CandidateClient {
    @GetMapping("/user/{id}")
    ResponseEntity<CompanyWrapper> getUserById(@PathVariable String id);

    @GetMapping("/candidate")
    public ResponseEntity<List<Candidate>> getCandidate();
    @GetMapping("/candidate/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable String id);
    @GetMapping("/candidate/opportunity/{opportunityId}")
    public ResponseEntity<List<Candidate>> getCandidateByOpportunityId(@PathVariable String opportunityId);

}
