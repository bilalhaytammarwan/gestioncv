package com.marouane.usertoken.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class PathVarException extends ResponseStatusException {
    public PathVarException(HttpStatus httpStatus, String message) {
        super(httpStatus, message);
    }
}