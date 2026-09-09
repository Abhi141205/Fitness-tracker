package com.fitness.activityservice.services;

import com.fitness.activityservice.model.ActivityType;
import org.springframework.stereotype.Service;

@Service
public class CalorieCalculationService {

    public Integer calculateCalories(
            ActivityType type,
            Integer duration
    ) {

        if (duration == null || duration <= 0) {
            return 0;
        }

        int caloriesPerMinute;

        switch (type) {

            case RUNNING:
                caloriesPerMinute = 10;
                break;

            case WALKING:
                caloriesPerMinute = 4;
                break;

            case CYCLING, CARDIO:
                caloriesPerMinute = 8;
                break;

            case SWIMMING:
                caloriesPerMinute = 9;
                break;

            case WEIGHT_TRAINING:
                caloriesPerMinute = 6;
                break;

            case YOGA:
                caloriesPerMinute = 3;
                break;

            case STRETCHING:
                caloriesPerMinute = 2;
                break;

            default:
                caloriesPerMinute = 5;
        }

        return duration * caloriesPerMinute;
    }
}