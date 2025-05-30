package com.marouane.usertoken.controller;

import com.marouane.usertoken.model.Company;
import com.marouane.usertoken.service.ACompanyService;
import jakarta.validation.Valid;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/company")
public class ACompanyController {
    private final ACompanyService aCompanyService;

    public ACompanyController(ACompanyService aCompanyService) {
        this.aCompanyService = aCompanyService;
    }
//route for testing
    @PostMapping
    public ResponseEntity<Company> createACompany(@Valid @RequestBody Company aCompanyInfo) {
        Company company = aCompanyService.createCompany(aCompanyInfo);

        return ResponseEntity.status(HttpStatus.CREATED).body(company);
    }



    @GetMapping("/{id}")
    public ResponseEntity<Company> getACompanyById(@PathVariable String id) {
        Company company = aCompanyService.getCompany(id);
        if (company == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }else{
            return ResponseEntity.ok(company);

        }

    }
    @GetMapping
    public ResponseEntity<List<Company>> getACompanyByName() {
         List<Company> company = aCompanyService.getAll();
        if (company == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }else{
            return ResponseEntity.ok(company);

        }

    }
    @PutMapping("/{id}")
    public ResponseEntity<String> updateACompany(@PathVariable String id,@Valid @RequestBody Company aCompanyInfo) {
        if(id==null || aCompanyInfo.getId()!=id){
            return ResponseEntity.badRequest().body("can't update info of another company");
        }
        if(aCompanyService.updateCompany(aCompanyInfo)){
            return ResponseEntity.ok("company data updated successfully");
        }
        else{
            return ResponseEntity.badRequest().body("company data update failed");
        }
    }

}
