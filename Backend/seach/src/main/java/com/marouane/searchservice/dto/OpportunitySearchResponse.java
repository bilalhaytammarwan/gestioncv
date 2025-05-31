package com.marouane.searchservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpportunitySearchResponse {
    private List<OpportunitySearchResult> opportunitySearchResults;
    private long total;
}
