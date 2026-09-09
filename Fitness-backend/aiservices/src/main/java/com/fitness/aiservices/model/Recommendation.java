package com.fitness.aiservices.model;

import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "recommendation")
@Data
@Builder
public class Recommendation {
    @Id
    private String id;
    private String activityId;
    private String type;
    private String userId;
    private String recommendation;
    private Integer duration;
    private Integer caloriesBurned;
    private Map<String, Object> additionalMatrics;
    private List<String> improvements;
    private List<String>suggestions;
    private List<String> safety;

    @CreatedDate
    private LocalDateTime createdAt;
}
