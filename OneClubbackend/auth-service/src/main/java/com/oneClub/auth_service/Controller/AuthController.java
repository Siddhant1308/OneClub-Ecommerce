package com.oneClub.auth_service.Controller;

import com.oneClub.auth_service.Dtos.AuthUserDto;
import com.oneClub.auth_service.Dtos.AuthValidateResponseDto;
import com.oneClub.auth_service.Dtos.LoginRequestDto;
import com.oneClub.auth_service.Dtos.RegisterRequestDto;
import com.oneClub.auth_service.Entity.Role;
import com.oneClub.auth_service.Entity.Users;
import com.oneClub.auth_service.Repository.RoleRepository;
import com.oneClub.auth_service.Repository.UserRepository;
import com.oneClub.auth_service.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Claims;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final RoleRepository  roleRepository;

    @PostMapping("/generate-hash")
    public ResponseEntity<String> generateHash(@RequestParam String password)
    {
        return ResponseEntity.ok(passwordEncoder.encode(password));
    }

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequestDto request)
    {
        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email))
        {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("User already exists");
        }

        if(request.getRole() == null || request.getRole().isBlank())
        {
            return ResponseEntity
                    .badRequest()
                    .body("Role is required");
        }

        String roleName = "ROLE_" + request.getRole().trim().toUpperCase();

        if(roleName.equals("ROLE_ADMIN"))
        {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body("Admin role cannot be assigned");
        }

        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Invalid role" + roleName));

        Users user = new Users();
        user.setName(request.getName());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);

        userRepository.save(user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("User registered successfully");
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto dto) {

        String email = dto.getEmail().trim().toLowerCase();

        Users user = userRepository.findByEmail(email)
                .orElse(null);

        System.out.println(passwordEncoder.matches(dto.getPassword(), user.getPassword()));

        if (user == null || !passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(
                user.getId(),
                user.getEmail(),
                user.getRole().getName()
        );

        return ResponseEntity.ok(token);
    }

    // ================= TOKEN VALIDATION =================
    //Optional - only call if some service explicitly calls it
    @GetMapping("/validate")
    public ResponseEntity<AuthUserDto> validateToken(@RequestHeader(value = "Authorization", required = false) String authHeader)
    {
        if (authHeader == null || authHeader.isBlank())
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.startsWith("Bearer ")
                ? authHeader.substring(7)
                : authHeader;

        if(!jwtUtil.isTokenValid(token))
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Long userId = jwtUtil.extractUserId(token);
        String email = jwtUtil.extractEmail(token);
        String role = jwtUtil.extractRole(token);

        AuthUserDto dto = new AuthUserDto(
                userId,
                email,
                role
        );

        System.out.println("User from Auth Service: " + dto);

        return ResponseEntity.ok(dto);
    }
}