package com.example.cart_service.Dto;

import com.example.cart_service.Entity.CartItem;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartResponseDto
{
    private String userEmail;
    private List<CartItemDto> items;
}
