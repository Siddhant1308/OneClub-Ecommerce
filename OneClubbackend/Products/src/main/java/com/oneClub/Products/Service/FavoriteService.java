package com.oneClub.Products.Service;

import com.oneClub.Products.Entity.Favorite;
import com.oneClub.Products.Repositories.FavoriteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FavoriteService
{
    private final FavoriteRepository favoriteRepository;

    public void addFavorite(Long userId, Long prodId)
    {
        favoriteRepository.findByUserIdAndProdId(userId, prodId)
                .ifPresent(f ->  {
                    throw new RuntimeException("Already in Favorite");
                });

        favoriteRepository.save(
                Favorite.builder()
                        .userId(userId)
                        .prodId(prodId)
                        .build()
        );
    }

    @Transactional
    public void removeFavorite(Long userId, Long prodId)
    {
        favoriteRepository.deleteByUserIdAndProdId(userId, prodId);
    }

    public List<Long> getFavoriteProductIds(Long userId)
    {
        return favoriteRepository.findByUserId(userId)
                .stream()
                .map(Favorite::getProdId)
                .collect(Collectors.toList());
    }
}
