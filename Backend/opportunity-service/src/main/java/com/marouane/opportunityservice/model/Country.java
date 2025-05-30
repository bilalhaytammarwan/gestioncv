package com.marouane.opportunityservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("countries")
public class Country {
    @Id
    private String id;
    private String code;
    private String name;
}
