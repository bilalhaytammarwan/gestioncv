package com.marouane.searchservice.exceptionHandler;

import com.marouane.searchservice.exception.PathVarException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Order(1)
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PathVarException.class)
    public ResponseEntity<?> handlePathVarException(PathVarException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(new ErrorResponse("PATH_VAR_ERROR", ex.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        return new ResponseEntity<>(new ErrorResponse("GENERAL_ERROR", ex.getMessage()), HttpStatus.NOT_FOUND);
    }
}

