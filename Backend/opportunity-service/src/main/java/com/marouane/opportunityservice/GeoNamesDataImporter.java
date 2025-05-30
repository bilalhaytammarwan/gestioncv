//package com.marouane.opportunityservice;
//
//import com.marouane.opportunityservice.model.City;
//import com.marouane.opportunityservice.model.Country;
//import com.marouane.opportunityservice.model.Region;
//import com.marouane.opportunityservice.repository.CityRepository;
//import com.marouane.opportunityservice.repository.CountryRepository;
//import com.marouane.opportunityservice.repository.RegionRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//
//import java.io.BufferedReader;
//import java.io.IOException;
//import java.io.InputStreamReader;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//
//@Service
//@RequiredArgsConstructor
//public class GeoNamesDataImporter {
//
//    private final CountryRepository countryRepository;
//    private final RegionRepository regionRepository;
//    private final CityRepository cityRepository;
//
//    public void importAll() throws IOException {
//        if (countryRepository.count() == 0) importCountriesFromResource("data/countryInfo.txt");
//        if (regionRepository.count() == 0) importRegionsFromResource("data/admin1CodesASCII.txt");
//        if (cityRepository.count() == 0) importCitiesFromResource("data/cities1000.txt");
//    }
//
//    private void importCountries(String path) throws IOException {
//        Files.lines(Paths.get(path))
//                .filter(line -> !line.startsWith("#"))
//                .map(line -> line.split("\t"))
//                .map(parts -> new Country(null, parts[0], parts[4])) // [0]=code, [4]=name
//                .forEach(countryRepository::save);
//    }
//    private void importCountriesFromResource(String resourcePath) throws IOException {
//        try (var stream = getClass().getClassLoader().getResourceAsStream(resourcePath)) {
//            if (stream == null) throw new IllegalArgumentException("File not found: " + resourcePath);
//
//            new BufferedReader(new InputStreamReader(stream))
//                    .lines()
//                    .filter(line -> !line.startsWith("#"))
//                    .map(line -> line.split("\t"))
//                    .map(parts -> new Country(null, parts[0], parts[4]))
//                    .forEach(countryRepository::save);
//        }
//    }
//
//    private void importRegions(String path) throws IOException {
//        Files.lines(Paths.get(path))
//                .map(line -> line.split("\t"))
//                .map(parts -> new Region(null, parts[0], parts[1], parts[0].split("\\.")[0])) // [0]=MA.06, [1]=name
//                .forEach(regionRepository::save);
//    }
//    private void importRegionsFromResource(String resourcePath) throws IOException {
//        try (var stream = getClass().getClassLoader().getResourceAsStream(resourcePath)) {
//            if (stream == null) throw new IllegalArgumentException("File not found: " + resourcePath);
//
//            new BufferedReader(new InputStreamReader(stream))
//                    .lines()
//                    .filter(line -> !line.startsWith("#"))
//                    .map(line -> line.split("\t"))
//                    .map(parts -> new Region(null, parts[0], parts[1], parts[0].split("\\.")[0])) // [0]=MA.06, [1]=name
//                    .forEach(regionRepository::save);
//        }
//    }
//
//    private void importCities(String path) throws IOException {
//        Files.lines(Paths.get(path))
//                .map(line -> line.split("\t"))
//                .map(parts -> new City(null, parts[1], parts[10], parts[8])) // [1]=name, [10]=admin1Code, [8]=countryCode
//                .forEach(cityRepository::save);
//    }
//    private void importCitiesFromResource(String resourcePath) throws IOException {
//        try (var stream = getClass().getClassLoader().getResourceAsStream(resourcePath)) {
//            if (stream == null) throw new IllegalArgumentException("File not found: " + resourcePath);
//
//            new BufferedReader(new InputStreamReader(stream))
//                    .lines()
//                    .filter(line -> !line.startsWith("#"))
//                    .map(line -> line.split("\t"))
//                    .map(parts -> new City(null, parts[1], parts[10], parts[8])) // [1]=name, [10]=admin1Code, [8]=countryCode
//                    .forEach(cityRepository::save);
//        }
//    }
//}
//
