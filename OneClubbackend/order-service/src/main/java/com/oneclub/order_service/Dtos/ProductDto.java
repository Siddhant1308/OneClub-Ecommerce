package com.oneclub.order_service.Dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto
{
    private Long id;
    private String title;
    private BigDecimal price;
}