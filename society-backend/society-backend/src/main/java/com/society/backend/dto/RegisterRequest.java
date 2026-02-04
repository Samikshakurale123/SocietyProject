package com.society.backend.dto;

import java.time.LocalDate;

public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String mobile;
    private String password;
    private LocalDate dob;
    private String address;
    private String wing;
    private String flatNumber;
    private String pincode;
    private String securityA1;
    private String securityA2;
    private String securityA3;

    // Getters and Setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getWing() { return wing; }
    public void setWing(String wing) { this.wing = wing; }

    public String getFlatNumber() { return flatNumber; }
    public void setFlatNumber(String flatNumber) { this.flatNumber = flatNumber; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getSecurityA1() { return securityA1; }
    public void setSecurityA1(String securityA1) { this.securityA1 = securityA1; }

    public String getSecurityA2() { return securityA2; }
    public void setSecurityA2(String securityA2) { this.securityA2 = securityA2; }

    public String getSecurityA3() { return securityA3; }
    public void setSecurityA3(String securityA3) { this.securityA3 = securityA3; }
}
 