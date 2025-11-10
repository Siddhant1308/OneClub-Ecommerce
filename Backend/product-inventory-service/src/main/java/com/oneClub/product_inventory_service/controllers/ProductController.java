package com.oneClub.product_inventory_service.controllers;

import com.oneClub.product_inventory_service.dtos.ProductRequestDTO;
import com.oneClub.product_inventory_service.dtos.ProductResponseDTO;
import com.oneClub.product_inventory_service.services.FavouritesService;
import com.oneClub.product_inventory_service.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;
    private final FavouritesService favProductService;

    @GetMapping
    public ResponseEntity<List<ProductResponseDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @GetMapping("/{prodId}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Integer prodId) {
        ProductResponseDTO product= productService.getProductById(prodId);
        if(product==null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(product);
    }

/*    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(
            @RequestBody ProductRequestDTO dto,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-Roles") String roles) {

        validateVendorAccess(roles);
        ProductResponseDTO createdProduct = productService.addProduct(dto, userId);
        return ResponseEntity.ok(createdProduct);
    }
    */


    @PutMapping("/{prodId}")
    public ResponseEntity<ProductResponseDTO> updateProduct(
            @PathVariable Integer prodId,
            @RequestBody ProductRequestDTO dto,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-Roles") String roles) {

        if (!hasAdminRole(roles)) {
          //  verifyProductOwnership(prodId, userId);
        }
        ProductResponseDTO updatedProduct = productService.updateProduct(prodId, dto);
        return ResponseEntity.ok(updatedProduct);
    }

   /* @DeleteMapping("/{prodId}")
    public ResponseEntity<ProductResponseDTO> deleteProduct(
            @PathVariable Integer prodId,
            @RequestHeader("X-User-Id") String userId,
            @RequestHeader("X-Roles") String roles) {

        if (!hasAdminRole(roles)) {
            verifyProductOwnership(prodId, userId);
        }
        ProductResponseDTO deletedProduct = productService.deleteProduct(prodId);
        return ResponseEntity.ok(deletedProduct);
    }*/

    @GetMapping("/price/{prodId}")
    public Float getProductPrice(@PathVariable Integer prodId) {
        return productService.getProductPriceById(prodId);
    }

    @GetMapping("/fav")
    public ResponseEntity<List<ProductResponseDTO>> getAllFavourites(
            @RequestHeader("X-User-Id") Integer userId) {
        List<ProductResponseDTO> favourites = favProductService.getFavouritesByUserId(userId);
        return ResponseEntity.ok(favourites);
    }

    @GetMapping("/fav/ids")
    public ResponseEntity<List<Integer>> getFavouriteProductIds(
            @RequestHeader("X-User-Id") Integer userId) {
        List<Integer> favProductIds = favProductService.getFavouriteProductIdsByUserId(userId);
        return ResponseEntity.ok(favProductIds);
    }

    @PutMapping("/fav/{prodId}")
    public ResponseEntity<?> toggleFavourite(
            @RequestHeader("X-User-Id") Integer userId,
            @PathVariable Integer prodId) {
        return ResponseEntity.ok(favProductService.toggleFavourite(userId, prodId));
    }


    private void validateVendorAccess(String rolesHeader) {
        List<String> roles = Arrays.asList(rolesHeader.split(","));
        if (!roles.contains("VENDOR") && !roles.contains("ADMIN") && !roles.contains("client_vendor")) {
            throw new IllegalStateException("Only vendors or admins can perform this action");
        }
    }

    private boolean hasAdminRole(String rolesHeader) {
        List<String> roles = Arrays.asList(rolesHeader.split(","));
        return roles.contains("ADMIN");
    }

   /* private void verifyProductOwnership(Integer productId, String userId) {
        if (!productService.isProductOwnedByVendor(productId, userId)) {
            throw new IllegalStateException("You don't have permission to modify this product");
        }
    }*/
}
