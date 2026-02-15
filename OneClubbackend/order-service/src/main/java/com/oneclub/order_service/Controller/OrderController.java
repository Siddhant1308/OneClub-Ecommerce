package com.oneclub.order_service.Controller;

import com.oneclub.order_service.Dtos.AuthUserDto;
import com.oneclub.order_service.Dtos.PlaceOrderRequest;
import com.oneclub.order_service.Entity.Order;
import com.oneclub.order_service.FeignClient.AuthClient;
import com.oneclub.order_service.Service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController
{
    private final OrderService orderService;
    private final AuthClient authClient;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestHeader("Authorization") String token, @RequestBody PlaceOrderRequest request)
    {
        System.out.println("Received token: " + token);

        AuthUserDto user = authClient.validateToken(token);

        System.out.println("User: " + user);

        System.out.println("User from auth: " + user);
        System.out.println("User id: " + (user != null ? user.getId() : "null User"));

        if(user == null)
        {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        Order order = orderService.placeOrder(request, user.getId(), token);

        return ResponseEntity.ok(order);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrders(@RequestHeader("Authorization") String authHeader)
    {
        String token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;

        AuthUserDto user = authClient.validateToken(authHeader);

        if(user == null || user.getId() == null)
        {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        List<Order> orders = orderService.getOrderByUserId(user.getId());

        return ResponseEntity.ok(orders);
    }

    @GetMapping
    public ResponseEntity<?> getAllOrders(
            @RequestHeader("Authorization") String authHeader) {

        AuthUserDto user = authClient.validateToken(authHeader);

        if (user == null || user.getId() == null) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        if (!user.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body("Forbidden");
        }

        return ResponseEntity.ok(orderService.getAllOrders());
    }
}