package com.marouane.searchservice.controller;

import com.marouane.searchservice.dto.OpportunitySearchResponse;
import com.marouane.searchservice.dto.Search;
import com.marouane.searchservice.dto.SimilarOpportunityResponse;
import com.marouane.searchservice.dto.SubSearch;
import com.marouane.searchservice.mapper.OpportunityMapper;
import com.marouane.searchservice.service.OpportunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/opportunity")
@RequiredArgsConstructor
public class OpportunityController {
    private final OpportunityService opportunityService;

    @PostMapping("/search")
    public ResponseEntity<OpportunitySearchResponse> searchOpportunity(@RequestBody Search search){
        OpportunitySearchResponse opportunities = opportunityService.findOpportunitiesByKeywordOrLocation(search.getKeyword(), search.getLocation(), search.getPageSize(), search.getPage());
        return ResponseEntity.ok(opportunities);
    }
    @PostMapping("keywordAutocomplete/{keyword}")
    public ResponseEntity<List<String>> autoComplete(@PathVariable String keyword){
        List<String> opportunities = opportunityService.autoCompleteSearchByKeyword(keyword);
        return ResponseEntity.ok(opportunities);
    }
    @PostMapping("locationAutocomplete/{location}")
    public ResponseEntity<List<String>> locationSearch(@PathVariable String location){
        List<String> opportunities = opportunityService.searchByLocation(location);
        return ResponseEntity.ok(opportunities);
    }
    @PostMapping("/search/{id}")
    public ResponseEntity<List<SimilarOpportunityResponse>> searchSimilarOpportunitiesById(@PathVariable String id, @RequestBody SubSearch limit){
        List<SimilarOpportunityResponse> opportunities = opportunityService.findSimilarOpportunitiesById(id, limit.getLimit());
        return ResponseEntity.ok(opportunities);
    }
}
