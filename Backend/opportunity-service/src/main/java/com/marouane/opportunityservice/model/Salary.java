package com.marouane.opportunityservice.model;

import com.marouane.opportunityservice.validations.ValidSalary;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@ValidSalary
@Data
public class Salary {
    @NotBlank(message = "Currency is required.")
    @Pattern(regexp = "^[A-Z]{3}$", message = "Currency must be a valid 3-letter ISO 4217 code.")
    private String currency;

    @DecimalMin(value = "0.0", inclusive = true, message = "Minimum salary cannot be negative.")
    private double min;

    @DecimalMin(value = "0.0", inclusive = true, message = "Maximum salary cannot be negative.")
    private double max;

    @NotNull(message = "Unit is required.")
    private Unit unit;
}
