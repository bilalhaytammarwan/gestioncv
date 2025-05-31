package com.marouane.usertoken.repository;

import com.marouane.usertoken.model.Role;
import com.marouane.usertoken.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
@Repository

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findAllByRole(Role role);
    Optional<User> findByEmail(String email);

    Page<User> findAllByRole(String candidate, Pageable pageable);

    List<User> findByRole(Role role);

    Page<User> findByNomContainingOrEmailContaining(String search, String search1, Pageable pageable);

    Page<User> findByNomContainingIgnoreCaseOrEmailContainingIgnoreCaseAndRole(String nom, String email, String role, Pageable pageable);

    Page<User> findByRoleAndNomContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(String company, String search, String company1, String search1, Pageable pageable);
}
