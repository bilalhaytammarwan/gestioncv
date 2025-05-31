package com.marouane.usertoken.dto;

import com.marouane.usertoken.model.Role;

public class Admindto {
    private String id;


    private String nom;


    private String telephone;


    private String email;
    private String password;











    private String ville;
    private String adminRole;

    public String getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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



    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public String getAdminRole() {
        return adminRole;
    }

    public void setAdminRole(String adminRole) {
        this.adminRole = adminRole;
    }

    public Admindto(String id, String nom, String telephone, String email,String password, String ville, String adminRole) {
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;

        this.ville = ville;
        this.adminRole = adminRole;
        this.password = password;
    }
}
