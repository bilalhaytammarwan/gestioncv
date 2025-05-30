package com.marouane.usertoken.repository;

import com.marouane.usertoken.model.Candidate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CandidateRepository extends MongoRepository<Candidate, String> {
    // Custom query methods can be defined here if needed
    // For example, find by opportunity ID or any other criteria
}
