package com.marouane.opportunityservice.exception.opportunity;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OpportunityGetException extends ResponseStatusException {
    public OpportunityGetException(HttpStatus httpStatus, String message) {
        super(httpStatus, message);
    }
}
