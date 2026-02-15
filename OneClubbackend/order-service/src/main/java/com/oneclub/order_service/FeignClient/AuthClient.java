package com.oneclub.order_service.FeignClient;

import com.oneclub.order_service.Dtos.AuthUserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "auth-service", url = "http://localhost:8081")
public interface AuthClient
{
    @GetMapping("/auth/validate")
    AuthUserDto validateToken(
            @RequestHeader("Authorization") String token
    );
}