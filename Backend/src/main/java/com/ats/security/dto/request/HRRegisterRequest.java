package com.ats.security.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HRRegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private int contactNo;
    private String address;
    private String JobPosition;
    private String password;
}

