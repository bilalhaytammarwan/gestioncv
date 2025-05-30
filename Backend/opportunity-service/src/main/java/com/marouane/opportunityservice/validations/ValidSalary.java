package com.marouane.opportunityservice.validations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = SalaryValidator.class)
public @interface ValidSalary {
    String message() default "Maximum salary must be greater than or equal to minimum salary.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
