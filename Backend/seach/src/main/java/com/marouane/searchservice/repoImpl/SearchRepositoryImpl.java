package com.marouane.searchservice.repoImpl;


import com.marouane.searchservice.dto.OpportunitySearchResponse;
import com.marouane.searchservice.dto.OpportunitySearchResult;
import com.marouane.searchservice.dto.SimilarOpportunityResponse;
import com.marouane.searchservice.mapper.OpportunityMapper;
import com.marouane.searchservice.model.Opportunity;
import com.marouane.searchservice.repo.SearchRepo;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import lombok.RequiredArgsConstructor;
import org.bson.BsonNull;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SearchRepositoryImpl implements SearchRepo {
    private final MongoClient client;
    private final MongoConverter converter;
    private final OpportunityMapper opportunityMapper;

    @Override
    public OpportunitySearchResponse findOpportunitiesByKeywordOrLocation(
            String keyword,
            String location,
            int pageSize,
            int page
    ) {
        final List<OpportunitySearchResult> opportunities = new ArrayList<>();
        int skip = Math.max(0, page - 1) * pageSize;

        MongoDatabase database = client.getDatabase("opportunity-service");
        MongoCollection<Document> collection = database.getCollection("opportunities");

        List<Document> keywordQueries = new ArrayList<>();
        List<Document> locationQueries = new ArrayList<>();

        if (keyword != null && !keyword.trim().isEmpty()) {
            keywordQueries.addAll(Arrays.asList(
                    new Document("autocomplete", new Document("query", keyword)
                            .append("path", "title")
                            .append("score", new Document("boost", new Document("value", 100)))),
                    new Document("autocomplete", new Document("query", keyword)
                            .append("path", "description")
                            .append("score", new Document("boost", new Document("value", 8)))),
                    new Document("autocomplete", new Document("query", keyword)
                            .append("path", "requirements")
                            .append("score", new Document("boost", new Document("value", 6)))),
                    new Document("autocomplete", new Document("query", keyword)
                            .append("path", "benefits")
                            .append("score", new Document("boost", new Document("value", 4)))),
                    new Document("autocomplete", new Document("query", keyword)
                            .append("path", "responsibilities")
                            .append("score", new Document("boost", new Document("value", 2)))),
                    new Document("text", new Document("query", keyword)
                            .append("path", "jobType")
                            .append("score", new Document("boost", new Document("value", 1))))
            ));
        }

        if (location != null && !location.trim().isEmpty()) {
            locationQueries.addAll(Arrays.asList(
                    new Document("text", new Document("query", location).append("path", "jobLocation.country")),
                    new Document("text", new Document("query", location).append("path", "jobLocation.region")),
                    new Document("text", new Document("query", location).append("path", "jobLocation.city"))
            ));
        }

        List<Bson> pipeline = new ArrayList<>();
        AggregateIterable<Document> result;

        if (keywordQueries.isEmpty() && locationQueries.isEmpty()) {
            result = collection.aggregate(Arrays.asList(
                    new Document("$project", new Document("title", 1L)
                            .append("jobLocation", 1L)
                            .append("salary", 1L)
                            .append("createdAt", 1L)
                            .append("updatedAt", 1L)
                            .append("jobType", 1L)
                            .append("applicationDeadline", 1L)
                            .append("remote", 1L)
                            .append("companyId", 1L)),
                    new Document("$sort", new Document("createdAt", -1)),
                    new Document("$skip", skip),
                    new Document("$limit", pageSize)
            ));
        } else {
            List<Document> mustQueries = new ArrayList<>();
            if (!keywordQueries.isEmpty()) {
                mustQueries.add(new Document("compound", new Document("should", keywordQueries)));
            }
            if (!locationQueries.isEmpty()) {
                mustQueries.add(new Document("compound", new Document("should", locationQueries)));
            }

            pipeline.add(new Document("$search", new Document("index", "searchOpportunity")
                    .append("compound", new Document("must", mustQueries))));

            pipeline.add(new Document("$project", new Document("title", 1L)
                    .append("jobLocation", 1L)
                    .append("salary", 1L)
                    .append("createdAt", 1L)
                    .append("updatedAt", 1L)
                    .append("jobType", 1L)
                    .append("applicationDeadline", 1L)
                    .append("remote", 1L)
                    .append("companyId", 1L)
                    .append("score", new Document("$meta", "searchScore"))));

            pipeline.add(new Document("$sort", new Document("score", -1).append("createdAt", -1)));
            pipeline.add(new Document("$skip", skip));
            pipeline.add(new Document("$limit", pageSize));

            result = collection.aggregate(pipeline);
        }

        List<Bson> countPipeline = new ArrayList<>();
        if (!keywordQueries.isEmpty() || !locationQueries.isEmpty()) {
            List<Document> mustQueries = new ArrayList<>();
            if (!keywordQueries.isEmpty()) {
                mustQueries.add(new Document("compound", new Document("should", keywordQueries)));
            }
            if (!locationQueries.isEmpty()) {
                mustQueries.add(new Document("compound", new Document("should", locationQueries)));
            }
            countPipeline.add(new Document("$search", new Document("index", "searchOpportunity")
                    .append("compound", new Document("must", mustQueries))));
        }
        countPipeline.add(new Document("$count", "count"));
        AggregateIterable<Document> countResult = collection.aggregate(countPipeline);

        Document countDoc = countResult.first();
        long total = countDoc != null ? ((Number) countDoc.get("count")).longValue() : 0L;

        result.forEach(doc -> {
            opportunities.add(opportunityMapper.toDtoRes(converter.read(Opportunity.class, doc)));
        });

        return new OpportunitySearchResponse(opportunities, total);
    }

    @Override
    public List<SimilarOpportunityResponse> findSimilarOpportunitiesById(String id, int limit) {
        final List<SimilarOpportunityResponse> opportunities = new ArrayList<>();

        MongoDatabase database = client.getDatabase("opportunity-service");
        MongoCollection<Document> collection = database.getCollection("opportunities");

        Document original = collection.find(Filters.eq("_id", new ObjectId(id))).first();
        if (original == null) return opportunities;

        String title = original.getString("title");
        String city = getNestedField(original, "jobLocation.city");
        String country = getNestedField(original, "jobLocation.country");
        String region = getNestedField(original, "jobLocation.region");
        String categoryId = getNestedField(original, "categoryId");
        String companyId = getNestedField(original, "companyId");
        String jobType = getNestedField(original, "jobType");
        String unitSalary = getNestedField(original, "salary.unit");
        String currencySalary = getNestedField(original, "salary.currency");
        boolean remote = Boolean.parseBoolean(getNestedField(original, "remote"));

        double minSalary = Double.parseDouble(getNestedField(original, "salary.min"));
        double maxSalary = Double.parseDouble(getNestedField(original, "salary.max"));
        double rangeThreshold = 1.5 * (maxSalary - minSalary);

        List<Document> shouldQueries = Arrays.asList(
                new Document("autocomplete", new Document("query", title).append("path", "title").append("score", new Document("boost", new Document("value", 120)))),
                new Document("autocomplete", new Document("query", companyId).append("path", "companyId").append("score", new Document("boost", new Document("value", 8)))),
                new Document("autocomplete", new Document("query", city).append("path", "jobLocation.city").append("score", new Document("boost", new Document("value", 6)))),
                new Document("autocomplete", new Document("query", country).append("path", "jobLocation.country").append("score", new Document("boost", new Document("value", 6)))),
                new Document("autocomplete", new Document("query", region).append("path", "jobLocation.region").append("score", new Document("boost", new Document("value", 6)))),
                new Document("autocomplete", new Document("query", unitSalary).append("path", "salary.unit").append("score", new Document("boost", new Document("value", 4)))),
                new Document("autocomplete", new Document("query", currencySalary).append("path", "salary.currency").append("score", new Document("boost", new Document("value", 4)))),
                new Document("autocomplete", new Document("query", categoryId).append("path", "categoryId").append("score", new Document("boost", new Document("value", 2)))),
                new Document("autocomplete", new Document("query", jobType).append("path", "jobType").append("score", new Document("boost", new Document("value", 1)))),
                new Document("text", new Document("query", "ACTIVE").append("path", "status"))
        );

        List<Bson> pipeline = new ArrayList<>();

        pipeline.add(new Document("$search", new Document("index", "searchOpportunity")
                .append("compound", new Document("should", shouldQueries)
                        .append("mustNot", List.of(
                                new Document("equals", new Document("path", "_id").append("value", new ObjectId(id)))
                        ))
                )
        ));

        pipeline.add(new Document("$match", new Document("_id", new Document("$ne", new ObjectId(id))))); // Manual exclusion (backup)

        pipeline.add(new Document("$addFields", new Document("salaryRange",
                new Document("$subtract", Arrays.asList("$salary.max", "$salary.min")))));

        pipeline.add(new Document("$match", new Document("salary.min", new Document("$lte", maxSalary))
                .append("salary.max", new Document("$gte", minSalary))
                .append("salaryRange", new Document("$lte", rangeThreshold))
                .append("remote", remote)));

        pipeline.add(new Document("$project", new Document("_id", 1)
                .append("title", 1)
                .append("companyId", 1)
                .append("jobLocation", 1)
                .append("salary", 1)));

        pipeline.add(new Document("$limit", limit));
        AggregateIterable<Document> result = collection.aggregate(pipeline);
        result.forEach(doc -> opportunities.add(converter.read(SimilarOpportunityResponse.class, doc)));

        return opportunities;
    }

    private String getNestedField(Document doc, String path) {
        String[] parts = path.split("\\.");
        Object current = doc;
        for (String part : parts) {
            if (!(current instanceof Document)) return "";
            current = ((Document) current).get(part);
            if (current == null) return "";
        }
        return current.toString();
    }

    @Override
    public List<String> autoCompleteSearchByKeyword(String keyword) {
        MongoDatabase database = client.getDatabase("opportunity-service");
        MongoCollection<Document> collection = database.getCollection("opportunities");

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                new Document("$search", new Document("index", "autoCompleteSearchOpportunity")
                        .append("compound", new Document("should", Arrays.asList(
                                new Document("autocomplete", new Document("query", keyword)
                                        .append("path", "title")
                                        .append("tokenOrder", "sequential")),
                                new Document("autocomplete", new Document("query", keyword)
                                        .append("path", "tags")
                                        .append("tokenOrder", "sequential"))
                        )))
                ),
                new Document("$set", new Document()
                        .append("titleSuggestion", new Document("$cond", Arrays.asList(
                                new Document("$regexMatch", new Document("input", "$title")
                                        .append("regex", "^" + keyword)
                                        .append("options", "i")),
                                Arrays.asList("$title"),
                                Arrays.asList()
                        )))
                        .append("tagSuggestions", new Document("$filter", new Document()
                                .append("input", "$tags")
                                .append("as", "tag")
                                .append("cond", new Document("$regexMatch", new Document()
                                        .append("input", "$$tag")
                                        .append("regex", "^" + keyword)
                                        .append("options", "i")
                                ))
                        ))
                ),
                new Document("$group", new Document("_id", null)
                        .append("titles", new Document("$push", "$titleSuggestion"))
                        .append("tags", new Document("$push", "$tagSuggestions"))
                ),
                new Document("$project", new Document()
                        .append("titles", new Document("$reduce", new Document()
                                .append("input", "$titles")
                                .append("initialValue", Arrays.asList())
                                .append("in", new Document("$concatArrays", Arrays.asList("$$value", "$$this")))
                        ))
                        .append("tags", new Document("$reduce", new Document()
                                .append("input", "$tags")
                                .append("initialValue", Arrays.asList())
                                .append("in", new Document("$concatArrays", Arrays.asList("$$value", "$$this")))
                        ))
                ),
                new Document("$project", new Document("allSuggestions",
                        new Document("$concatArrays", Arrays.asList("$titles", "$tags"))
                )),
                new Document("$project", new Document("suggestions",
                        new Document("$let", new Document()
                                .append("vars", new Document("lowercasedSuggestions",
                                        new Document("$map", new Document()
                                                .append("input", "$allSuggestions")
                                                .append("as", "item")
                                                .append("in", new Document("$toLower", "$$item"))
                                        )
                                ))
                                .append("in", new Document("$reduce", new Document()
                                        .append("input", new Document("$range", Arrays.asList(0, new Document("$size", "$allSuggestions"))))
                                        .append("initialValue", new Document("original", Arrays.asList()).append("lowercased", Arrays.asList()))
                                        .append("in", new Document("$cond", Arrays.asList(
                                                        new Document("$in", Arrays.asList(
                                                                new Document("$arrayElemAt", Arrays.asList("$$lowercasedSuggestions", "$$this")),
                                                                "$$value.lowercased"
                                                        )),
                                                        "$$value",
                                                        new Document("original", new Document("$concatArrays", Arrays.asList(
                                                                "$$value.original", Arrays.asList(new Document("$arrayElemAt", Arrays.asList("$allSuggestions", "$$this")))
                                                        ))).append("lowercased", new Document("$concatArrays", Arrays.asList(
                                                                "$$value.lowercased", Arrays.asList(new Document("$arrayElemAt", Arrays.asList("$$lowercasedSuggestions", "$$this")))
                                                        )))
                                                ))
                                        ))
                                ))
                )),
                new Document("$project", new Document("suggestions",
                        new Document("$slice", Arrays.asList("$suggestions.lowercased", 10))
                )),
                new Document("$group", new Document("_id", "$suggestions"))
        ));

        Document firstDoc = result.first();
        if (firstDoc != null) {
            @SuppressWarnings("unchecked")
            List<String> suggestions = (List<String>) firstDoc.get("_id");
            return suggestions;
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<String> SearchByLocation(String location) {
        MongoDatabase database = client.getDatabase("opportunity-service");
        MongoCollection<Document> collection = database.getCollection("opportunities");

        final List<String> locations = new ArrayList<String>();

        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(new Document("$search",
                        new Document("index", "searchLocation")
                                .append("compound",
                                        new Document("should", Arrays.asList(new Document("autocomplete",
                                                        new Document("query", location)
                                                                .append("path", "jobLocation.country")
                                                                .append("tokenOrder", "sequential")),
                                                new Document("autocomplete",
                                                        new Document("query", location)
                                                                .append("path", "jobLocation.region")
                                                                .append("tokenOrder", "sequential")),
                                                new Document("autocomplete",
                                                        new Document("query", location)
                                                                .append("path", "jobLocation.city")
                                                                .append("tokenOrder", "sequential")))))),
                new Document("$set",
                        new Document("citySuggestion",
                                new Document("$cond", Arrays.asList(new Document("$regexMatch",
                                        new Document("input", "$jobLocation.city")
                                                .append("regex", "^"+location)
                                                .append("options", "i")), Arrays.asList("$jobLocation.city"), Arrays.asList())))
                                .append("regionSuggestion",
                                        new Document("$cond", Arrays.asList(new Document("$regexMatch",
                                                new Document("input", "$jobLocation.region")
                                                        .append("regex", "^"+location)
                                                        .append("options", "i")), Arrays.asList("$jobLocation.region"), Arrays.asList())))
                                .append("countrySuggestion",
                                        new Document("$cond", Arrays.asList(new Document("$regexMatch",
                                                new Document("input", "$jobLocation.country")
                                                        .append("regex", "^"+location)
                                                        .append("options", "i")), Arrays.asList("$jobLocation.country"), Arrays.asList())))),
                new Document("$group",
                        new Document("_id",
                                new BsonNull())
                                .append("cities",
                                        new Document("$push", "$citySuggestion"))
                                .append("regions",
                                        new Document("$push", "$regionSuggestion"))
                                .append("countries",
                                        new Document("$push", "$countrySuggestion"))),
                new Document("$project",
                        new Document("cities",
                                new Document("$reduce",
                                        new Document("input", "$cities")
                                                .append("initialValue", Arrays.asList())
                                                .append("in",
                                                        new Document("$concatArrays", Arrays.asList("$$value", "$$this")))))
                                .append("regions",
                                        new Document("$reduce",
                                                new Document("input", "$regions")
                                                        .append("initialValue", Arrays.asList())
                                                        .append("in",
                                                                new Document("$concatArrays", Arrays.asList("$$value", "$$this")))))
                                .append("countries",
                                        new Document("$reduce",
                                                new Document("input", "$countries")
                                                        .append("initialValue", Arrays.asList())
                                                        .append("in",
                                                                new Document("$concatArrays", Arrays.asList("$$value", "$$this")))))),
                new Document("$project",
                        new Document("allSuggestions",
                                new Document("$concatArrays", Arrays.asList("$cities", "$regions", "$countries")))),
                new Document("$project",
                        new Document("suggestions",
                                new Document("$let",
                                        new Document("vars",
                                                new Document("lowercasedSuggestions",
                                                        new Document("$map",
                                                                new Document("input", "$allSuggestions")
                                                                        .append("as", "item")
                                                                        .append("in",
                                                                                new Document("$toLower", "$$item")))))
                                                .append("in",
                                                        new Document("$reduce",
                                                                new Document("input",
                                                                        new Document("$range", Arrays.asList(0L,
                                                                                new Document("$size", "$allSuggestions"))))
                                                                        .append("initialValue",
                                                                                new Document("original", Arrays.asList())
                                                                                        .append("lowercased", Arrays.asList()))
                                                                        .append("in",
                                                                                new Document("$cond", Arrays.asList(new Document("$in", Arrays.asList(new Document("$arrayElemAt", Arrays.asList("$$lowercasedSuggestions", "$$this")), "$$value.lowercased")), "$$value",
                                                                                        new Document("original",
                                                                                                new Document("$concatArrays", Arrays.asList("$$value.original", Arrays.asList(new Document("$arrayElemAt", Arrays.asList("$allSuggestions", "$$this"))))))
                                                                                                .append("lowercased",
                                                                                                        new Document("$concatArrays", Arrays.asList("$$value.lowercased", Arrays.asList(new Document("$arrayElemAt", Arrays.asList("$$lowercasedSuggestions", "$$this")))))))))))))),
                new Document("$project",
                        new Document("suggestions",
                                new Document("$slice", Arrays.asList("$suggestions.original", 10L)))),
                new Document("$group",
                        new Document("_id", "$suggestions"))));

        Document firstDoc = result.first();
        if (firstDoc != null) {
            @SuppressWarnings("unchecked")
            List<String> suggestions = (List<String>) firstDoc.get("_id");
            return suggestions;
        } else {
            return Collections.emptyList();
        }
    }
}