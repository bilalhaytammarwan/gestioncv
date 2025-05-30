package com.marouane.searchservice.repo;


import com.marouane.searchservice.dto.OpportunitySearchResponse;
import com.marouane.searchservice.dto.SimilarOpportunityResponse;

import java.util.List;

public interface SearchRepo {
    List<String> autoCompleteSearchByKeyword(String keyword);
    List<String> SearchByLocation(String location);
    OpportunitySearchResponse findOpportunitiesByKeywordOrLocation(String keyword, String location, int pageSize, int page);
    List<SimilarOpportunityResponse> findSimilarOpportunitiesById(String id, int limit);
}
