package com.oneClub.product_inventory_service.services;

import com.oneClub.product_inventory_service.dtos.ProductRequestDTO;
import com.oneClub.product_inventory_service.dtos.ProductResponseDTO;
import com.oneClub.product_inventory_service.mappers.ProductMapper;
import com.oneClub.product_inventory_service.models.Category;
import com.oneClub.product_inventory_service.models.Inventory;
import com.oneClub.product_inventory_service.models.Product;
import com.oneClub.product_inventory_service.models.Subcategory;
import com.oneClub.product_inventory_service.repositories.CategoryRepository;
import com.oneClub.product_inventory_service.repositories.InventoryRepository;
import com.oneClub.product_inventory_service.repositories.ProductRepository;
import com.oneClub.product_inventory_service.repositories.SubcategoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductService {

    private final ProductRepository prodRepo;
    private final CategoryRepository categoryRepo;
    private final SubcategoryRepository subcategoryRepo;
    private final InventoryRepository inventoryRepository;
    private final InventoryService inventoryService;

    public List<ProductResponseDTO> getProducts() {
        return prodRepo.findAll()
                .stream()
                .map(ProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO getProductById(Integer prodId) {
        return prodRepo.findById(prodId)
                .map(ProductMapper::toDTO)
                .orElse(null);
    }

    public ProductResponseDTO addProduct(ProductRequestDTO dto) {
        Category category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        Subcategory subcategory = subcategoryRepo.findById(dto.getSubcategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subcategory not found"));

        Product product = ProductMapper.toEntity(dto, category, subcategory);
        prodRepo.save(product);
        return ProductMapper.toDTO(product);
    }

    public ProductResponseDTO updateProduct(Integer prodId, ProductRequestDTO dto) {
        Product currentProd = prodRepo.findById(prodId).orElse(null);
        if (currentProd == null) return null;

        Category category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));

        Subcategory subcategory = subcategoryRepo.findById(dto.getSubcategoryId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subcategory not found"));

        currentProd.setTitle(dto.getTitle());
        currentProd.setPrice(dto.getPrice());
        currentProd.setDescription(dto.getDescription());
        currentProd.setCategory(category);
        currentProd.setSubcategory(subcategory);
        currentProd.setImage(dto.getImage());
        currentProd.setRating(dto.getRating());
        currentProd.setGender(dto.getGender());
        Inventory inventory = inventoryRepository.findByProductId(prodId).orElse(null);
        if (inventory == null) {
            inventory = new Inventory();
            inventory.setProductId(prodId);
        }
        inventory.setQuantity(dto.getQuantity());
        inventoryRepository.save(inventory);

        prodRepo.save(currentProd);
        return ProductMapper.toDTO(currentProd);
    }
    @Transactional
    public ProductResponseDTO deleteProduct(Integer prodId) {
        Product product = prodRepo.findById(prodId).orElse(null);
        if (product == null) return null;

        prodRepo.delete(product);
     //   inventoryService.deleteInventory(prodId);

        return ProductMapper.toDTO(product);
    }
    public Float getProductPriceById(Integer prodId) {
        return prodRepo.findById(prodId)
                .map(Product::getPrice)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

}
