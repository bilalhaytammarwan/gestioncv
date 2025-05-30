package com.marouane.opportunityservice.validations;

import com.marouane.opportunityservice.model.Salary;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class SalaryValidator implements ConstraintValidator<ValidSalary, Salary> {
    @Override
    public boolean isValid(Salary salary, ConstraintValidatorContext context) {
        return salary.getMax() >= salary.getMin();
    }
}