package com.marouane.sendemailservice.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.marouane.sendemailservice.dto.ApplicationDTO;
import com.marouane.sendemailservice.dto.ResumeDto;
import com.marouane.sendemailservice.model.Message;
import com.marouane.sendemailservice.service.MessageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.util.Arrays;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/message")
@CrossOrigin("http://localhost:5173")
public class MessageController {

    private final MessageService messageService;
    private final ObjectMapper objectMapper;

    @PostMapping(value = "")
    public ResponseEntity<Message> createMessage(@RequestPart("applicationDTO") String applicationJson, @RequestPart("resume") MultipartFile resumeFile){

        ApplicationDTO applicationDTO = null;
        try {
            applicationDTO = objectMapper.readValue(applicationJson, ApplicationDTO.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        if (resumeFile != null && !resumeFile.isEmpty()) {
            ResumeDto resume = new ResumeDto();
            resume.setName(resumeFile.getOriginalFilename());
            resume.setType(resumeFile.getContentType());
            resume.setSize(resumeFile.getSize());
            try {
                resume.setBytes(resumeFile.getBytes());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            applicationDTO.setResume(resume);
        }
        Message message = messageService.createMessage(applicationDTO);
        return ResponseEntity.ok(message);
    }
    @PostMapping("/send")
    public ResponseEntity<String> sendMessage(@Valid @RequestBody Message message){
        messageService.sendEmail(message);
        return ResponseEntity.ok("Email sent Successfully.");
    }
    @PostMapping(value = "/createAndSend")
    public ResponseEntity<String> createAndSendMessage(@RequestPart("applicationDTO") String applicationJson, @RequestPart("resume") MultipartFile resumeFile){
        Message message = createMessage(applicationJson, resumeFile).getBody();
        return sendMessage(message);
    }
}
