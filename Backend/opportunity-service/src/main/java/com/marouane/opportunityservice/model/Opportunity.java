package com.marouane.opportunityservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@TypeAlias("opportunity")
@Data
@AllArgsConstructor
@NoArgsConstructor
@CompoundIndexes({
        @CompoundIndex(
                name = "unique_title_company",
                def = "{'title': 1, 'companyId': 1}",
                unique = true
        ),
        @CompoundIndex(
                name = "unique_title_company_postDate",
                def = "{'title': 1, 'companyId': 1, 'postDate': 1}",
                unique = true
        )
})
@Document("opportunities")
public class Opportunity {

    @Id
    private String id;

    private String companyId;

    private String title;

    private String description;

    private String categoryId;

    private Date createdAt;

    private Date updatedAt;

    private JobType jobType;

    private Salary salary;

    private Location jobLocation;

    private Status status;

    private Date applicationDeadline;

    private boolean remote;

    private List<String> requirements;

    private List<String> responsibilities;

    private List<String> benefits;

//    private int yearsOfExperience;

    private List<String> tags; // Using AI/NLP Tag Extraction (Auto-tagging)

//    private List<String> searchSuggestions;

    private String url;

}
