package com.marouane.opportunityservice.repo;


import com.marouane.opportunityservice.model.Region;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RegionRepository extends MongoRepository<Region, Long> {
    Region findByNameIgnoreCaseAndCountryCode(String name, String countryCode);
}

