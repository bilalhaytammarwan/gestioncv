package com.marouane.usertoken.service;

import com.marouane.usertoken.exception.user.UserCreationException;
import com.marouane.usertoken.model.Company;
import com.marouane.usertoken.repository.CompanyRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ACompanyService {
    private final CompanyRepository companyRepository;

    public ACompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public Company getCompany(String companyId) {
        return    companyRepository.findById(companyId)
                .orElse(null);
    }

    public boolean updateCompany(Company company) {
        if(company == null || company.getId() == null ) {
            return false;
        }
        else{
            try{
                companyRepository.save(company);
                return true;
            }catch (Exception e){
                return false;
            }
        }
    }

    public Company createCompany(Company company) {
            try{
                return companyRepository.save(company);
            }catch (Exception e){
                throw new UserCreationException("Error creating company: " + e.getMessage());
            }

    }

    public List<Company> getAll() {
        return companyRepository.findAll();
    }
}
