package com.marouane.usertoken;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class UserTokenApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserTokenApplication.class, args);
    }

}
