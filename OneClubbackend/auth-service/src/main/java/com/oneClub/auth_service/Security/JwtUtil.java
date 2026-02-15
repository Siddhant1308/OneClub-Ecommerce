package com.oneClub.auth_service.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil
{
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private long EXPIRATION_TIME;

    private Key key;

    @PostConstruct
    public void init()
    {
        this.key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(Long userId, String email, String role)
    {
        return Jwts.builder()
                .setSubject(email)
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims extractAllClaims(String token)
    {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Long extractUserId(String token)
    {
        return extractAllClaims(token).get("userId", Long.class);
    }

    public String extractEmail(String token)
    {
        return extractAllClaims(token).getSubject();
    }

    public String extractRole(String token)
    {
        return extractAllClaims(token).get("role", String.class);
    }

    public Date extractExpiration(String token)
    {
        return extractAllClaims(token).getExpiration();
    }


    public boolean isTokenValid(String token)
    {
        try
        {
            extractAllClaims(token);
            return true;
        } catch (Exception e)
        {
            return false;
        }
    }
}