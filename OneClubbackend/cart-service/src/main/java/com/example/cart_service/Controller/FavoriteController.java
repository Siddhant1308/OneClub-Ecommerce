package com.example.cart_service.Controller;

import com.example.cart_service.Service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products/fav")
@RequiredArgsConstructor
public class FavoriteController
{
    private final FavoriteService favoriteService;

    @PostMapping("/{prodId}")
    public ResponseEntity<?> toggleFavorite(@RequestHeader("Authorization") String token, @PathVariable Long prodId)
    {
        boolean isAdded = favoriteService.toggleFavorite(token, prodId);
        return ResponseEntity.ok(isAdded);
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Long>> getFavoriteIds(@RequestHeader("Authorization") String token)
    {
        return ResponseEntity.ok(favoriteService.getFavoriteIds(token));
    }
}