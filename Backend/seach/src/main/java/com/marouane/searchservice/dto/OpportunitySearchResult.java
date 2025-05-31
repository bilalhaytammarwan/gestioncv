package com.marouane.searchservice.dto;


import com.marouane.searchservice.model.JobType;
import com.marouane.searchservice.model.Location;
import com.marouane.searchservice.model.Salary;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpportunitySearchResult {

    private String id;
    private String companyId;
    private String companyName="";
    private String title;
    private Date createdAt;
    private Date updatedAt;
    private JobType jobType;
    private Salary salary;
    private Location jobLocation;
    private Date applicationDeadline;
    private boolean remote;

}
