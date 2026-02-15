package com.oneClub.Products.Mapper;

import com.oneClub.Products.Dtos.CategoryDTO;
import com.oneClub.Products.Dtos.ProductResponseDTO;
import com.oneClub.Products.Dtos.SubCategoryDTO;
import com.oneClub.Products.Entity.Category;
import com.oneClub.Products.Entity.Inventory;
import com.oneClub.Products.Entity.Products;
import com.oneClub.Products.Entity.SubCategory;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper
{
    public ProductResponseDTO toDTO(Products product)
    {
        Category category = product.getCategory();
        SubCategory subCategory = product.getSubcategory();
        Inventory inventory = product.getInventory();

        int quantity = 0;
        int unitsSold = 0;
        
        if(inventory != null)
        {
            quantity = inventory.getQuantity();
            unitsSold = inventory.getUnitsSold();
        }

        return new ProductResponseDTO(
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getDescription(),
                product.getImage(),
                product.getRating(),
                product.getGender(),
                new CategoryDTO(
                        category.getId(),
                        category.getCategoryName()
                ),
                new SubCategoryDTO(
                        subCategory.getId(),
                        subCategory.getSubcategoryName(),
                        category.getId()
                ),
                quantity,
                unitsSold
        );
    }
}