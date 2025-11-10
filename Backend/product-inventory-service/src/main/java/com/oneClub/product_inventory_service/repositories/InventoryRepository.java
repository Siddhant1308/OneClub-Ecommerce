package com.oneClub.product_inventory_service.repositories;

import com.oneClub.product_inventory_service.models.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    Optional<Inventory> findByProductId(Integer id);

}

