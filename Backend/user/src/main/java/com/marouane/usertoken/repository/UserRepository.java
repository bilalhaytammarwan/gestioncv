package com.marouane.usertoken.repository;

import com.marouane.usertoken.model.Role;
import com.marouane.usertoken.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface UserRepository extends MongoRepository<User, String> {
    List<User> findAllByRole(Role role);
    Optional<User> findByEmail(String email);
}
