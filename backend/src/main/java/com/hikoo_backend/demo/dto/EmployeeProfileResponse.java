package com.hikoo_backend.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EmployeeProfileResponse {

    private Long userId;

    private String name;
    private String email;

    // Organization controlled fields
    private String designation;
    private String specialization;
    private String department;

    // Employee personal fields
    private String phone;
    private String address;
    private String city;
    private String state;
    private String pincode;

    private boolean profileCompleted;
}