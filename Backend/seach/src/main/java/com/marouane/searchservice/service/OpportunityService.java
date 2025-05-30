package com.marouane.searchservice.service;

import com.marouane.searchservice.dto.OpportunitySearchResponse;
import com.marouane.searchservice.dto.OpportunitySearchResult;
import com.marouane.searchservice.dto.SimilarOpportunityResponse;
import com.marouane.searchservice.exception.PathVarException;
import com.marouane.searchservice.exception.opportunity.OpportunitySearchException;
import com.marouane.searchservice.feign.UserTokenInterface;
import com.marouane.searchservice.repo.SearchRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpportunityService {

    private final SearchRepo searchRepo;
    private final UserTokenInterface userTokenInterface;

    public OpportunitySearchResponse findOpportunitiesByKeywordOrLocation(String keyword, String location, int pageSize, int page) {
        if (keyword == null) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Keyword cannot be empty");
        } else if(location == null){
            throw new PathVarException(HttpStatus.BAD_REQUEST, "location cannot be empty");
        }
        try {
            OpportunitySearchResponse opportunitySearchResponse = searchRepo.findOpportunitiesByKeywordOrLocation(keyword, location, pageSize, page);
            List<OpportunitySearchResult> opportunitySearchResults = opportunitySearchResponse.getOpportunitySearchResults();
            for(OpportunitySearchResult opportunitySearchResult : opportunitySearchResults){
                opportunitySearchResult.setCompanyName(Objects.requireNonNull(userTokenInterface.getUserById(opportunitySearchResult.getCompanyId()).getBody()).getNom());
            }
            return opportunitySearchResponse;
        } catch (HttpClientErrorException | NullPointerException e){
            log.error("Error while fetching company names", e);
            throw new OpportunitySearchException(HttpStatus.BAD_REQUEST, "Invalid keyword and Location: " + keyword);
        }
    }
    public List<String> autoCompleteSearchByKeyword(String keyword){
        if (keyword == null || keyword.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Keyword cannot be empty");
        }
        try {
            return searchRepo.autoCompleteSearchByKeyword(keyword);
        } catch (Exception e){
            throw new OpportunitySearchException(HttpStatus.BAD_REQUEST, "Invalid keyword: " + keyword);
        }
    }

    public List<String> searchByLocation(String location) {
        if (location == null || location.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "location cannot be empty");
        }
        try {
            return searchRepo.SearchByLocation(location);
        } catch (Exception e){
            throw new OpportunitySearchException(HttpStatus.BAD_REQUEST, "Invalid location: " + location);
        }
    }

    public List<SimilarOpportunityResponse> findSimilarOpportunitiesById(String id, int limit) {
        if (id == null) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "id cannot be empty");
        }
        try {
            List<SimilarOpportunityResponse> similarOpportunityResponses = searchRepo.findSimilarOpportunitiesById(id, limit);
            for(SimilarOpportunityResponse similarOpportunityResponse : similarOpportunityResponses){
                similarOpportunityResponse.setCompanyName(Objects.requireNonNull(userTokenInterface.getUserById(similarOpportunityResponse.getCompanyId()).getBody()).getNom());
            }
            return similarOpportunityResponses;
        } catch (Exception e){
            throw new OpportunitySearchException(HttpStatus.BAD_REQUEST, "Invalid keyword id: " + id);
        }
    }
}