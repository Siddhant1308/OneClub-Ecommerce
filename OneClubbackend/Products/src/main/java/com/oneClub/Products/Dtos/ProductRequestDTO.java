package com.oneClub.Products.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDTO
{
    private String title;
    private Double price;
    private String description;
    private String image;
    private Double rating;
    private String gender;
    private Integer quantity;

    private Long categoryId;
    private Long subcategoryId;
}