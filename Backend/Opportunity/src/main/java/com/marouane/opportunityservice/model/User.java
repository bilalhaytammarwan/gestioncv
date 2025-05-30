package com.marouane.opportunityservice.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {



        private String id;

        private String nom;

        private String telephone;

        private String email;


        private String password;


        private String description;



        private Date dureeUtilisation;


        private Role role;


        private String ville;

    }
