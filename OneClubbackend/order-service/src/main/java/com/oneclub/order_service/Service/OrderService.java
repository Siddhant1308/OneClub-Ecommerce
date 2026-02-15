package com.oneclub.order_service.Service;

import com.oneclub.order_service.Dtos.CartItemDto;
import com.oneclub.order_service.Dtos.PlaceOrderRequest;
import com.oneclub.order_service.Dtos.ProductDto;
import com.oneclub.order_service.Entity.DeliveryStatus;
import com.oneclub.order_service.Entity.Order;
import com.oneclub.order_service.Entity.OrderItem;
import com.oneclub.order_service.Entity.PaymentStatus;
import com.oneclub.order_service.FeignClient.CartClient;
import com.oneclub.order_service.FeignClient.ProductClient;
import com.oneclub.order_service.Repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService
{
    private final OrderRepository orderRepository;
    private final CartClient cartClient;
    private final ProductClient productClient;

    public Order placeOrder(PlaceOrderRequest request, Long userId, String token)
    {
        List<CartItemDto> cartItems = cartClient.getCartItems(token);

        System.out.println("Cart Items: " + cartItems);

        if (cartItems == null || cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setReceiverName("Test User");
        order.setReceiverPhone("9999999999");
        order.setDeliveryStatus(DeliveryStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING_PAYMENT);

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItemDto cartItem : cartItems)
        {
            ProductDto product = productClient.getProduct(cartItem.getProdId());

            if(product == null)
            {
                throw new RuntimeException("Product not found for ID: " + cartItem.getProdId());
            }

            BigDecimal productPrice = product.getPrice();

            BigDecimal itemTotal = productPrice.multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            totalAmount = totalAmount.add(itemTotal);

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .prodId(Math.toIntExact(product.getId()))
                    .productTitle(product.getTitle())
                    .quantity(cartItem.getQuantity())
                    .price(productPrice)
                    .build();

            orderItems.add(orderItem);
        }

        order.setTotalAmount(totalAmount);
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        cartClient.clearCart(token);

        return savedOrder;
    }


    public List<Order> getAllOrders()
    {
        return orderRepository.findAll();
    }

    public List<Order> getOrderByUserId(Long userId)
    {
        return orderRepository.findByUserId(userId);
    }
}