package com.oneclub.order_service.Dtos;

import lombok.Data;

@Data
public class PlaceOrderRequest
{
    private Integer addressId;
    private String paymentMode;
}
