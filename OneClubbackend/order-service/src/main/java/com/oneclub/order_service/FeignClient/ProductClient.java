package com.oneclub.order_service.FeignClient;

import com.oneclub.order_service.Dtos.ProductDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "products", url = "http://localhost:8080")
public interface ProductClient
{
    @GetMapping("/products/{id}")
    ProductDto getProduct(@PathVariable("id") Long id);
}