package com.oneClub.user_service.controllers;

import com.oneClub.user_service.dtos.*;
import com.oneClub.user_service.models.Address;
import com.oneClub.user_service.models.User;
import com.oneClub.user_service.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/addresses")
    public ResponseEntity<List<Address>> getAllAddresses(@RequestHeader("X-User-Id") Integer userId) {
        return ResponseEntity.ok(userService.getAllAddresses(userId));
    }
    @GetMapping("address/{addressId}")
    public ResponseEntity<AddressResponseDTO> getAddressById(@PathVariable Integer addressId) {
        AddressResponseDTO addressResponseDTO = userService.getAddressById(addressId);
        if (addressResponseDTO == null)
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok(addressResponseDTO);
    }

    @PostMapping("/add/address")
    public ResponseEntity<AddressResponseDTO> addAddress(
            @RequestHeader("X-User-Id") Integer userId,
            @RequestBody AddressRequestDTO dto) {

        return ResponseEntity.ok(userService.addAddress(userId, dto));
    }

    @PatchMapping("/update/address")
    public ResponseEntity<HttpStatus> updateAddress(@RequestBody AddressRequestDTO addressRequestDTO) {
        return ResponseEntity.ok(userService.updateAddress(addressRequestDTO));
    }

    @DeleteMapping("/delete/address/{addressId}")
    public ResponseEntity<HttpStatus> deleteAddress(@PathVariable Integer addressId) {

        return new ResponseEntity<>(userService.deleteAddressById(addressId)); // 204 No Content
    }

    @PatchMapping("/address/set-default/{addressId}")
    public ResponseEntity<HttpStatus> setDefaultAddress(
            @RequestHeader("X-User-Id") Integer userId,
            @PathVariable Integer addressId) {

        HttpStatus status = userService.setDefaultAddress(userId, addressId);
        return new ResponseEntity<>(status);
    }

    @PostMapping("/create")
    public ResponseEntity<User> register(@RequestBody RegisterDTO registerDTO) {
        return ResponseEntity.ok(userService.createUser(registerDTO));
    }

    @PostMapping("/validate")
    public ResponseEntity<User> validateUser(@RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(userService.validateLogin(loginDTO));
    }

    @GetMapping
    public ResponseEntity<UserDTO> getUserById(
            @RequestHeader("X-User-Id") Integer userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(userService.mapToUserDTO(user));
    }
}

