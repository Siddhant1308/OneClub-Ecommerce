package com.oneClub.auth_service.Controller;

import com.oneClub.auth_service.Dtos.AddressRequestDto;
import com.oneClub.auth_service.Dtos.AddressResponseDto;
import com.oneClub.auth_service.Service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController
{
    private final AddressService addressService;

    @PostMapping
    public ResponseEntity<AddressResponseDto> addAddress(@RequestBody AddressRequestDto request)
    {
        AddressResponseDto response = addressService.addAddress(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AddressResponseDto>> getAddress()
    {
        return ResponseEntity.ok(addressService.getUserAddress());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressResponseDto> updateAddress(@PathVariable Long id, @RequestBody AddressRequestDto request)
    {
        return ResponseEntity.ok(addressService.updateAddress(id,request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long id)
    {
        addressService.deleteAddress(id);
        return ResponseEntity.noContent().build();
    }
}
