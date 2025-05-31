package com.marouane.opportunityservice.client;

import com.marouane.opportunityservice.model.Candidate;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "USER-TOKEN", url = "${candidate.service.url}")
public interface CandidateClient {

    @GetMapping
    public ResponseEntity<List<Candidate>> getCandidate();
    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable String id);
    @GetMapping("/opportunity/{opportunityId}")
    public ResponseEntity<List<Candidate>> getCandidateByOpportunityId(@PathVariable String opportunityId);

}
