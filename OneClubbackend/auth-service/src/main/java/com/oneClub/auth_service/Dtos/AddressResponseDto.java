package com.oneClub.auth_service.Dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressResponseDto
{
    private Long id;
    private String street;
    private String city;
    private String state;
    private String pincode;
    private String country;
    private String landmarks;
}
