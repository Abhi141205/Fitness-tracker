package com.fitness.userservice.dto;

import com.fitness.userservice.models.UserRole;
import lombok.Data;


import java.time.LocalDateTime;
@Data
public class UserResponse {
    private String id;
    private String keycloakId;
    private String email;
 private String password;
    private String firstName;
    private String lastName;
    private Integer dailyGoal;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
