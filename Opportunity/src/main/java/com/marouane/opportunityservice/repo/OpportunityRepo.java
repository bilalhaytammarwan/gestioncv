package com.marouane.opportunityservice.repo;

import com.marouane.opportunityservice.dto.OpportunityDTOresponse;
import com.marouane.opportunityservice.model.Opportunity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OpportunityRepo extends MongoRepository<Opportunity, String> {
    Page<Opportunity> findByTitleContainingIgnoreCaseOrStatusContainingIgnoreCase(String search, String search1, Pageable pageable);
}
