package com.marouane.sendemailservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class SendEmailServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(SendEmailServiceApplication.class, args);
    }

}
