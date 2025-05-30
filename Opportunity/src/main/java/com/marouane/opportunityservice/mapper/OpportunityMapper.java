package com.marouane.opportunityservice.mapper;

import com.marouane.opportunityservice.dto.OpportunityDTO;
import com.marouane.opportunityservice.dto.OpportunitySearchResult;
import com.marouane.opportunityservice.model.Opportunity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OpportunityMapper {
    Opportunity toEntity(OpportunityDTO opportunityDTO);
    OpportunityDTO toDto(Opportunity opportunity);
    OpportunitySearchResult toDtoRes(Opportunity opportunity);
    Opportunity toEntity(OpportunitySearchResult opportunitySearchResult);
}
