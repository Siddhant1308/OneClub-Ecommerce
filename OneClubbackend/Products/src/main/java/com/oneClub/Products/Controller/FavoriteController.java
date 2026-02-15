package com.oneClub.Products.Controller;

import com.oneClub.Products.Dtos.AuthUserDto;
import com.oneClub.Products.Dtos.ProductResponseDTO;
import com.oneClub.Products.FeignClient.AuthClient;
import com.oneClub.Products.Service.FavoriteService;
import com.oneClub.Products.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products/fav")
@RequiredArgsConstructor
public class FavoriteController
{
    private final FavoriteService favoriteService;
    private final AuthClient authClient;

    private AuthUserDto getUser(String token)
    {
        return authClient.validateToken(token);
    }

    @PostMapping("/{prodId}")
    public void addFavorite(@RequestHeader("Authorization") String token, @PathVariable Long prodId)
    {
        AuthUserDto user = getUser(token);
        favoriteService.addFavorite(user.getUserId(),  prodId);
    }

    @DeleteMapping("/{prodId}")
    public void removeFavorite(@RequestHeader("Authorization") String token, @PathVariable Long prodId)
    {
        AuthUserDto user = getUser(token);
        favoriteService.removeFavorite(user.getUserId(), prodId);
    }

    @GetMapping("/ids")
    public List<Long> getFavorites(@RequestHeader("Authorization") String token)
    {
        AuthUserDto user = getUser(token);
        return favoriteService.getFavoriteProductIds(user.getUserId());
    }
}