package com.marouane.opportunityservice.dto;

import com.marouane.opportunityservice.model.JobType;
import com.marouane.opportunityservice.model.Location;
import com.marouane.opportunityservice.model.Salary;
import com.marouane.opportunityservice.model.Status;
import org.springframework.data.annotation.Id;

import java.util.Date;
import java.util.List;

public class OpportunityCandidateDTO {
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

    private int yearsOfExperience;

    private List<String> tags; // Using AI/NLP Tag Extraction (Auto-tagging)

//    private List<String> searchSuggestions;

    private String url;

}
