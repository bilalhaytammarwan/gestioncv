package com.marouane.searchservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Search {
    private String keyword;
    private String location;
    private int pageSize;
    private int page;
}
