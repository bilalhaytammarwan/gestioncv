package com.marouane.usertoken.dto;

import com.marouane.usertoken.model.Role;
import com.marouane.usertoken.model.Sexe;
import com.marouane.usertoken.validation.ValidPhoneNumber;
import jakarta.validation.constraints.*;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Date;

public class Userwithimagedto {
    private String id;


    private String nom;


    private String telephone;


    private String email;



    private String description;




    private Role role;


    private String ville;
    private String age;
    private Sexe sexe;
    private String photo;
    private String attachement;

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public Sexe getSexe() {
        return sexe;
    }

    public void setSexe(Sexe sexe) {
        this.sexe = sexe;
    }

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

    public Userwithimagedto(String id, String nom, String telephone, String email, String description, Role role, String ville, String photo,String attachement,String age,Sexe sexe) {
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.description = description;
        this.role = role;
        this.ville = ville;
        this.photo = photo;
        this.sexe = sexe;
        this.age = age;
        this.attachement=attachement;
    }

    public Userwithimagedto(String id, String nom, String telephone, String email, String description, Role role, String ville, String photo,String age,Sexe sexe) {
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.description = description;
        this.role = role;
        this.ville = ville;
        this.sexe = sexe;
        this.age = age;
        this.photo = photo;

    }

    public Userwithimagedto(String id, String nom, String telephone, String email, String description, Role role, String ville,String age,Sexe sexe) {
        this.id = id;
        this.nom = nom;
        this.telephone = telephone;
        this.email = email;
        this.description = description;
        this.role = role;
        this.ville = ville;
        this.sexe = sexe;
        this.age = age;
    }
}
