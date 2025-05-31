package com.marouane.opportunityservice.service;

import com.marouane.opportunityservice.model.Location;
import com.marouane.opportunityservice.model.City;
import com.marouane.opportunityservice.model.Country;
import com.marouane.opportunityservice.model.Region;
import com.marouane.opportunityservice.repo.CityRepository;
import com.marouane.opportunityservice.repo.CountryRepository;
import com.marouane.opportunityservice.repo.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LocationValidationService {

    private final CityRepository cityRepository;
    private final RegionRepository regionRepository;
    private final CountryRepository countryRepository;

    // Validate Location using city, region, country from the Location model
    public boolean validateLocation(String cityName, String regionName, String countryName) {
        Country country = countryRepository.findByNameIgnoreCase(countryName);
        if (country == null) return false;

        Region region = regionRepository.findByNameIgnoreCaseAndCountryCode(regionName, country.getCode());
        if (region == null) return false;

        City city = cityRepository.findByNameIgnoreCaseAndAdmin1CodeAndCountryCode(cityName, region.getCode().split("\\.")[1], country.getCode());
        return city != null;
    }

    // Validate location using the Location model directly
    public boolean validateLocation(Location location) {
        return validateLocation(location.getCity(), location.getRegion(), location.getCountry());
    }
}