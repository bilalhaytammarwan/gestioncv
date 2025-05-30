package com.marouane.opportunityservice.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Role {
    ADMIN,CANDIDATE,COMPANY;
    @JsonValue
    public String toValue() {
        return this.name();
    }

    @JsonCreator
    public static Role fromValue(String value) {
        return Role.valueOf(value.toUpperCase());
    }
}
