package com.marouane.opportunityservice.controller;

import com.marouane.opportunityservice.dto.OpportunityDTO;
import com.marouane.opportunityservice.dto.OpportunitySearchResult;
import com.marouane.opportunityservice.mapper.OpportunityMapper;
import com.marouane.opportunityservice.model.Opportunity;
import com.marouane.opportunityservice.service.OpportunityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/opportunity")
@RequiredArgsConstructor
public class OpportunityController {
    private final OpportunityService opportunityService;
    private final OpportunityMapper opportunityMapper;

//    @PreAuthorize("hasAnyRole('CANDIDATE', 'COMPANY', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<Opportunity>> getOpportunities(){
        List<Opportunity> opportunities = opportunityService.getOpportunities();
        return ResponseEntity.ok(opportunities);
    }
//    @PreAuthorize("hasAnyRole('CANDIDATE', 'COMPANY', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<OpportunitySearchResult> getOpportunityById(@PathVariable String id){
        OpportunitySearchResult opportunitySearchResult = opportunityService.getOpportunityById(id);
        return ResponseEntity.ok(opportunitySearchResult);
    }

//    @PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
    @PostMapping
    public ResponseEntity<Opportunity> createOpportunity(@Valid @RequestBody OpportunityDTO opportunityDtoInfo){
        Opportunity opportunityInfo = opportunityMapper.toEntity(opportunityDtoInfo);
        Opportunity opportunity = opportunityService.createOpportunity(opportunityInfo);
        URI location = URI.create("/api/opportunity/" + opportunity.getId());
        return ResponseEntity.created(location).body(opportunity);
    }

//    @PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Opportunity> updateOpportunity(@PathVariable String id, @Valid @RequestBody OpportunityDTO opportunityDtoInfo){
        Opportunity opportunityInfo = opportunityMapper.toEntity(opportunityDtoInfo);
        Opportunity opportunity = opportunityService.updateOpportunity(id, opportunityInfo);
        return ResponseEntity.ok(opportunity);
    }
//    @PreAuthorize("hasAnyRole('COMPANY', 'ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOpportunity(@PathVariable String id){
        opportunityService.deleteOpportunity(id);
        return ResponseEntity.noContent().build();
    }
}