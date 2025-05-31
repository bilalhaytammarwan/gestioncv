package com.marouane.opportunityservice.exception.category;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class CategoryGetException extends ResponseStatusException {
    public CategoryGetException(HttpStatus httpStatus, String message) {
        super(httpStatus, message);
    }
}
