package com.marouane.searchservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AppException extends ResponseStatusException {
    public AppException(HttpStatus httpStatus, String message) {
        super(httpStatus, message);
    }
}