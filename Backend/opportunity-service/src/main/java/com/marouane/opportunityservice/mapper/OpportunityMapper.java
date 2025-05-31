package com.marouane.opportunityservice.mapper;

import com.marouane.opportunityservice.dto.OpportunityDTO;
import com.marouane.opportunityservice.dto.OpportunitySearchResult;
import com.marouane.opportunityservice.dto.SubOpportunitySearchResult;
import com.marouane.opportunityservice.model.Opportunity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface OpportunityMapper {
    Opportunity toEntity(OpportunityDTO opportunityDTO);
    OpportunityDTO toDto(Opportunity opportunity);
    SubOpportunitySearchResult toDtoSubRes(Opportunity opportunity);
    Opportunity toEntity(SubOpportunitySearchResult subOpportunitySearchResult);
    Opportunity toEntity(OpportunitySearchResult opportunitySearchResult);
//    @Mapping(target = "companyName", ignore = true)
    OpportunitySearchResult toDtoRes(Opportunity opportunity);
}
