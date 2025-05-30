package com.marouane.opportunityservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("regions")
public class Region {
    @Id
    private String id;
    private String code; // Example: MA.06
    private String name;
    private String countryCode; // e.g. MA
}

