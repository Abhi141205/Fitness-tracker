package com.fitness.activityservice.dto;

import com.fitness.activityservice.model.ActivityType;
import lombok.Data;

import java.time.LocalDate;
import java.util.Map;
@Data
public class ActivityRequest {
    private String userId;
    private ActivityType type;
    private Integer duration;

    private LocalDate activityDate;
    private Map<String , Object>additionalMatrics;

}

