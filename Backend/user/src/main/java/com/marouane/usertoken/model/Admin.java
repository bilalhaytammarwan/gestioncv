package com.marouane.usertoken.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.TypeAlias;

import java.util.Date;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@TypeAlias("admin")
@Data
public class Admin extends User {
    @NotNull(message = "Admin role is required")
    private AdminRole adminRole;

    @NotNull(message = "Permissions list cannot be null")
    @Size(min = 1, message = "At least one permission is required")
    private List<@NotBlank(message = "Permission value cannot be blank") String> permissions;

    @NotNull(message = "Last Login cannot be null")
    @PastOrPresent(message = "Last login cannot be in the future")
    private Date lastLogin;

    @NotNull(message = "Status cannot be null")
    @NotBlank(message = "Status is required")
    @Pattern(
            regexp = "active|suspended|disabled",
            flags = Pattern.Flag.CASE_INSENSITIVE,
            message = "Status must be one of: active, suspended, or disabled"
    )
    private String status; // "active", "suspended", etc.

    public Admin() {
        this.setRole(Role.ADMIN);
    }
}
