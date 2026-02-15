package com.oneClub.Products.Service;

import com.oneClub.Products.Dtos.ProductRequestDTO;
import com.oneClub.Products.Dtos.ProductResponseDTO;
import com.oneClub.Products.Entity.Category;
import com.oneClub.Products.Entity.Inventory;
import com.oneClub.Products.Entity.Products;
import com.oneClub.Products.Entity.SubCategory;
import com.oneClub.Products.Mapper.ProductMapper;
import com.oneClub.Products.Repositories.CategoryRepository;
import com.oneClub.Products.Repositories.InventoryRepository;
import com.oneClub.Products.Repositories.ProductRepository;
import com.oneClub.Products.Repositories.SubCategoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService
{
    private final ProductRepository productRepo;
    private final CategoryRepository categoryRepo;
    private final SubCategoryRepository subCategoryRepo;
    private final ProductMapper mapper;
    private final InventoryRepository inventoryRepo;

    public List<ProductResponseDTO> findAllProducts()
    {
        return productRepo.findAll()
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    public ProductResponseDTO findProductById(Long id)
    {
        Products product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        return mapper.toDTO(product);
    }

    public List<ProductResponseDTO> getProductsByIds(List<Long> ids)
    {
        return productRepo.findAllById(ids)
                .stream()
                .map(mapper::toDTO)
                .toList();
    }

    @Transactional
    public ProductResponseDTO addProduct(ProductRequestDTO request)
    {
        if(request.getCategoryId() == null)
        {
            throw new IllegalArgumentException("CategoryId must not be null");
        }

        if(request.getSubcategoryId() == null)
        {
            throw new IllegalArgumentException("SubcategoryId must not be null");
        }

        Category category = categoryRepo.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        SubCategory subCategory = subCategoryRepo.findById(request.getSubcategoryId())
                .orElseThrow(() -> new RuntimeException("Subcategory Not Found"));


        Products product = new Products();
        product.setTitle(request.getTitle());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setImage(request.getImage());
        product.setRating(request.getRating());
        product.setGender(request.getGender());
        product.setCategory(category);
        product.setSubcategory(subCategory);

        Products savedProduct = productRepo.save(product);

        Inventory inventory = new  Inventory();
        inventory.setProduct(savedProduct);
        inventory.setQuantity(request.getQuantity());
        inventory.setUnitsSold(0);

        inventoryRepo.save(inventory);

        return mapper.toDTO(savedProduct);
    }

    @Transactional
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO request)
    {
        Products product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        product.setTitle(request.getTitle());
        product.setPrice(request.getPrice());
        product.setDescription(request.getDescription());
        product.setImage(request.getImage());
        product.setRating(request.getRating());
        product.setGender(request.getGender());

        if(request.getCategoryId() != null)
        {
            Category category = categoryRepo.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category Not Found"));
            product.setCategory(category);
        }

        if(request.getSubcategoryId() != null)
        {
            SubCategory subCategory = subCategoryRepo.findById(request.getSubcategoryId())
                    .orElseThrow(() -> new RuntimeException("Subcategory Not Found"));
            product.setSubcategory(subCategory);
        }

        Products updatedProduct = productRepo.save(product);

        if(request.getQuantity() != null)
        {
            Inventory inventory = inventoryRepo
                    .findByProductId(id)
                    .orElseThrow(() -> new RuntimeException("Inventory Not Found"));

            inventory.setQuantity(request.getQuantity());
            inventoryRepo.save(inventory);
        }
        return mapper.toDTO(updatedProduct);
    }

    @Transactional
    public void deleteProduct(Long id)
    {
        Products product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));

        inventoryRepo.deleteByProductId(id);

        productRepo.delete(product);
    }
}