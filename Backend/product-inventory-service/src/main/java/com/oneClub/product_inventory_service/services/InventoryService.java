package com.oneClub.product_inventory_service.services;

import com.oneClub.product_inventory_service.dtos.InventoryResponseDTO;
import com.oneClub.product_inventory_service.mappers.InventoryMapper;
import com.oneClub.product_inventory_service.models.Inventory;
import com.oneClub.product_inventory_service.repositories.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepo;

    public List<InventoryResponseDTO> getAllInventory() {
        return inventoryRepo.findAll().stream()
                .map(InventoryMapper::mapToDTO)
                .collect(Collectors.toList());
    }

    public InventoryResponseDTO getInventoryByProductId(Integer prodId) {
        return inventoryRepo.findById(prodId)
                .map(InventoryMapper::mapToDTO)
                .orElse(null);
    }

    /**
     * Dangerous method - overwrites quantity. Better to remove or limit usage.
     */
    public InventoryResponseDTO updateInventoryByProdId(Integer prodId, Integer quantity) {
        Inventory current = inventoryRepo.findById(prodId).orElse(null);
        if (current == null) return null;
        current.setQuantity(current.getQuantity()-quantity); // overwrites quantity
        inventoryRepo.save(current);
        return InventoryMapper.mapToDTO(current);
    }

    public Integer checkQuantityById(Integer prodId) {
        return inventoryRepo.findById(prodId).map(Inventory::getQuantity).orElse(0);
    }

    /**
     * Used to temporarily reserve stock when placing order.
     */
    @Transactional
    public void reserveStock(Integer prodId, Integer quantity) {
        Inventory inventory = inventoryRepo.findById(prodId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (inventory.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }
        inventory.setQuantity(inventory.getQuantity() - quantity);
        inventoryRepo.save(inventory);
    }

    /**
     * Used when payment fails to restore the reserved quantity.
     */
    @Transactional
    public void releaseReservedStock(Integer prodId, Integer quantity) {
        Inventory inventory = inventoryRepo.findById(prodId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        inventory.setQuantity(inventory.getQuantity() + quantity);
        inventoryRepo.save(inventory);
    }

    /**
     * Used after payment success to permanently reduce stock.
     * Safer & clearer than updateInventoryByProdId.
     */
    @Transactional
    public void reduceStock(Integer prodId, Integer quantity) {
        Inventory inventory = inventoryRepo.findById(prodId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        if (inventory.getQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock when reducing");
        }
        inventory.setQuantity(inventory.getQuantity() - quantity);
        inventoryRepo.save(inventory);
    }
}
