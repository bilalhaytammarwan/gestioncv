package com.marouane.searchservice.service;//package com.marouane.opportunityservice.service;
//
//import java.util.ArrayList;
//import java.util.List;
//public class searchUtils {
//
//    public static List<String> buildSearchSuggestions(List<String> suggestions, String longText) {
//        if (longText == null || longText.isEmpty()) {
//            return suggestions;
//        }
//
//        String[] words = longText.split("\\s+");
//        for (int i = 0; i < words.length; i++) {
//            String suggestion = String.join(" ", List.of(words).subList(0, i + 1));
//            suggestions.add(suggestion);
//        }
//        return suggestions;
//    }
//
//    public static String buildSearchSuggestions(boolean remote) {
//        String suggestion="";
//
//        if (remote){
//            suggestion = "remote";
//        }
//
//        return suggestion;
//    }
//
//}
