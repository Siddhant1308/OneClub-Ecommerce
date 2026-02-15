package com.oneClub.Products.Repositories;

import com.oneClub.Products.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
