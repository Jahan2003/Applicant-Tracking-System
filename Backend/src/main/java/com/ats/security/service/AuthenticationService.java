package com.ats.security.service;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ats.security.dto.request.AuthenticationRequest;
import com.ats.security.dto.request.HRRegisterRequest;
import com.ats.security.dto.request.RegisterRequest;
import com.ats.security.dto.response.AuthenticationResponse;
import com.ats.security.entity.HRuser;
import com.ats.security.entity.Role;
import com.ats.security.entity.User;
import com.ats.security.repository.HRuserRepository;
import com.ats.security.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService{

    private final UserRepository userRepository;
    private final HRuserRepository hrrepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    
    public String createAdmin(HRRegisterRequest hrrequest) {
        // Check if the admin already exists
       

        // Create the admin user with the 'ADMIN' role
        var admin = HRuser
        		.builder()
                .firstName(hrrequest.getFirstName())
                .lastName(hrrequest.getLastName())
                .email(hrrequest.getEmail())
                .contactNo(hrrequest.getContactNo()) 
                .address(hrrequest.getAddress())
                .JobPosition(hrrequest.getJobPosition())
                .password(passwordEncoder.encode(hrrequest.getPassword()))
                .role(Role.ADMIN)
                .build();

        hrrepository.save(admin);
        return "HR Created";
        
    }

    // ... (existing code)

    public String createUser(RegisterRequest request) {
        var user = User
                .builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .contactNumber(request.getContactNumber())
                .degree(request.getDegree())
                .specializtion(request.getSpecializtion())
                .collegeName(request.getCollegeName())
                .address(request.getAddress())
                .passingYear(request.getPassingYear())
                .cgpa(request.getCgpa())
                .exp(request.getExp())
                .role(Role.USER)
                .build();
        userRepository.save(user);
        return "User Created";
        
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        // Try to authenticate as a regular User
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        if (userOptional.isPresent()) {
            authenticateUser(request.getEmail(), request.getPassword());
            User user = userOptional.get();
            var jwtToken = jwtService.generateToken(user,Role.USER);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
        throw new UsernameNotFoundException("User not found");
    }

    public AuthenticationResponse hrauthenticate(AuthenticationRequest request) {
        // Try to authenticate as an HRuser
        Optional<HRuser> hrUserOptional = hrrepository.findByEmail(request.getEmail());
        if (hrUserOptional.isPresent()) {
            authenticateUser(request.getEmail(), request.getPassword());
            HRuser hrUser = hrUserOptional.get();
            var jwtToken = jwtService.generateToken(hrUser,Role.ADMIN);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }

        throw new UsernameNotFoundException("User not found");
    }

    private void authenticateUser(String email, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));
    }

    private void authenticateHRUser(String email, String password) {
        // Implement authentication logic for HRuser, e.g., using HRuserRepository
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));

    }
}