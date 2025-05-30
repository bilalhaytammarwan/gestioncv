package com.marouane.opportunityservice.model;

import com.marouane.opportunityservice.validations.ValidLocation;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ValidLocation
public class Location {

    @NotBlank(message = "Job city is required")
    @Size(max = 170, message = "Job location can't exceed 170 characters")
    @Pattern(regexp = "^[\\p{L} .'-]+$", message = "Only letters, spaces, dots, apostrophes, and hyphens are allowed")
    private String city;

    @NotBlank(message = "Job region is required")
    @Size(max = 100, message = "Job location can't exceed 100 characters")
    @Pattern(regexp = "^[\\p{L} .'-]+$", message = "Only letters, spaces, dots, apostrophes, and hyphens are allowed")
    private String region;

    @NotBlank(message = "Job country is required")
    @Size(max = 60, message = "Job country can't exceed 60 characters")
    @Pattern(regexp = "^[\\p{L} .'-]+$", message = "Only letters, spaces, dots, apostrophes, and hyphens are allowed")
    private String country;

//    @ValidLocation // Custom annotation to validate city, region, and country
//    public Location validateLocation() {
//        return this; // You can add more checks here if needed
//    }
}
