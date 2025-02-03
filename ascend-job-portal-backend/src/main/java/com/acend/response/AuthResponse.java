package com.acend.response;

import com.acend.enums.Roles;
import com.acend.enums.SubscriptionStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

	private String jwt;
    private String message;
    private SubscriptionStatus paymentStatus;
    private String role;
    
    public AuthResponse(String jwt,String message,String role) {
        super();
        this.jwt = jwt;
        this.message = message;
        this.role = role;
        
    }
    public AuthResponse(String jwt,String message) {
        super();
        this.jwt = jwt;
        this.message = message;
        
    }
    public AuthResponse(String message) {
        super();
       
        this.message = message;
        
    }
	
}
