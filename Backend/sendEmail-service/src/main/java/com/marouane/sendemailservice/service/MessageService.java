package com.marouane.sendemailservice.service;

import com.marouane.sendemailservice.dto.ApplicationDTO;
import com.marouane.sendemailservice.dto.OpportunitySearchResultWrapper;
import com.marouane.sendemailservice.dto.UserWrapper;
import com.marouane.sendemailservice.exception.EmailSendingException;
import com.marouane.sendemailservice.feign.OpportunityInterface;
import com.marouane.sendemailservice.feign.UserTokenInterface;
import com.marouane.sendemailservice.model.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageService {

    private final JavaMailSender mailSender;
    private final UserTokenInterface userTokenInterface;
    private final OpportunityInterface opportunityInterface;

    private UserWrapper userWrapper(String id){
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID is null or empty");
        }
        return userTokenInterface.getUserById(id).getBody();
    }
    private OpportunitySearchResultWrapper opportunitySearchResultWrapper(String id){
        if (id == null || id.trim().isEmpty()) {
            throw new IllegalArgumentException("User ID is null or empty");
        }
        return opportunityInterface.getOpportunityById(id).getBody();
    }
    public Message createMessage(ApplicationDTO applicationDTO) {

        Message message = new Message();
        final UserWrapper CANDIDATE = userWrapper(applicationDTO.getCandidateId());
        final UserWrapper COMPANY = userWrapper(opportunitySearchResultWrapper(applicationDTO.getOpportunityId()).getCompanyId());

        if((applicationDTO.getFullName() == null || applicationDTO.getFullName().isEmpty()) && applicationDTO.isAccountInfoChecked()){
            applicationDTO.setFullName(CANDIDATE.getNom());
        }
        if((applicationDTO.getEmail() == null || applicationDTO.getEmail().isEmpty()) && applicationDTO.isAccountInfoChecked()) {
            applicationDTO.setEmail(CANDIDATE.getEmail());
        }
        if((applicationDTO.getPhoneNumber() == null || applicationDTO.getPhoneNumber().isEmpty()) && applicationDTO.isAccountInfoChecked()){
            applicationDTO.setPhoneNumber(CANDIDATE.getTelephone());
        }

        message.setCandidateEmail(applicationDTO.getEmail());
        // to: opportunity-service + company-service(opportunity id -> company id -> company email)
        message.setCompanyEmail(COMPANY.getEmail());



        // subject: user-token-service (candidate name by candidate id)
        message.setSubject("Candidate Application: " + CANDIDATE.getNom());
        StringBuilder emailBody = new StringBuilder();
        emailBody.append("Dear Hiring Team,\n\n");
        emailBody.append("I hope this message finds you well.\n\n");
        emailBody.append("I am writing to express my interest in the opportunity at your organization. My name is ")
                .append(applicationDTO.getFullName())
                .append(", and I bring with me ")
                .append(applicationDTO.getYearsOfExperience())
                .append(" years of experience");
        if (applicationDTO.getPastJobTitle() != null && applicationDTO.getPastCompanyName() != null) {
            emailBody.append(" as a ").append(applicationDTO.getPastJobTitle())
                    .append(" at ").append(applicationDTO.getPastCompanyName()).append(". ");
        }
        emailBody.append("I am passionate about contributing to innovative teams and believe that my background aligns well with your current needs.\n\n");

        emailBody.append("You can reach me at ").append(applicationDTO.getEmail())
                .append(" or by phone at ").append(applicationDTO.getPhoneNumber()).append(". ");

        if (applicationDTO.getLinkedinProfile() != null && !applicationDTO.getLinkedinProfile().isBlank()) {
            emailBody.append("You can learn more about my professional background through my LinkedIn profile: ")
                    .append(applicationDTO.getLinkedinProfile())
                    .append(".\n");
        }
        if (applicationDTO.getPortfolioUrl() != null && !applicationDTO.getPortfolioUrl().isBlank()) {
            emailBody.append("Additionally, examples of my work are available in my portfolio: ")
                    .append(applicationDTO.getPortfolioUrl())
                    .append(".\n\n");
        }
        if (applicationDTO.getInterviewProposedDates() != null && !applicationDTO.getInterviewProposedDates().isEmpty()) {
            emailBody.append("Regarding availability, I would be happy to schedule an interview at your convenience. Here are a few dates that work well for me:\n");
            for (Date date : applicationDTO.getInterviewProposedDates()) {
                emailBody.append("- ").append(new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm").format(date)).append("\n");
            }
            emailBody.append("\n");
        }
        emailBody.append("Below, you'll find my cover letter detailing my motivation and qualifications:\n\n");
        emailBody.append("> ").append(applicationDTO.getCoverLetter()).append("\n\n");

        emailBody.append("Thank you for taking the time to review my application. I am eager to explore how I can contribute to your team and would welcome the opportunity to speak further.\n\n");

        emailBody.append("Sincerely,\n");
        emailBody.append(applicationDTO.getFullName());

        message.setBody(emailBody.toString());

        // resume: attachments-service (candidate resume by candidate id)
        if(applicationDTO.getResume() == null && applicationDTO.isAccountCvChecked()){
            System.out.println("we're coming into it");
//            message.setResume(CANDIDATE.getResume());
        }
        else {
            message.setResume(applicationDTO.getResume());
        }
        return message;
    }
    @Async
    public void sendEmail(Message message){
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setFrom("reactudemy722@gmail.com"); //noreply@jobfinder.com
            helper.setTo(message.getCompanyEmail());
            helper.setSubject(message.getSubject());
            helper.setText(message.getBody(), false);
            helper.setReplyTo(message.getCandidateEmail());
            if (message.getResume() != null && message.getResume().getBytes() != null) {
                helper.addAttachment(
                    message.getResume().getName(),
                    new ByteArrayResource(message.getResume().getBytes())
                );
            }
            mailSender.send(mimeMessage);
            log.error("email sent successfully to {}", message.getCompanyEmail());
        } catch (MessagingException e) {
            log.error("Failed to send email", e);
            throw new RuntimeException(e);
        }
    }
}
