package com.marouane.usertoken.exceptionHandler;

import com.marouane.usertoken.exception.PathVarException;
import com.marouane.usertoken.exception.token.TokenCreationException;
import com.marouane.usertoken.exception.token.TokenDeleteException;
import com.marouane.usertoken.exception.token.TokenGetException;
import com.marouane.usertoken.exception.token.TokenUpdateException;
import com.marouane.usertoken.exception.user.UserCreationException;
import com.marouane.usertoken.exception.user.UserDeleteException;
import com.marouane.usertoken.exception.user.UserGetException;
import com.marouane.usertoken.exception.user.UserUpdateException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Order(3)
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserCreationException.class)
    public ResponseEntity<?> handleUserCreationException(UserCreationException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("USER_CREATION_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(UserUpdateException.class)
    public ResponseEntity<?> handleUserUpdateException(UserUpdateException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("USER_UPDATE_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(UserDeleteException.class)
    public ResponseEntity<?> handleUserDeleteException(UserDeleteException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("USER_DELETE_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(UserGetException.class)
    public ResponseEntity<?> handleUserGetException(UserGetException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(new ErrorResponse("USER_FETCH_FAILED", ex.getMessage()));
    }



    @ExceptionHandler(TokenCreationException.class)
    public ResponseEntity<?> handleTokenCreationException(TokenCreationException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("TOKEN_CREATION_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(TokenUpdateException.class)
    public ResponseEntity<?> handleTokenUpdateException(TokenUpdateException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("TOKEN_UPDATE_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(TokenDeleteException.class)
    public ResponseEntity<?> handleTokenDeleteException(TokenDeleteException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("TOKEN_DELETE_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(TokenGetException.class)
    public ResponseEntity<?> handleTokenGetException(TokenGetException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(new ErrorResponse("TOKEN_FETCH_FAILED", ex.getMessage()));
    }



    @ExceptionHandler(PathVarException.class)
    public ResponseEntity<?> handlePathVarException(PathVarException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(new ErrorResponse("PATH_VAR_ERROR", ex.getMessage()));
    }
//    @ExceptionHandler(AccessDeniedException.class)
//    public ResponseEntity<Object> handleAccessDenied(AccessDeniedException ex) {
//        ErrorResponse errorResponse = new ErrorResponse("ACCESS_DENIED", "You do not have permission to perform this operation.");
//        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
//    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        return new ResponseEntity<>(new ErrorResponse("GENERAL_ERROR", ex.getMessage()), HttpStatus.NOT_FOUND);
    }
}

