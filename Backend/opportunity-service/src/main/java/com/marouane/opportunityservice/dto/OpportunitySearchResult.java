package com.marouane.opportunityservice.dto;

import com.marouane.opportunityservice.model.JobType;
import com.marouane.opportunityservice.model.Location;
import com.marouane.opportunityservice.model.Salary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpportunitySearchResult {
    private String id;
    private String companyName;
    private String companyId = "";
    private String title;
    private String description;
    private String categoryName;
    private Date createdAt;
    private Date updatedAt;
    private JobType jobType;
    private Salary salary;
    private Location jobLocation;
//    private Status status;
    private Date applicationDeadline;
    private boolean remote;
    private List<String> requirements;
    private List<String> responsibilities;
    private List<String> benefits;
//    private int yearsOfExperience;
}
