package com.marouane.opportunityservice.controller;

import com.marouane.opportunityservice.model.Location;
import com.marouane.opportunityservice.service.LocationValidationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/job")
@RequiredArgsConstructor
public class LocalValidationController {

    private final LocationValidationService locationValidationService;

    @PostMapping("/validate-location")
    public String validateLocation(@RequestBody @Valid Location location) {
        boolean isValid = locationValidationService.validateLocation(location);
        if (isValid) {
            return "Location is valid!";
        } else {
            return "Invalid location (city, region, or country)";
        }
    }
}
