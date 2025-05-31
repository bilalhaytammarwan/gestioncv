package com.marouane.opportunityservice.service;

import com.marouane.opportunityservice.dto.OpportunityDTOpagination;
import com.marouane.opportunityservice.dto.OpportunityDTOresponse;
import com.marouane.opportunityservice.feign.CandidateClient;
import com.marouane.opportunityservice.dto.OpportunitySearchResult;
import com.marouane.opportunityservice.exception.PathVarException;
import com.marouane.opportunityservice.exception.opportunity.*;
import com.marouane.opportunityservice.model.Candidate;

import com.marouane.opportunityservice.mapper.OpportunityMapper;
import com.marouane.opportunityservice.model.Opportunity;
import com.marouane.opportunityservice.repo.OpportunityRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpportunityService {

    private final OpportunityRepo opportunityRepo;
    private final OpportunityMapper opportunityMapper;

    private final CategoryService categoryService;


    private final CandidateClient candidateClient;
    public List<Opportunity> getOpportunities() {
        try{
            return opportunityRepo.findAll();
        } catch (Exception e){
            throw new OpportunityGetException(HttpStatus.NOT_FOUND, "No Opportunity found");
        }
    }
    public OpportunityDTOpagination getPaginatedOpportunitiesByCompanies(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<Opportunity> opportunityPage;

        if (search != null && !search.isEmpty()) {
            opportunityPage = opportunityRepo.findByTitleContainingIgnoreCaseOrStatusContainingIgnoreCase(search, search, pageable);
        } else {
            opportunityPage = opportunityRepo.findAll(pageable);
        }

        List<OpportunityDTOresponse> dtoList = opportunityPage
                .getContent()
                .stream()
                .map(e->{
                    String name=candidateClient.getUserById(e.getCompanyId()).getBody().getNom();
                    String categoryname=categoryService.getCategoryById(e.getCategoryId()).getName();
                    OpportunityDTOresponse dto = new OpportunityDTOresponse(
                            e.getId(),
                            e.getCompanyId(),
                            name,
                            e.getTitle(),
                            e.getDescription(),
                            e.getCategoryId(),
                            categoryname, // categoryName (populate if you have category info)
                            e.getCreatedAt(),
                            e.getUpdatedAt(),
                            e.getJobType(),
                            e.getSalary(),
                            e.getJobLocation(),
                            e.getStatus(),
                            e.getApplicationDeadline(),
                            e.isRemote(),
                            e.getRequirements(),
                            e.getResponsibilities(),
                            e.getBenefits(),
                            e.getYearsOfExperience(),
                            e.getTags(),
                            e.getUrl()

                    );

                    return dto;
                })
                .collect(Collectors.toList());

        return new OpportunityDTOpagination(dtoList, opportunityPage.getTotalPages());
    }
    public Opportunity getPureOpportunityById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Opportunity ID cannot be empty");
        }
        return opportunityRepo.findById(id)
                .orElseThrow(() -> new OpportunityGetException(HttpStatus.NOT_FOUND, "Opportunity not found"));
    }
    public OpportunitySearchResult getOpportunityById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Opportunity ID cannot be empty");
        }
        Opportunity opportunity = opportunityRepo.findById(id)
                .orElseThrow(() -> new OpportunityGetException(HttpStatus.NOT_FOUND, "Opportunity not found"));
        OpportunitySearchResult opportunitySearchResult = opportunityMapper.toDtoRes(opportunity);
        log.info("Company name created with ID: {}", Objects.requireNonNull(candidateClient.getUserById(opportunity.getCompanyId()).getBody()).getNom());
        opportunitySearchResult.setCompanyName(Objects.requireNonNull(candidateClient.getUserById(opportunitySearchResult.getCompanyId()).getBody()).getNom());
        opportunitySearchResult.setCategoryName(categoryService.getCategoryById(opportunity.getCategoryId()).getName());
        return opportunitySearchResult;
    }
    public OpportunityDTOresponse getop(String  id) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Opportunity ID cannot be empty");
        }
        Opportunity e= getPureOpportunityById(id);
        String name = candidateClient.getUserById(e.getCompanyId()).getBody().getNom();
        String categoryName = categoryService.getCategoryById(e.getCategoryId()).getName();
        OpportunityDTOresponse dto = new OpportunityDTOresponse(
                e.getId(),
                e.getCompanyId(),
                name,
                e.getTitle(),
                e.getDescription(),
                e.getCategoryId(),
                categoryName, // categoryName (populate if you have category info)
                e.getCreatedAt(),
                e.getUpdatedAt(),
                e.getJobType(),
                e.getSalary(),
                e.getJobLocation(),
                e.getStatus(),
                e.getApplicationDeadline(),
                e.isRemote(),
                e.getRequirements(),
                e.getResponsibilities(),
                e.getBenefits(),
                e.getYearsOfExperience(),
                e.getTags(),
                e.getUrl()
        );




        return dto;
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
            OpportunitySearchResult opportunityChecked = getOpportunityById(id);
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
            OpportunitySearchResult opportunity = getOpportunityById(id);
            opportunityRepo.deleteById(opportunity.getId());
            log.info("Opportunity deleted with ID: {}", opportunity.getId());
        } catch (Exception e) {
            log.error("Error deleting opportunity: {}", e.getMessage());
            throw new OpportunityDeleteException("Failed to delete opportunity");
        }
    }

    public List<Candidate> getOpportunityCandidates(String opportunityId){
        Opportunity opportunity = getPureOpportunityById(opportunityId);
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
        Opportunity opportunity = getPureOpportunityById(opportunityId);
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