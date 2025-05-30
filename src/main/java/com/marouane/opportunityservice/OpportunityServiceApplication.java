package com.marouane.opportunityservice;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import java.io.IOException;

@SpringBootApplication
@EnableFeignClients
/*@RequiredArgsConstructor*/
public class OpportunityServiceApplication /*implements CommandLineRunner*/ {

    /*private final GeoNamesDataImporter importer;*/

    public static void main(String[] args) {
        SpringApplication.run(OpportunityServiceApplication.class, args);
    }
    /*
    @Override
    public void run(String... args) throws IOException {
        System.out.println("Starting import...");
        importer.importAll(); // You’ll define this method next
        System.out.println("Import complete!");
    }
    */
}
