package com.marouane.usertoken.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@TypeAlias("company")
@Data
public class Company extends User {

    @NotNull
    @NotBlank(message = "Location is required")
    @Size(max = 100, message = "Location must not exceed 100 characters")
    private String localisation;

    @NotNull(message = "Validation status must be specified")
    private Boolean valid;

    public Company() {
        this.setRole(Role.COMPANY);
    }

}
