package com.oneClub.Products.Repositories;

import com.oneClub.Products.Entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long>
{
    Optional<Inventory> findByProductId(Long productId);

    void deleteByProductId(Long productId);
}
