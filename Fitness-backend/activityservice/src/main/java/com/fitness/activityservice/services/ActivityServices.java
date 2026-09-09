package com.fitness.activityservice.services;

import com.fitness.activityservice.ActivityRepository;
import com.fitness.activityservice.dto.ActivityRequest;
import com.fitness.activityservice.dto.ActivityResponse;
import com.fitness.activityservice.model.Activity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityServices {
    private final ActivityRepository activityRepository;
    private final UserValidationService userValidationService;
    private final KafkaTemplate<String , Activity> kafkaTemplate;
    private final CalorieCalculationService calorieCalculationService;
    @Value("${kafka.topic.name}")
    private String topicName;

    public ActivityResponse trackActivity(ActivityRequest request) {
        boolean isValidUser =userValidationService.validateUser(request.getUserId());
        if(!isValidUser){
            throw new RuntimeException("Invalid User: "+request.getUserId());
        }

        Integer calculatedCalories = calorieCalculationService.calculateCalories(
                        request.getType(),
                        request.getDuration()
                );

  Activity activity= Activity.builder()
          .userId(request.getUserId())
          .type(request.getType())
          .duration(request.getDuration())
          .caloriesBurned(calculatedCalories)
          .activityDate(request.getActivityDate())
          .additionalMatrics(request.getAdditionalMatrics())
          .build();



Activity savedActivity=activityRepository.save(activity);

try{
    kafkaTemplate.send(topicName, savedActivity.getUserId(),savedActivity);
}catch (Exception e){
    e.printStackTrace();
}
return mapToResponse(savedActivity);
    }

    private ActivityResponse mapToResponse(Activity activity) {
ActivityResponse response=new ActivityResponse();
response.setId(activity.getId());
response.setUserId(activity.getUserId());
response.setType(activity.getType());
response.setDuration(activity.getDuration());
response.setCaloriesBurned(activity.getCaloriesBurned());
response.setActivityDate(activity.getActivityDate());
response.setAdditionalMatrics(activity.getAdditionalMatrics());
response.setCreatedAt(activity.getCreatedAt());
response.setUpdatedAt(activity.getUpdatedAt());
return response;
    }


    public List<ActivityResponse> getUserActivities(String userId) {
       List<Activity>activityList= activityRepository.findByUserId(userId);

       return activityList.stream()
               .map(this::mapToResponse)
               .collect(Collectors.toList());
    }

    public void deleteActivity(String activityId) {

        if (!activityRepository.existsById(activityId)) {
            throw new RuntimeException("Activity not found");
        }

        activityRepository.deleteById(activityId);
    }
}
