package com.marouane.searchservice.exception.opportunity;

import com.marouane.searchservice.exception.AppException;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OpportunitySearchException extends AppException {
    public OpportunitySearchException(HttpStatus httpStatus, String message) {
        super(httpStatus, message);
    }
}
