package com.marouane.usertoken.dto;

import com.marouane.usertoken.model.Role;

public class Companywithimagedto {
    private String id;

    private String nom;

    private String telephone;

    private String email;

    private String description;

    private Role role;

    private String ville;
    private String photo;
    private String attachement;

    private String localisation;
    private boolean valid;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public String getAttachement() {
        return attachement;
    }

    public void setAttachement(String attachement) {
        this.attachement = attachement;
    }

    public String getLocalisation() {
        return localisation;
    }

    public void setLocalisation(String localisation) {
        this.localisation = localisation;
    }

    public boolean isValid() {
        return valid;
    }

    public void setValid(boolean valid) {
        this.valid = valid;
    }

    public Companywithimagedto(String id, String nom, String telephone, String email, String description, Role role, String ville, String photo, String attachement, String localisation, boolean valid) {
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.description = description;
        this.role = role;
        this.ville = ville;
        this.photo = photo;
        this.attachement = attachement;
        this.localisation = localisation;
        this.valid = valid;
    }

    public Companywithimagedto(String id, String nom, String telephone, String email, String description, Role role, String ville, String localisation, boolean valid) {
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.description = description;
        this.role = role;
        this.ville = ville;
        this.localisation = localisation;
        this.valid = valid;
    }

    public Companywithimagedto(String id, String nom, String telephone, String email, String description, Role role, String ville, String photo, String localisation, boolean valid) {
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.description = description;
        this.role = role;
        this.ville = ville;
        this.photo = photo;
        this.localisation = localisation;
        this.valid = valid;
    }

}
