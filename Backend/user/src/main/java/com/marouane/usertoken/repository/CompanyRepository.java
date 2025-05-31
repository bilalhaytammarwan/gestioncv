package com.marouane.usertoken.repository;

import com.marouane.usertoken.model.Company;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends MongoRepository<Company, String> {
    Page<Company> findByRoleAndNomContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(String company, String search, String company1, String search1, Pageable pageable);

    Page<Company> findAllByRole(String company, Pageable pageable);
}
