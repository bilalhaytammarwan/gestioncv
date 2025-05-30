package com.marouane.opportunityservice.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;

@Data
public class Candidate {
    private String id;
    private String nom;
    private String telephone;
    private String email;
    private String image;

}
