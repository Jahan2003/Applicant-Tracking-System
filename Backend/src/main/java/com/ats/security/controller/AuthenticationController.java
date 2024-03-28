package com.ats.security.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ats.security.dto.request.AuthenticationRequest;
import com.ats.security.dto.request.HRRegisterRequest;
import com.ats.security.dto.request.RegisterRequest;
import com.ats.security.dto.response.AuthenticationResponse;
import com.ats.security.service.AuthenticationService;

import lombok.RequiredArgsConstructor;


@RestController
@CrossOrigin(origins="*",allowedHeaders="*")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/userregister")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.createUser(request));
    }
    @PostMapping("/hrregister")
    public ResponseEntity<String> CreateAdmin(@RequestBody HRRegisterRequest request) {
        return ResponseEntity.ok(authenticationService.createAdmin(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
    @PostMapping("/hrauthenticate")
    public ResponseEntity<AuthenticationResponse> hrauthenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.hrauthenticate(request));
    }
}
