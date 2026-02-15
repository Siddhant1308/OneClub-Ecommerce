package com.oneClub.auth_service.Service;

import com.oneClub.auth_service.Dtos.AddressRequestDto;
import com.oneClub.auth_service.Dtos.AddressResponseDto;
import com.oneClub.auth_service.Entity.Address;
import com.oneClub.auth_service.Entity.Users;
import com.oneClub.auth_service.Repository.AddressRepository;
import com.oneClub.auth_service.Repository.UserRepository;
import com.oneClub.auth_service.Security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AddressService
{
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    private Long getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof Users) {
            return ((Users) principal).getId();
        } else if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername(); // or however you identify
            Users user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
            return user.getId();
        } else {
            throw new RuntimeException("Unauthorized");
        }
    }


    public AddressResponseDto addAddress(AddressRequestDto request)
    {
        Long userId = getCurrentUserId();

        Address address = Address.builder()
                .userId(userId)
                .street(request.getStreet())
                .city(request.getCity())
                .state(request.getState())
                .pincode(request.getPincode())
                .country(request.getCountry())
                .landmarks(request.getLandmarks())
                .build();

        Address saved = addressRepository.save(address);
        return mapToResponse(saved);
    }

    public List<AddressResponseDto> getUserAddress()
    {
        Long userId = getCurrentUserId();

        return addressRepository.findByUserId(userId)
                .stream()
                .map(this :: mapToResponse)
                .toList();
    }

    public AddressResponseDto updateAddress(Long id, AddressRequestDto request)
    {
        Long userId = getCurrentUserId();

        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Address not found!"));

        if(!address.getUserId().equals(userId))
            throw new RuntimeException("Unauthorized");

        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPincode(request.getPincode());
        address.setCountry(request.getCountry());
        address.setLandmarks(request.getLandmarks());

        return mapToResponse(addressRepository.save(address));
    }

    public void deleteAddress(Long id)
    {
        Long userId = getCurrentUserId();

        Address address = addressRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Address not found!"));

        if(!address.getUserId().equals(userId))
            throw new RuntimeException("Unauthorized");

        addressRepository.deleteById(id);
    }

    private AddressResponseDto mapToResponse(Address address)
    {
        return AddressResponseDto.builder()
                .id(address.getId())
                .street(address.getStreet())
                .city(address.getCity())
                .state(address.getState())
                .pincode(address.getPincode())
                .country(address.getCountry())
                .landmarks(address.getLandmarks())
                .build();
    }
}
