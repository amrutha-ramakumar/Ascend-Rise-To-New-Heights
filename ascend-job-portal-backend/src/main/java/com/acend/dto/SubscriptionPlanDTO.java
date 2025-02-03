package com.acend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SubscriptionPlanDTO {
    @NotBlank(message = "Plan name is mandatory")
    @Size(max = 100, message = "Plan name should not exceed 100 characters")
    private String planName;

    @NotBlank(message = "User type is mandatory")
    @Pattern(regexp = "employer|jobseeker", message = "User type must be 'employer' or 'jobseeker'")
    private String userType;

    @NotNull(message = "Price cannot be null")
    @PositiveOrZero(message = "Price must be zero or positive")
    private Double price;

    @NotNull(message = "Duration cannot be null")
    @Positive(message = "Duration must be positive")
    private Long duration;

    @NotBlank(message = "Features cannot be blank")
    private String features;

    private Boolean is_active;

}
