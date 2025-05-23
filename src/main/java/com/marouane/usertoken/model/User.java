package com.marouane.usertoken.model;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.marouane.usertoken.validation.ValidPhoneNumber;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

import java.util.List;



@AllArgsConstructor
@NoArgsConstructor
@TypeAlias("user")
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.EXISTING_PROPERTY, property = "role")
@JsonSubTypes({
        @JsonSubTypes.Type(value = Admin.class, name = "ADMIN"),
        @JsonSubTypes.Type(value = Candidate.class, name = "CANDIDATE"),
        @JsonSubTypes.Type(value = Company.class, name = "COMPANY")
})
@Document(collection = "users")
public abstract class User {

    @Id
    private String id;

    @NotNull(message = "Name must not be null")
    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String nom;

    @NotNull(message = "telephone must not be null")
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[1-9]\\d{7,14}$", message = "Invalid phone number format")
    @ValidPhoneNumber(message = "Invalid phone number format")
    @Indexed(unique = true)
    private String telephone;

    @NotNull(message = "Email must not be null")
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Indexed(unique = true)
    private String email;

    @NotNull(message = "Password must not be null")
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @Size(max = 255, message = "Description must not exceed 255 characters")
    private String description;


    @PastOrPresent(message = "Usage date cannot be in the future")
    private Date dureeUtilisation;

    @NotNull(message = "Role is required")
    private Role role;

    @NotNull(message = "Ville must not be null")
    @NotBlank(message = "City is required")
    private String ville;

    private List<Annonce> notification;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDureeUtilisation() {
        return dureeUtilisation;
    }

    public void setDureeUtilisation(Date dureeUtilisation) {
        this.dureeUtilisation = dureeUtilisation;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public List<Annonce> getNotification() {
        return notification;
    }

    public void setNotification(List<Annonce> notification) {
        this.notification = notification;
    }
}