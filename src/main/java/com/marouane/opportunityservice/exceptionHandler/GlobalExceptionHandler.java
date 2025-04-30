package com.marouane.opportunityservice.exceptionHandler;

import com.marouane.opportunityservice.exception.PathVarException;
import com.marouane.opportunityservice.exception.category.CategoryCreationException;
import com.marouane.opportunityservice.exception.category.CategoryDeleteException;
import com.marouane.opportunityservice.exception.category.CategoryGetException;
import com.marouane.opportunityservice.exception.category.CategoryUpdateException;
import com.marouane.opportunityservice.exception.opportunity.OpportunityCreationException;
import com.marouane.opportunityservice.exception.opportunity.OpportunityDeleteException;
import com.marouane.opportunityservice.exception.opportunity.OpportunityGetException;
import com.marouane.opportunityservice.exception.opportunity.OpportunityUpdateException;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Order(2)
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(OpportunityCreationException.class)
    public ResponseEntity<?> handleOpportunityCreationException(OpportunityCreationException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("OPPORTUNITY_CREATION_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(OpportunityUpdateException.class)
    public ResponseEntity<?> handleOpportunityUpdateException(OpportunityUpdateException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("OPPORTUNITY_UPDATE_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(OpportunityDeleteException.class)
    public ResponseEntity<?> handleOpportunityDeleteException(OpportunityDeleteException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("OPPORTUNITY_DELETE_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(OpportunityGetException.class)
    public ResponseEntity<?> handleOpportunityGetException(OpportunityGetException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(new ErrorResponse("OPPORTUNITY_FETCH_FAILED", ex.getMessage()));
    }



    @ExceptionHandler(CategoryCreationException.class)
    public ResponseEntity<?> handleCategoryCreationException(CategoryCreationException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("CATEGORY_CREATION_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(CategoryUpdateException.class)
    public ResponseEntity<?> handleCategoryUpdateException(CategoryUpdateException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("CATEGORY_UPDATE_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(CategoryDeleteException.class)
    public ResponseEntity<?> handleCategoryDeleteException(CategoryDeleteException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("CATEGORY_DELETE_FAILED", ex.getMessage()));
    }
    @ExceptionHandler(CategoryGetException.class)
    public ResponseEntity<?> handleCategoryGetException(CategoryGetException ex) {
        return ResponseEntity.status(ex.getStatusCode())
                .body(new ErrorResponse("CATEGORY_FETCH_FAILED", ex.getMessage()));
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

