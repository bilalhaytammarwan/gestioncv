package com.gestioncv.annonce.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String nom;
    private String telephone;
    private String email;
    private String password;
    private String description;
    private String duredeutilisation;
    private Typerole role;
    private String ville;
    private List<Annonce>notification;

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

    public String getDuredeutilisation() {
        return duredeutilisation;
    }

    public void setDuredeutilisation(String duredeutilisation) {
        this.duredeutilisation = duredeutilisation;
    }

    public Typerole getRole() {
        return role;
    }

    public void setRole(Typerole role) {
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
