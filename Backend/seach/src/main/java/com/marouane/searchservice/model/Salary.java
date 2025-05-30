package com.marouane.searchservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Salary {

    private String currency;

    private double min;

    private double max;

    private Unit unit;
}
