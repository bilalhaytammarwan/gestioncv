package com.marouane.searchservice.mapper;

import com.marouane.searchservice.dto.OpportunitySearchResult;
import com.marouane.searchservice.model.Opportunity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OpportunityMapper {
    OpportunitySearchResult toDtoRes(Opportunity opportunity);
    Opportunity toEntity(OpportunitySearchResult opportunitySearchResult);
}
