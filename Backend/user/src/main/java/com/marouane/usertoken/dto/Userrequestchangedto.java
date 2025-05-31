package com.marouane.usertoken.dto;

public class Userrequestchangedto {
    private String email;
    private String telephone;
    private String ville;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Userrequestchangedto(String email, String telephone, String ville) {
        this.email = email;
        this.telephone = telephone;
        this.ville = ville;
    }
}
