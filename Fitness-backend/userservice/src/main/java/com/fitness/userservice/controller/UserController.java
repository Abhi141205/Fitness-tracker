package com.fitness.userservice.controller;

import com.fitness.userservice.dto.RegisterRequest;
import com.fitness.userservice.dto.UserResponse;
import com.fitness.userservice.services.UserService;
import jakarta.validation.Valid;
import jdk.jfr.Registered;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fitness.userservice.dto.UpdateDailyGoalRequest;
@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {
    private UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse>getUserProfile(@PathVariable String userId){
        return ResponseEntity.ok(userService.getUserProfile(userId));
    }


    @PostMapping("/register")
    public ResponseEntity<UserResponse> register( @Valid @RequestBody RegisterRequest request)
    {
        return ResponseEntity.ok(userService.register(request));
    }


    @GetMapping("/{userId}/validate")
    public ResponseEntity<Boolean>validateUser(@PathVariable String userId){
        return ResponseEntity.ok(userService.existByUserId(userId));
    }



    @PutMapping("/{userId}/daily-goal")
    public ResponseEntity<UserResponse> updateDailyGoal(@PathVariable String userId,@RequestBody UpdateDailyGoalRequest request) {
        return ResponseEntity.ok(userService.updateDailyGoal(userId, request.getDailyGoal()));
    }
}
