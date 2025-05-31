package com.marouane.usertoken.service;

import com.marouane.usertoken.model.Candidate;
import com.marouane.usertoken.repository.CandidateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateService {
    public final CandidateRepository candidateRepository;
    public CandidateService(CandidateRepository candidateRepository) {
        this.candidateRepository = candidateRepository;
    }

    public List<Candidate> getCandidateFromOpportunityId(String opportunityId) {
        List<Candidate> candidates = candidateRepository.findAll();

        return candidates.stream()
                .filter(candidate -> candidate.getOpportunityId().contains(opportunityId))
                .toList();
    }
}
