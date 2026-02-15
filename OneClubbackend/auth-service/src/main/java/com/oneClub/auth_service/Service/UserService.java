package com.oneClub.auth_service.Service;

import com.oneClub.auth_service.Dtos.UpdateUserRequestDto;
import com.oneClub.auth_service.Dtos.UserResponseDto;
import com.oneClub.auth_service.Entity.Users;
import com.oneClub.auth_service.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService
{
    private final UserRepository  userRepository;

    public UserResponseDto getCurrentUser()
    {
        Users user = getAuthenticatedUser();

        return UserResponseDto.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole().getName())
                .build();
    }

    public UserResponseDto updateProfile(UpdateUserRequestDto  request)
    {
        Users user = getAuthenticatedUser();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        Users savedUser = userRepository.save(user);

        return UserResponseDto.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole().getName())
                .build();
    }

    private Users getAuthenticatedUser()
    {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}