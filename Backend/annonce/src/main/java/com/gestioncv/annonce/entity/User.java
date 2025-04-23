package com.gestioncv.annonce.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;
@Data
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

}
