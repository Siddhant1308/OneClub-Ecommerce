package com.oneclub.order_service.FeignClient;

import com.oneclub.order_service.Dtos.CartItemDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.List;

@FeignClient(name = "cart-service", url = "http://localhost:8082")
public interface CartClient
{
    @GetMapping("/cart")
    List<CartItemDto> getCartItems(@RequestHeader("Authorization") String token);

    @DeleteMapping("/cart/clear")
    void clearCart(@RequestHeader("Authorization") String token);
}
