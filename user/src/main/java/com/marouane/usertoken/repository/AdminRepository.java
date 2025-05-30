package com.marouane.usertoken.repository;

import com.marouane.usertoken.model.Admin;
import com.marouane.usertoken.model.Role;
import com.marouane.usertoken.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AdminRepository extends MongoRepository<Admin, String> {
    public Page<Admin> findAllByRole(Role role, Pageable pageable);

    Page<Admin> findByRoleAndNomContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(String admin, String search, String admin1, String search1, Pageable pageable);


}
