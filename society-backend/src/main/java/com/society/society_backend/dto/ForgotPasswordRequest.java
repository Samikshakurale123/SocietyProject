package com.society.society_backend.dto;

public class ForgotPasswordRequest {
    private String email;
    private String securityA1;
    private String securityA2;
    private String securityA3;
    private String newPassword;

    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSecurityA1() { return securityA1; }
    public void setSecurityA1(String securityA1) { this.securityA1 = securityA1; }

    public String getSecurityA2() { return securityA2; }
    public void setSecurityA2(String securityA2) { this.securityA2 = securityA2; }

    public String getSecurityA3() { return securityA3; }
    public void setSecurityA3(String securityA3) { this.securityA3 = securityA3; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
}
