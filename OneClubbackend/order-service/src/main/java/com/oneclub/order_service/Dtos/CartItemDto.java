package com.oneclub.order_service.Dtos;

import lombok.Data;

@Data
public class CartItemDto
{
    private Long prodId;
    private String productTitle;
    private Integer quantity;
    private Double price;
}