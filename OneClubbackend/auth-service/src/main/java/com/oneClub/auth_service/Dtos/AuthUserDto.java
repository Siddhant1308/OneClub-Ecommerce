package com.oneClub.auth_service.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthUserDto
{
    private Long userId;
    private String email;
    private String role;
}
