package com.oneClub.Products.Repositories;

import com.oneClub.Products.Entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long>
{
    List<SubCategory> findByCategoryId(Long categoryId);
}