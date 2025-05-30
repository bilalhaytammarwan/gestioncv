package com.marouane.usertoken.exception.token;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TokenGetException extends ResponseStatusException {
    public TokenGetException(HttpStatus httpStatus, String message) {
        super(httpStatus, message);
    }
}
