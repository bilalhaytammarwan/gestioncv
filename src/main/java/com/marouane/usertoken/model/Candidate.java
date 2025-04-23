package com.marouane.usertoken.model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.TypeAlias;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@TypeAlias("candidate")
@Data
public class Candidate extends User {
    @NotNull(message = "Age cannot be null")
    @NotBlank(message = "Age is required")
    @Pattern(regexp = "^[1-9][0-9]?$|^100$", message = "Age must be a valid number between 1 and 100")
    private String age;

    @NotNull(message = "Sexe is required")
    private Sexe sexe;

    public Candidate() {
        this.setRole(Role.CANDIDATE);
    }
}
