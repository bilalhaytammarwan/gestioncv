package com.marouane.opportunityservice.dto;

import com.marouane.opportunityservice.model.JobType;
import com.marouane.opportunityservice.model.Location;
import com.marouane.opportunityservice.model.Salary;
import com.marouane.opportunityservice.model.Status;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpportunityDTO {

    @NotBlank(message = "CompanyWrapper is required")
    @NotNull(message = "CompanyWrapper must not be null")
    private String companyId;

    @NotNull(message = "Title must not be null")
    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotNull(message = "Description must not be null")
    @NotBlank(message = "Description is required")
    @Size(min = 10, max = 1000, message = "Description must be between 10 and 1000 characters")
    private String description;

    @NotNull(message = "Category must not be null")
    private String categoryId;

    @NotNull(message = "Created date must not be null")
    @PastOrPresent(message = "Created date can't be in the future")
    private Date createdAt;

    @NotNull(message = "Updated date must not be null")
    @PastOrPresent(message = "Updated date can't be in the future")
    private Date updatedAt;

    @NotNull(message = "Job type must not be null")
    private JobType jobType;

    @NotNull(message = "Salary must not be null")
    @Valid
    private Salary salary;

    @NotNull(message = "JobLocation must not be null")
    @Valid
    private Location jobLocation;

    @NotNull(message = "JobStatus must not be null")
    private Status status;

    @Future(message = "Deadline must be a future date")
    private Date applicationDeadline;

    @NotNull(message = "Remote must not be null")
    private boolean remote;

    @Size(max = 10, message = "Too many items")
    @Valid
    private List<@NotBlank(message = "Requirement cannot be blank") String> requirements;

    @Size(max = 10, message = "Too many items")
    @Valid
    private List<@NotBlank(message = "Responsibility cannot be blank") String> responsibilities;

    @Size(max = 10, message = "Too many items")
    @Valid
    private List<@NotBlank(message = "Benefit cannot be blank") String> benefits;

    @NotNull(message = "Years of experience cannot be null")
    @Min(value = 0, message = "Years of experience cannot be negative.")
    @Max(value = 50, message = "Years of experience cannot exceed 50.")
    private int yearsOfExperience;
}
