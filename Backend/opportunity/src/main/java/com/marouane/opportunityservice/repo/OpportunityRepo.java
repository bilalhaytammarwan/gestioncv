package com.marouane.opportunityservice.repo;

import com.marouane.opportunityservice.model.Opportunity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OpportunityRepo extends MongoRepository<Opportunity, String> {
}
