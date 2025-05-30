package com.marouane.usertoken.controller;


import com.marouane.usertoken.model.Annonce;

import com.marouane.usertoken.model.Opportunity;
import com.marouane.usertoken.model.Role;
import com.marouane.usertoken.model.User;
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
public class UserController {

    private final UserService userService;

//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }
//    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id){
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
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

    @PutMapping("/update/notification")
        public void updateUserNotification(@RequestPart("annonce") String annonceId, @Valid @RequestPart("user") User userInfo){
        userService.addtolistnotification(annonceId, userInfo);
    }

}
