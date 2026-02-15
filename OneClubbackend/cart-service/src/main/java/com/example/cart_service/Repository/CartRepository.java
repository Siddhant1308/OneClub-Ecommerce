package com.example.cart_service.Repository;

import com.example.cart_service.Entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long>
{
    List<CartItem> findByUserId(Long userId);
    
    Optional<CartItem> findByUserIdAndProdId(Long userId, Long prodId);

    void deleteByUserId(Long userId);
}
