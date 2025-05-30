package com.marouane.opportunityservice.service;

import com.marouane.opportunityservice.exception.PathVarException;
import com.marouane.opportunityservice.exception.category.CategoryCreationException;
import com.marouane.opportunityservice.exception.category.CategoryDeleteException;
import com.marouane.opportunityservice.exception.category.CategoryGetException;
import com.marouane.opportunityservice.exception.category.CategoryUpdateException;
import com.marouane.opportunityservice.model.Category;
import com.marouane.opportunityservice.repo.CategoryRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepo categoryRepo;

    public List<Category> getCategories() {
        try{
            return categoryRepo.findAll();
        } catch (Exception e){
            throw new CategoryGetException(HttpStatus.NOT_FOUND, "No Category found");
        }
    }

    public Category getCategoryById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Category ID cannot be empty");
        }
        return categoryRepo.findById(id)
                .orElseThrow(() -> new CategoryGetException(HttpStatus.NOT_FOUND, "Category not found"));
    }

    public Category createCategory(Category categoryInfo) {
        try {
            Category categoryOutput = categoryRepo.save(categoryInfo);
            log.info("Category created with ID: {}", categoryOutput.getId());
            return categoryOutput;
        } catch (Exception e) {
            log.error("Error creating category: {}", e.getMessage());
            throw new CategoryCreationException("Failed to create category");
        }
    }

    public Category updateCategory(String id, Category categoryInfo) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Category ID cannot be empty");
        }
        try {
            Category categoryChecked = getCategoryById(id);
            categoryInfo.setId(categoryChecked.getId());
            Category categoryOutput = categoryRepo.save(categoryInfo);
            log.info("Category updated with ID: {}", categoryOutput.getId());
            return categoryOutput;
        } catch (Exception e) {
            log.error("Error updating category: {}", e.getMessage());
            throw new CategoryUpdateException("Failed to category category");
        }
    }

    public void deleteCategory(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Category ID cannot be empty");
        }
        try{
            Category category = getCategoryById(id);
            categoryRepo.deleteById(category.getId());
            log.info("Category deleted with ID: {}", category.getId());
        } catch (Exception e) {
            log.error("Error deleting category: {}", e.getMessage());
            throw new CategoryDeleteException("Failed to delete category");
        }
    }
}