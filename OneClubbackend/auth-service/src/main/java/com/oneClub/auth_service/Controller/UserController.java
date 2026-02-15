package com.oneClub.auth_service.Controller;

import com.oneClub.auth_service.Dtos.UpdateUserRequestDto;
import com.oneClub.auth_service.Dtos.UserResponseDto;
import com.oneClub.auth_service.Service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin
public class UserController
{
    private final UserService userService;

    @GetMapping
    public ResponseEntity<UserResponseDto> getProfile()
    {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @PutMapping("/update")
    public ResponseEntity<UserResponseDto> updateProfile(@RequestBody UpdateUserRequestDto request)
    {
        return ResponseEntity.ok(userService.updateProfile(request));
    }
}