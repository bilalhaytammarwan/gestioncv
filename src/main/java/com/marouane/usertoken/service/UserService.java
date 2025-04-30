package com.marouane.usertoken.service;

import com.marouane.usertoken.exception.PathVarException;
import com.marouane.usertoken.exception.user.UserCreationException;
import com.marouane.usertoken.exception.user.UserDeleteException;
import com.marouane.usertoken.exception.user.UserGetException;
import com.marouane.usertoken.exception.user.UserUpdateException;
import com.marouane.usertoken.model.Role;
import com.marouane.usertoken.model.User;
import com.marouane.usertoken.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Slf4j
@Service
public class UserService {
    private final UserRepository userRepository;
//    private final BCryptPasswordEncoder encoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
//        this.encoder = new BCryptPasswordEncoder(BCryptPasswordEncoder.BCryptVersion.$2Y,12);
    }


    public List<User> getUsers() {
        try{
            return userRepository.findAll();
        } catch (Exception e){
            throw new UserGetException(HttpStatus.NOT_FOUND, "No User found");
        }
    }
    public User getUserById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "User ID cannot be empty");
        }
        return userRepository.findById(id)
                .orElseThrow(() -> new UserGetException(HttpStatus.NOT_FOUND, "User not found"));
    }
    public User getUserByEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "User Email cannot be empty");
        }
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserGetException(HttpStatus.NOT_FOUND, "User not found"));
    }
    public List<User> getUsersByRole(Role role) {
        if (role == null) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "User Role cannot be empty");
        }
        try {
            return userRepository.findAllByRole(role);
        } catch (Exception e){
            throw new UserGetException(HttpStatus.BAD_REQUEST, "Invalid role: " + role);
        }
    }



    public User createUser(User user) {
        try {
            user.setPassword(/*encoder.encode(*/user.getPassword()/*)*/);
            User userOutput = userRepository.save(user);
            log.info("User created with ID: {}", userOutput.getId());
            return userOutput;
        } catch (Exception e) {
            log.error("Error creating user: {}", e.getMessage());
            throw new UserCreationException("Failed to create user");
        }
    }

    public User updateUser(String id, User user) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "User ID cannot be empty");
        }
        try {
            User userChecked = getUserById(id);
            user.setId(userChecked.getId());
            // user.setPassword(encoder.encode(user.getPassword()));
            User userOutput = userRepository.save(user);
            log.info("User updated with ID: {}", userOutput.getId());
            return userOutput;
        } catch (Exception e) {
            log.error("Error updating user: {}", e.getMessage());
            throw new UserUpdateException("Failed to update user");
        }
    }



    public void deleteUser(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User ID cannot be empty");
        }
        try{
            User user = getUserById(id);
            userRepository.deleteById(user.getId());
            log.info("User deleted with ID: {}", user.getId());
        } catch (Exception e) {
            log.error("Error deleting user: {}", e.getMessage());
            throw new UserDeleteException("Failed to delete user");
        }
    }
}
