package com.example.cart_service.Dto;

import lombok.Data;

@Data
public class AuthUserDto
{
    private Long userId;
    private String email;
    private String role;
}
