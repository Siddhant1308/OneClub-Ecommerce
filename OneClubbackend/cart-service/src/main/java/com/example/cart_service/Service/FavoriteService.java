package com.example.cart_service.Service;

import com.example.cart_service.Dto.AuthUserDto;
import com.example.cart_service.Entity.Favorite;
import com.example.cart_service.Repository.FavoriteRepository;
import com.example.cart_service.feignClients.AuthClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService
{
    private final FavoriteRepository favoriteRepository;
    private final AuthClient authClient;

    public boolean toggleFavorite(String token, Long prodId)
    {
        AuthUserDto user = authClient.validateToken(token);

        Favorite favorite = favoriteRepository
                .findByUserIdAndProdId(user.getUserId(), prodId)
                .orElse(null);

        if(favorite == null)
        {
            Favorite newFav = new Favorite();
            newFav.setUserId(user.getUserId());
            newFav.setProdId(prodId);
            favoriteRepository.save(newFav);
            return true;
        } else {
            favoriteRepository.delete(favorite);
            return false;
        }
    }

    public List<Long> getFavoriteIds(String token)
    {
        AuthUserDto user = authClient.validateToken(token);
        return favoriteRepository.findByUserId(user.getUserId())
                .stream()
                .map(Favorite::getProdId)
                .collect(Collectors.toList());
    }
}