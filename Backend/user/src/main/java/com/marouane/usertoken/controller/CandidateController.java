package com.marouane.usertoken.controller;

import com.marouane.usertoken.model.Candidate;
import com.marouane.usertoken.repository.CandidateRepository;
import com.marouane.usertoken.service.CandidateService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidate")
@RequiredArgsConstructor
public class CandidateController {

    private final CandidateRepository candidateRepository;
    private final CandidateService candidateService;

    @GetMapping
    public ResponseEntity<List<Candidate>> getCandidate() {

        return ResponseEntity.ok(candidateRepository.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Candidate> getCandidateById(@PathVariable String id) {
        return ResponseEntity.ok().body(candidateRepository.findById(id).orElse(null));
    }
    @GetMapping("/opportunity/{opportunityId}")
    public ResponseEntity<List<Candidate>> getCandidateByOpportunityId(@PathVariable String opportunityId) {
        return ResponseEntity.ok(candidateService.getCandidateFromOpportunityId(opportunityId));
    }
    //for testing
    @PostMapping
    public ResponseEntity<Candidate> createCandidate(@RequestBody Candidate candidate) {
        Candidate createdCandidate = candidateRepository.save(candidate);
        return ResponseEntity.ok(createdCandidate);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCandidate(@PathVariable String id) {
        candidateRepository.deleteById(id);
        return ResponseEntity.ok("Candidate deleted successfully");
    }
}
