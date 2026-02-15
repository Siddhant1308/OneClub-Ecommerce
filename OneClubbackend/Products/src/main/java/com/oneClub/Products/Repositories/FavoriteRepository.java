package com.oneClub.Products.Repositories;

import com.oneClub.Products.Entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite,Long>
{
    Optional<Favorite> findByUserIdAndProdId(Long userId, Long prodId);

    List<Favorite> findByUserId(Long userId);

    void deleteByUserIdAndProdId(Long userId, Long prodId);
}
