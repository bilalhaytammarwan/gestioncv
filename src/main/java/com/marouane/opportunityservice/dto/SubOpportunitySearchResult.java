package com.marouane.opportunityservice.dto;

import com.marouane.opportunityservice.model.JobType;
import com.marouane.opportunityservice.model.Location;
import com.marouane.opportunityservice.model.Salary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubOpportunitySearchResult {

    private String id;
    private String companyName;
    private String title;
    private Date createdAt;
    private Date updatedAt;
    private JobType jobType;
    private Salary salary;
    private Location jobLocation;
    private Date applicationDeadline;
    private boolean remote;
//    private int yearsOfExperience;

}
