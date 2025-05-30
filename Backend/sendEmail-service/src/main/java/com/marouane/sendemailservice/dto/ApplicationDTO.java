package com.marouane.sendemailservice.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import validation.ValidPhoneNumber;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDTO {

    @NotNull(message = "Account Info Type must not be null")
    private boolean isAccountInfoChecked;
    @NotNull(message = "Account Info Type must not be null")
    private boolean isAccountCvChecked;

    @NotNull(message = "Candidate ID must not be null")
    @NotBlank(message = "Candidate ID must not be blank")
    private String candidateId;
    // or
    @NotBlank(message = "Full name must not be blank")
    @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
    private String fullName;

    @NotBlank(message = "Email must not be blank")
    @Email(message = "Email must be a valid email address")
    private String email;

    @NotNull(message = "telephone must not be null")
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\+?[1-9]\\d{7,14}$", message = "Invalid phone number format")
    @ValidPhoneNumber(message = "Invalid phone number format")
    private String phoneNumber;

    @NotNull(message = "Opportunity ID must not be null")
    @NotBlank(message = "Opportunity ID must not be blank")
    private String opportunityId;

//    @Size(max = 100, message = "Subject must not exceed 100 characters")
//    @NotNull(message = "Subject must not be null")
//    @NotBlank(message = "Subject must not be blank")
//    private String subject;

    @Size(max = 150, message = "past Job Title must not exceed 150 characters")
    private String pastJobTitle;

    @Size(max = 100, message = "Company name must not exceed 100 characters")
    private String pastCompanyName;

    @Min(value = 0, message = "Years of experience must be a positive number")
    private int yearsOfExperience;

    @Pattern(regexp = "^$|^(https?://)?(www\\.)?linkedin\\.com/in/.*$", message = "LinkedIn profile must be a valid LinkedIn URL")
    private String linkedinProfile;

    @Pattern(regexp = "^$|^https?:\\/\\/.+", message = "Portfolio URL must be a valid URL")
    private String portfolioUrl;

    @Size(max = 3, message = "You can propose at most 3 interview dates")
    private List<@NotNull(message = "Interview proposed date must not be null") Date> interviewProposedDates;

    @Size(max = 5000, message = "Cover letter must not exceed 5000 characters")
    private String coverLetter;

    private ResumeDto resume;
}
