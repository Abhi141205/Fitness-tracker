package com.fitness.userservice.services;

import com.fitness.userservice.UserRepository;
import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.models.User;
import lombok.AllArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository repository;
    public UserResponse register(RegisterRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
            User existingUser = repository.findByEmail(request.getEmail());
            UserResponse userResponse = new UserResponse();
            userResponse.setId(existingUser.getId());
            userResponse.setKeycloakId(existingUser.getKeycloakId());
            userResponse.setPassword(existingUser.getPassword());
            userResponse.setEmail(existingUser.getEmail());
            userResponse.setFirstName(existingUser.getFirstName());
            userResponse.setLastName(existingUser.getLastName());
            userResponse.setCreatedAt(existingUser.getCreatedAt());
            userResponse.setUpdatedAt(existingUser.getUpdatedAt());
            userResponse.setDailyGoal(existingUser.getDailyGoal());
            return userResponse;
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirstName());
        user.setKeycloakId(request.getKeycloakId());
        user.setLastName(request.getLastName());
        user.setPassword(request.getPassword());
        user.setDailyGoal(500);


        User savedUser = repository.save(user);

        UserResponse userResponse = new UserResponse();
        userResponse.setKeycloakId(savedUser.getKeycloakId());
        userResponse.setId(savedUser.getId());
        userResponse.setPassword(savedUser.getPassword());
        userResponse.setEmail(savedUser.getEmail());
        userResponse.setFirstName(savedUser.getFirstName());
        userResponse.setLastName(savedUser.getLastName());
        userResponse.setCreatedAt(savedUser.getCreatedAt());
        userResponse.setUpdatedAt(savedUser.getUpdatedAt());
        userResponse.setDailyGoal(savedUser.getDailyGoal());
        return userResponse;



    }

    public  UserResponse getUserProfile(String userId) {
        User user = repository.findByKeycloakId(userId)
                .orElseThrow(()->new RuntimeException("User not found"));
        UserResponse userResponse=new UserResponse();
        userResponse.setId(user.getId());
        userResponse.setPassword(user.getPassword());
        userResponse.setEmail(user.getEmail());
        userResponse.setDailyGoal(user.getDailyGoal());
        userResponse.setFirstName(user.getFirstName());
        userResponse.setLastName(user.getLastName());
        userResponse.setCreatedAt(user.getCreatedAt());
        userResponse.setUpdatedAt(user.getUpdatedAt());
        userResponse.setDailyGoal(user.getDailyGoal());
        return userResponse;
    }

    public Boolean existByUserId(String userId) {
        return repository.existsByKeycloakId(userId);
    }

    public UserResponse updateDailyGoal(String userId,Integer dailyGoal) {

        // Find user using Keycloak ID
        User user = repository.findByKeycloakId(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));


        // Validate goal
        if (dailyGoal == null || dailyGoal <= 0) {

            throw new RuntimeException(
                    "Daily goal must be greater than 0"
            );
        }


        // Update goal
        user.setDailyGoal(dailyGoal);


        // Save updated user
        User updatedUser = repository.save(user);


        // Create response
        UserResponse userResponse = new UserResponse();

        userResponse.setId(updatedUser.getId());
        userResponse.setKeycloakId(updatedUser.getKeycloakId());
        userResponse.setEmail(updatedUser.getEmail());
        userResponse.setFirstName(updatedUser.getFirstName());
        userResponse.setLastName(updatedUser.getLastName());
        userResponse.setDailyGoal(updatedUser.getDailyGoal());
        userResponse.setCreatedAt(updatedUser.getCreatedAt());
        userResponse.setUpdatedAt(updatedUser.getUpdatedAt());

        return userResponse;
    }
}
