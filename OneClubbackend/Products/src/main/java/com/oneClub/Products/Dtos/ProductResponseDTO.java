package com.oneClub.Products.Dtos;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO
{
    private Long id;
    private String title;
    private Double price;
    private String description;
    private String image;
    private Double rating;
    private String gender;

    private CategoryDTO category;
    private SubCategoryDTO subcategory;
    
    private Integer quantity;
    private Integer unitsSold;
}