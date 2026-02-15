package com.oneClub.auth_service.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthValidateResponseDto
{
    private String email;
    private String role;
}