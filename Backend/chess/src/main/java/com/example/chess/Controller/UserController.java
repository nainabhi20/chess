package com.example.chess.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.example.chess.Dto.JwtRequest;
import com.example.chess.Dto.JwtResponse;
import com.example.chess.Entity.UserInfo;
import com.example.chess.Services.UserInfoService;
import com.example.chess.Utils.JwtService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS
})
@Slf4j
public class UserController {

    @Autowired
    private UserInfoService service;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/welcome")
    public String welcome() {
        return "Welcome this endpoint is not secure";
    }

    @PostMapping("/addNewUser")
    public String addNewUser(@RequestBody UserInfo userInfo) {
        return service.addUser(userInfo);
    }

    @GetMapping("/user/userProfile")
    // @PreAuthorize("hasAuthority('ROLE_USER')")
    public String userProfile() {
        // return service.getDetail();
        return "abcd";
    }

    @GetMapping("/admin/adminProfile")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public String adminProfile() {
        return "Welcome to Admin Profile";
    }

    @PostMapping("/generateToken")
    public JwtResponse authenticateAndGetToken(@RequestBody JwtRequest authRequest) {
        log.info(authRequest.getUsername() + authRequest.getPassword());
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        log.info("hello");
        if (authentication.isAuthenticated()) {
            UserInfo userInfo = service.getDetail(authRequest.getUsername());
            return JwtResponse.builder().token(jwtService.generateToken("" + userInfo.getId())).build();
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }

}