package com.example.cart_service.Repository;

import com.example.cart_service.Entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, Long>
{
    List<Favorite> findByUserId(Long prodId);

    Optional<Favorite> findByUserIdAndProdId(Long userId, Long prodId);

    void deleteByUserIdAndProdId(Long userId, Long prodId);
}
