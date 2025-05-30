package com.marouane.opportunityservice.dto;

import com.marouane.opportunityservice.model.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class OpportunityDTOresponse {
    private String id;
    private String companyId;
    private String name; // Company name
    private String title;
    private String description;
    private String categoryId;
    private String categoryName;
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
    private List<String> tags;
    private String url;



}
