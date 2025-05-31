package com.marouane.usertoken.controller;


import com.marouane.usertoken.dto.*;
import com.marouane.usertoken.model.Admin;
import com.marouane.usertoken.model.Annonce;

import com.marouane.usertoken.model.Opportunity;
import com.marouane.usertoken.model.Role;
import com.marouane.usertoken.model.User;
import com.marouane.usertoken.service.Attachementservice;
import com.marouane.usertoken.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor


@CrossOrigin(origins = "http://localhost:5173/")
public class UserController {

    private final UserService userService;
    private final Attachementservice attachementservice;



//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }
    @PostMapping("/addadmin")
    public void postadmin(@RequestBody Admin admin){
        userService.addsubadmin(admin);
    }
//    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id){
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<Userwithimagedto> getUserByIdwithphotoandfile(@PathVariable String id){
        Userwithimagedto user=userService.getUserbyidwithphotoandfile(id);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/admin/{id}")
    public Admin getAdminById(@PathVariable String id){
        Admin admin=userService.getAdminById(id);
        return admin;
    }
    @GetMapping("/admins/pagination")
    public AdminpaginationDto getAllAdmins(@RequestParam(defaultValue = "0") int page,
                                    @RequestParam(defaultValue = "10") int size,
                                    @RequestParam(required = false)String search){
        AdminpaginationDto admins=userService.getUsersByRoleadmin(page,size,search);
        return admins;
    }
    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody User userInfo){
        User user = userService.createUser(userInfo);
        URI location = URI.create("/api/user/" + user.getId());
        return ResponseEntity.created(location).body(user);
    }
//    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable String id, @Valid @RequestBody User userInfo){
        User user = userService.updateUser(id, userInfo);
        return ResponseEntity.ok(user);
    }
//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id){

        boolean delete= attachementservice.deleteCv(id);
      boolean deleteimage=  attachementservice.deleteImage(id);

            userService.deleteUser(id);




        return ResponseEntity.noContent().build();
    }



//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email){
        User user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }
//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role){
        Role validRole = Role.valueOf(role.toUpperCase());
        List<User> users = userService.getUsersByRole(validRole);
        return ResponseEntity.ok(users);
    }



    @GetMapping("/pagination")
    public UserPaginationDto getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false)String search) {
      return   userService.getUserpagination(page, size,search);
    }
    @PutMapping("/update/validation/{id}")
    public void updateUserValidation(@PathVariable String id, @RequestBody Boolean value){
        userService.savevalidation(id,value);

    }

    @GetMapping("/pagination/company")
    public Companypaginationdto getCompany(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false)String search) {
        return   userService.getCompanypagination(page, size,search);
    }
    @GetMapping("/role/company/ids")
    public ResponseEntity<List<String>> getAllCompanyUserIds() {
        List<String> ids = userService.getUserIdsByRole(Role.COMPANY);
        return ResponseEntity.ok(ids);
    }


}
