package com.oneClub.Products.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubCategoryDTO
{
    private Long id;

    private String subcategoryName;

    private Long categoryId;
}

