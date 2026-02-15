package com.oneClub.Products.FeignClient;

import com.oneClub.Products.Dtos.AuthUserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "auth-service", url = "http://localhost:8081/auth")
public interface AuthClient
{
    @GetMapping("/validate")
    AuthUserDto validateToken(@RequestHeader("Authorization") String token);
}
