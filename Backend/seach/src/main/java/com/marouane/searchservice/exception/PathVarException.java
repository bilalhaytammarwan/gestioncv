package com.marouane.searchservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PathVarException extends AppException {
    public PathVarException(HttpStatus httpStatus, String message) {
        super(httpStatus, message);
    }
}