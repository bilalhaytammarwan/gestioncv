package com.marouane.opportunityservice.controller;

import com.marouane.opportunityservice.model.Category;
import com.marouane.opportunityservice.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<Category>> getCategories(){
        List<Category> categories = categoryService.getCategories();
        return ResponseEntity.ok(categories);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String id){
        Category category = categoryService.getCategoryById(id);
        return ResponseEntity.ok(category);
    }
    @PostMapping
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category categoryInfo){
        Category category = categoryService.createCategory(categoryInfo);
        URI location = URI.create("/api/category/" + category.getId());
        return ResponseEntity.created(location).body(category);
    }

    @PutMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Category> updateCategory(@PathVariable String id, @Valid @RequestBody Category categoryInfo){
        Category category = categoryService.updateCategory(id, categoryInfo);
        return ResponseEntity.ok(category);
    }
    @DeleteMapping("/{id}")
//    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCategory(@PathVariable String id){
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}