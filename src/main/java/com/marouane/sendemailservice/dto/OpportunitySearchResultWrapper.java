package com.marouane.sendemailservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OpportunitySearchResultWrapper {
        private String id;
        private String companyName;
        private String companyId;
        private String title;
//        private Salary salary;
//        private Location jobLocation;
}
