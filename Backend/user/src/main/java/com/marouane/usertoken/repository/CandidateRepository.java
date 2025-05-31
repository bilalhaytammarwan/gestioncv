package com.marouane.usertoken.repository;

import com.marouane.usertoken.model.Candidate;
import com.marouane.usertoken.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CandidateRepository extends MongoRepository<Candidate, String> {

    Page<Candidate> findByRoleAndNomContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(String candidate, String search, String candidate1, String search1, Pageable pageable);

    Page<Candidate> findAllByRole(String candidate, Pageable pageable);
}
