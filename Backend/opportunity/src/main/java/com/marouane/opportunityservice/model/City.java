package com.marouane.opportunityservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("cities")
public class City {
    @Id
    private String id;
    private String name;
    private String admin1Code; // region code
    private String countryCode;
}

