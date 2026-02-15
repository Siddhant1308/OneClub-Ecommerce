package com.oneClub.auth_service.Dtos;

import lombok.Data;

@Data
public class UpdateUserRequestDto
{
    private String name;
    private String email;
}