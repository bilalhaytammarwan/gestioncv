package com.marouane.usertoken.service;

import com.marouane.usertoken.dto.*;
import com.marouane.usertoken.exception.PathVarException;
import com.marouane.usertoken.exception.user.UserCreationException;
import com.marouane.usertoken.exception.user.UserDeleteException;
import com.marouane.usertoken.exception.user.UserGetException;
import com.marouane.usertoken.exception.user.UserUpdateException;

import com.marouane.usertoken.model.*;

import com.marouane.usertoken.repository.AdminRepository;
import com.marouane.usertoken.repository.CandidateRepository;
import com.marouane.usertoken.repository.CompanyRepository;
import com.marouane.usertoken.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private MongoTemplate mongoTemplate;
    private final UserRepository userRepository;
    private final Attachementservice attachementservice;
    private final AdminRepository adminRepository;
    private final CandidateRepository candidateRepository;
    private final CompanyRepository companyRepository;
//    private final BCryptPasswordEncoder encoder;
//    private final BCryptPasswordEncoder encoder;




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

    public AdminpaginationDto getUsersByRoleadmin(int page, int size,String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "nom"));
             Page<Admin> adminPage;
                     if (search != null && !search.isEmpty()) {
                         adminPage = adminRepository.findByRoleAndNomContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(
                                 "ADMIN", search,
                                 "ADMIN", search, pageable);

                     }
                     else {
                         adminPage = adminRepository.findAllByRole(Role.ADMIN,pageable);
                     }
                     List<Admindto> dtos = adminPage.getContent()
                         .stream()
                         .map(u -> new Admindto(
                             u.getId(),
                             u.getNom(),
                             u.getTelephone(),
                             u.getEmail(),
                             u.getPassword(),
                             u.getVille(),
                             "Sous_Admin"
                         ))
                         .collect(Collectors.toList());


        try {
            return new AdminpaginationDto(dtos,adminPage.getTotalPages());
        } catch (Exception e){
            throw new UserGetException(HttpStatus.BAD_REQUEST, "Invalid role: ");
        }
    }
    public Admin getAdminById(String id) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "Admin ID cannot be empty");
        }
        return adminRepository.findById(id).get();
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
    public User adminuser(String id, Userrequestchangedto userInfo) {
        if (id == null || id.trim().isEmpty()) {
            throw new PathVarException(HttpStatus.BAD_REQUEST, "User ID cannot be empty");
        }
        try {
            User user1=getUserById(id);
            user1.setEmail(userInfo.getEmail());
            user1.setTelephone(userInfo.getTelephone());
            user1.setVille(userInfo.getVille());


            // user.setPassword(encoder.encode(user.getPassword()));
            User userOutput = userRepository.save(user1);
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



    public UserPaginationDto getUserpagination(int page, int size,String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "nom"));

        Page<Candidate> userPage;
        if (search != null && !search.isEmpty()) {


            userPage = candidateRepository.findByRoleAndNomContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(
                    "CANDIDATE", search,
                    "CANDIDATE", search,
                    pageable);
        } else {
            userPage = candidateRepository.findAllByRole("CANDIDATE",pageable);
        }

        // Convert to DTO and return

        List<Userwithimagedto> candidates1 =userPage.getContent().stream().map(u ->{
//            String image=attachementservice.getImagebyid(u.getId());
//            if(image!=null){
//                return new Userwithimagedto(u.getId(), u.getNom(), u.getTelephone(), u.getEmail(), u.getDescription(), u.getRole(), u.getVille(),image,u.getAge(),u.getSexe());
//            }
//            else {
                return new Userwithimagedto(u.getId(), u.getNom(), u.getTelephone(), u.getEmail(), u.getDescription(), u.getRole(), u.getVille(),u.getAge(),u.getSexe());


        }).collect(Collectors.toList());

        return new UserPaginationDto(candidates1,userPage.getTotalPages());
    }
    public Companypaginationdto getCompanypagination(int page, int size,String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "nom"));



        Page<Company> userPage;
        if (search != null && !search.isEmpty()) {
            // Add your search logic here (example using JPA)
            userPage =companyRepository.findByRoleAndNomContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(
                    "COMPANY", search,
                    "COMPANY", search,
                    pageable);


        }
        else {
            userPage = companyRepository.findAllByRole("COMPANY",pageable);
        }
        List<Companywithimagedto> companys =userPage.getContent().stream()
                .map(u ->{
////                    String image=attachementservice.getImagebyid(u.getId());
//                    if(image!=null){
//                        return new Companywithimagedto(u.getId(), u.getNom(), u.getTelephone(), u.getEmail(), u.getDescription(), u.getRole(), u.getVille(),image,u.getLocalisation(),u.getValid());
//                    }
//                    else {
                    return new Companywithimagedto(u.getId(), u.getNom(), u.getTelephone(), u.getEmail(), u.getDescription(), u.getRole(), u.getVille(),u.getLocalisation(),u.getValid());})
                .collect(Collectors.toList());

        return new Companypaginationdto(companys,userPage.getTotalPages());
    }
    public List<String> getUserIdsByRole(Role role) {
        return userRepository.findByRole(role)
                .stream()
                .map(User::getId)
                .collect(Collectors.toList());
    }
    public Userwithimagedto getUserbyidwithphotoandfile(String id) {
       String attachement;
       String image=null;
        Candidate user=candidateRepository.findById(id).get();
        System.out.println(user.getRole());
        if(user.getRole()==Role.CANDIDATE){
            System.out.println("true");
           image=attachementservice.getImagebyid(id);
           System.out.println(image);
           attachement=attachementservice.getCvbyid(id);

           System.out.println(attachement);
    }

        else {
          attachement=attachementservice.getDocbyid(id);
        }
        System.out.println(attachement);
        if(image==null){
            if(attachement==null){
                return new Userwithimagedto(user.getId(), user.getNom(), user.getTelephone(), user.getEmail(), user.getDescription(), user.getRole(), user.getVille(),user.getAge(),user.getSexe());
            }
            else {
                return new Userwithimagedto(user.getId(), user.getNom(), user.getTelephone(), user.getEmail(), user.getDescription(), user.getRole(), user.getVille(),null,attachement,user.getAge(),user.getSexe());
            }
        }
        else {
            if(attachement==null){
                return new Userwithimagedto(user.getId(), user.getNom(), user.getTelephone(), user.getEmail(), user.getDescription(), user.getRole(), user.getVille(),image,user.getAge(),user.getSexe());
            }

            else {
            return new Userwithimagedto(user.getId(), user.getNom(), user.getTelephone(), user.getEmail(), user.getDescription(), user.getRole(), user.getVille(),image,attachement,user.getAge(),user.getSexe());
        }}

    }
    public void savevalidation(String id,Boolean value){
        Company company=companyRepository.findById(id).get();
        company.setValid(value);
        companyRepository.save(company);

    }
    public Companywithimagedto getCompanybyidwithphotoandfile(String id) {
        String attachement;
        String image=null;
        Company user=companyRepository.findById(id).get();
        System.out.println(user.getRole());


            image=attachementservice.getImagebyid(id);



            attachement=attachementservice.getDocbyid(id);


        if(image==null){
            if(attachement==null){
                return new Companywithimagedto(user.getId(), user.getNom(), user.getTelephone(), user.getEmail(), user.getDescription(), user.getRole(), user.getVille(),user.getLocalisation(),user.getValid());
            }
            else {
                return new Companywithimagedto(user.getId(), user.getNom(), user.getTelephone(), user.getEmail(), user.getDescription(), user.getRole(), user.getVille(),null,attachement,user.getLocalisation(),user.getValid());
            }
        }
        else {
            if(attachement==null){
                return new Companywithimagedto(user.getId(), user.getNom(), user.getTelephone(), user.getEmail(), user.getDescription(), user.getRole(), user.getVille(),image,user.getLocalisation(),user.getValid());
            }

            else {
                return new Companywithimagedto(user.getId(), user.getNom(), user.getTelephone(), user.getEmail(), user.getDescription(), user.getRole(), user.getVille(),image,attachement,user.getLocalisation(),user.getValid());
            }}

    }
    public void addsubadmin(Admin user){


        user.setRole(Role.ADMIN);
        user.setAdminRole(AdminRole.Sous_Admin);
        userRepository.save(user);
    }
}
