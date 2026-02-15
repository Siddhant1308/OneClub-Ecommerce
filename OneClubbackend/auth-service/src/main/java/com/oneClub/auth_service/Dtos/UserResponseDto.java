package com.oneClub.auth_service.Dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDto
{
    private Long id;
    private String name;
    private String email;
    private String role;
}
