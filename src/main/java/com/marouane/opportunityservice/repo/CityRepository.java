package com.marouane.opportunityservice.repo;

import com.marouane.opportunityservice.model.City;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CityRepository extends MongoRepository<City, String> {
    City findByNameIgnoreCaseAndAdmin1CodeAndCountryCode(String name, String admin1Code, String countryCode);
}

