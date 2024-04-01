package com.example.chess.Services;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.chess.Entity.UserInfo;
import com.example.chess.Repository.UserInfoRepository;

import lombok.RequiredArgsConstructor;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserInfoRepository userInfoRepository;

    public Long getUserIdToken() {
        // Retrieve the Authentication object from SecurityContextHolder
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        // Extract the JWT token from the Authentication object
        if (authentication != null && authentication.getName() instanceof String) {
            // log.info();
            Optional<UserInfo> userInfo = userInfoRepository.findByName(authentication.getName());
            return userInfo.get().getId();
        } else {
            return null; // Token not found or not a String
        }
    }
}
