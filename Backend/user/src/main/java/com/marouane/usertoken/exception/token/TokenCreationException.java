package com.marouane.usertoken.exception.token;

import com.marouane.usertoken.exception.AppException;

public class TokenCreationException extends AppException {
    public TokenCreationException(String message) {
        super(message);
    }
}
