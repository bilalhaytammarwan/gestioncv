package com.marouane.opportunityservice.repo;

import com.marouane.opportunityservice.model.Country;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CountryRepository extends MongoRepository<Country, Long> {
    Country findByNameIgnoreCase(String name);
    Country findByCodeIgnoreCase(String code);
}

