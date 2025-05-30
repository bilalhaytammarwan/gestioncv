package com.marouane.sendemailservice.model;


import com.marouane.sendemailservice.dto.ResumeDto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {

    @NotBlank(message = "Company email must not be blank")
    @Email(message = "Company email must be a valid email address")
    private String companyEmail;

    @NotBlank(message = "Candidate email must not be blank")
    @Email(message = "Candidate email must be a valid email address")
    private String candidateEmail;

    @NotBlank(message = "Subject must not be blank")
    private String subject;

    @NotBlank(message = "Body must not be blank")
    private String body;

    private ResumeDto resume;

}
