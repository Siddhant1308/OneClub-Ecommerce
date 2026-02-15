package com.oneclub.order_service.Dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthUserDto
{
    @JsonProperty("userId")
    private Long id;
    private String email;
    private String role;
}