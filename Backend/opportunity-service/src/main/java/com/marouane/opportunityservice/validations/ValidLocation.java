package com.marouane.opportunityservice.validations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

//@Documented
//@Constraint(validatedBy = LocationValidator.class) // Custom validator
//@Target({ ElementType.TYPE }) // Use TYPE for class-level
////@Target({ ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE })
//@Retention(RetentionPolicy.RUNTIME)
public @interface ValidLocation {
//    String message() default "Invalid location (city, region, or country)";
//    Class<?>[] groups() default {};
//    Class<? extends Payload>[] payload() default {};
}
