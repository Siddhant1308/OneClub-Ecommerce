package com.example.cart_service.Service;

import com.example.cart_service.Dto.AuthUserDto;
import com.example.cart_service.Entity.CartItem;
import com.example.cart_service.Repository.CartRepository;
import com.example.cart_service.feignClients.AuthClient;
import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService
{
    private final CartRepository cartRepository;
    private final AuthClient  authClient;

    private AuthUserDto validateToken(String token)
    {
        if(token == null || token.isEmpty())
        {
            throw new RuntimeException("Authorization token is missing");
        }
        try
        {
            String authHeader = token.startsWith("Bearer ")? token : "Bearer " + token;
            return authClient.validateToken(authHeader);
        } catch(FeignException.Unauthorized ex) {
            throw new RuntimeException("Unauthorized Invalid token");
        }
    }

    private CartItem addOrUpdateCart(AuthUserDto user, Long prodId, int delta)
    {
        CartItem item = cartRepository.findByUserIdAndProdId(user.getUserId(), prodId).orElse(null);
        if(item == null)
        {
            item = new CartItem();
            item.setUserId(user.getUserId());
            item.setProdId(prodId);
            item.setQuantity(Math.max(delta, 1));
        } else {
            item.setQuantity(item.getQuantity() + delta);
            if(item.getQuantity() <= 0)
            {
                cartRepository.delete(item);
                return null;
            }
        }
        return cartRepository.save(item);
    }

    public CartItem addToCart(String token, Long prodId)
    {
        AuthUserDto user = validateToken(token);
        return addOrUpdateCart(user, prodId, 1);
    }

    public CartItem increaseQuantity(String token, Long prodId)
    {
        AuthUserDto user = validateToken(token);
        return addOrUpdateCart(user, prodId, 1);
    }

    public CartItem decreaseQuantity(String token, Long prodId)
    {
        AuthUserDto user = validateToken(token);
        return addOrUpdateCart(user, prodId, -1);
    }

    public List<CartItem> getCart(String token)
    {
        AuthUserDto user = authClient.validateToken(token);
        return cartRepository.findByUserId(user.getUserId());
    }

    public void removeItem(String token, Long prodId)
    {
        AuthUserDto user = validateToken(token);
        CartItem item = cartRepository.findByUserIdAndProdId(user.getUserId(), prodId)
                .orElseThrow(() -> new RuntimeException("Item not found"));
        cartRepository.delete(item);
    }


    public void clearCart(String token)
    {
        AuthUserDto user = validateToken(token);
        cartRepository.deleteByUserId(user.getUserId());
    }
}