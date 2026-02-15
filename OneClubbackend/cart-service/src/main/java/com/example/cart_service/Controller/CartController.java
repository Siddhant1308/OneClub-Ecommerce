package com.example.cart_service.Controller;


import com.example.cart_service.Entity.CartItem;
import com.example.cart_service.Service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@RequiredArgsConstructor
public class CartController
{
    private final CartService cartService;

    @PostMapping("/add/{prodId}")
    public ResponseEntity<CartItem>  addToCart(@RequestHeader("Authorization") String token, @PathVariable Long prodId)
    {
        return ResponseEntity.ok(cartService.addToCart(token, prodId));
    }

    @PostMapping("/increase/{prodId}")
    public ResponseEntity<CartItem> increase(@RequestHeader("Authorization") String token, @PathVariable Long prodId)
    {
        return ResponseEntity.ok(cartService.increaseQuantity(token, prodId));
    }

    @PostMapping("/decrease/{prodId}")
    public ResponseEntity<CartItem> decrease(@RequestHeader("Authorization") String token, @PathVariable Long prodId)
    {
        CartItem item = cartService.decreaseQuantity(token, prodId);
        return ResponseEntity.ok(item);
    }

    @GetMapping
    public ResponseEntity<List<CartItem>> getCart(@RequestHeader("Authorization") String token)
    {
        return ResponseEntity.ok(cartService.getCart(token));
    }

    @DeleteMapping("/remove/{prodId}")
    public ResponseEntity<?> removeItem(@RequestHeader("Authorization") String token, @PathVariable Long prodId)
    {
        cartService.removeItem(token, prodId);
        return ResponseEntity.ok("Item removed");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(@RequestHeader("Authorization") String token)
    {
        cartService.clearCart(token);
        return ResponseEntity.ok("Cart cleared");
    }

}
