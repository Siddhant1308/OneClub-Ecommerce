package com.oneClub.auth_service.Dtos;

import lombok.Data;

@Data
public class AddressRequestDto
{
    private String street;
    private String city;
    private String state;
    private String pincode;
    private String country;
    private String landmarks;
}