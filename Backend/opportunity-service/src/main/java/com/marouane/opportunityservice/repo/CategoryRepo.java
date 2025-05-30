package com.marouane.opportunityservice.repo;

import com.marouane.opportunityservice.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepo extends MongoRepository<Category, String> {
}
