package com.oneClub.Products.Controller;


import com.oneClub.Products.Dtos.ProductRequestDTO;
import com.oneClub.Products.Dtos.ProductResponseDTO;
import com.oneClub.Products.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/products")
public class ProductController
{
    private final ProductService service;

    @GetMapping("/by-ids")
    public List<ProductResponseDTO> getProductsByIds(@RequestParam List<Long> ids)
    {
        return service.getProductsByIds(ids);
    }

    @GetMapping()
    public List<ProductResponseDTO> findAllProducts()
    {
        return service.findAllProducts();
    }

    @GetMapping("/{id}")
    public ProductResponseDTO findProductById(@PathVariable Long id)
    {
        return service.findProductById(id);
    }

    @PostMapping
    public ProductResponseDTO addProduct(@RequestBody ProductRequestDTO request)
    {
        return service.addProduct(request);
    }

    @PutMapping("/{id}")
    public ProductResponseDTO updateProduct(@PathVariable Long id, @RequestBody ProductRequestDTO request)
    {
        return service.updateProduct(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id)
    {
        service.deleteProduct(id);
        return "product delete successfully";
    }
}