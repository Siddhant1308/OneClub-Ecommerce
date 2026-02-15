package com.oneClub.auth_service.Dtos;

import lombok.Data;

@Data
public class LoginRequestDto
{
    private String email;
    private String password;
}
