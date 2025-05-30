package com.marouane.opportunityservice.service;

import com.marouane.opportunityservice.client.CandidateClient;
import com.marouane.opportunityservice.dto.OpportunitySearchResult;
import com.marouane.opportunityservice.exception.PathVarException;
import com.marouane.opportunityservice.exception.opportunity.*;
import com.marouane.opportunityservice.model.Candidate;
import com.marouane.opportunityservice.model.Opportunity;
import com.marouane.opportunityservice.repo.OpportunityRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpportunityService {

    private final OpportunityRepo opportunityRepo;
    private final CandidateClient candidateClient;
    public List<Opportunity> getOpportunities() {
        try{
            return opportunityRepo.findAll();
        } catch (Exception e){
            throw new OpportunityGetException(HttpStatus.NOT_FOUND, "No Opportunity found");
        }
    }

    public Opportunity getOpportunityById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Opportunity ID cannot be empty");
        }
        return opportunityRepo.findById(id)
                .orElseThrow(() -> new OpportunityGetException(HttpStatus.NOT_FOUND, "Opportunity not found"));
    }

    public Opportunity createOpportunity(Opportunity opportunityInfo) {
        try {
           Opportunity opportunityOutput = opportunityRepo.save(opportunityInfo);
            log.info("Opportunity created with ID: {}", opportunityOutput.getId());
            return opportunityOutput;
        } catch (Exception e) {
            log.error("Error creating opportunity: {}", e.getMessage());
            throw new OpportunityCreationException("Failed to create opportunity");
        }
    }
    public Opportunity updateOpportunity(String id, Opportunity opportunityInfo) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Opportunity ID cannot be empty");
        }
        try {
            Opportunity opportunityChecked = getOpportunityById(id);
            opportunityInfo.setId(opportunityChecked.getId());
            Opportunity opportunityOutput = opportunityRepo.save(opportunityInfo);
            log.info("Opportunity updated with ID: {}", opportunityOutput.getId());
            return opportunityOutput;
        } catch (Exception e) {
            log.error("Error updating opportunity: {}", e.getMessage());
            throw new OpportunityUpdateException("Failed to update opportunity");
        }
    }

    public void deleteOpportunity(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Opportunity ID cannot be empty");
        }
        try{
            Opportunity opportunity = getOpportunityById(id);
            opportunityRepo.deleteById(opportunity.getId());
            log.info("Opportunity deleted with ID: {}", opportunity.getId());
        } catch (Exception e) {
            log.error("Error deleting opportunity: {}", e.getMessage());
            throw new OpportunityDeleteException("Failed to delete opportunity");
        }
    }

    public List<Candidate> getOpportunityCandidates(String opportunityId){
        Opportunity opportunity = getOpportunityById(opportunityId);
        if (opportunity == null) {
            throw new OpportunityGetException(HttpStatus.NOT_FOUND, "Opportunity not found");
        }
        List<Candidate> candidates = new ArrayList<>();
        for (String CamId : opportunity.getCandidatesIds()) {
            Candidate candidate = candidateClient.getCandidateById(CamId).getBody();
            if (candidate != null) {
                candidates.add(candidate);
            } else {
                log.error("Candidate with ID {} not found", CamId);
            }

        }
        return candidates;
    }


    public boolean subscribeToOpportunity(String opportunityId, String candidateId) {
        if(opportunityId == null || candidateId == null) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Opportunity ID cannot be empty");
        }
        Opportunity opportunity = getOpportunityById(opportunityId);
        if(opportunity.getCandidatesIds()==null){
            opportunity.setCandidatesIds(new ArrayList<>());
            opportunity.getCandidatesIds().add(candidateId);
        }else{
            opportunity.getCandidatesIds().add(candidateId);
        }
        opportunityRepo.save(opportunity);
        return true;
    }
}