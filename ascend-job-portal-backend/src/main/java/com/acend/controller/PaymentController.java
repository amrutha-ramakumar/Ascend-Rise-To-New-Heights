package com.acend.controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.acend.config.JwtProvider;
import com.acend.request.OrderRequest;
import com.acend.request.PaymentRequest;
import com.acend.service.impl.PaymentService;

import org.springframework.http.MediaType;
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class PaymentController {
    private final PaymentService paymentService;

    private JwtProvider jwtProvider;
    public PaymentController(PaymentService paymentService,JwtProvider jwtProvider) {
        this.paymentService = paymentService;
        this.jwtProvider = jwtProvider;
    }
    
    @PostMapping(value = "/create-razorpay-order", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createOrder(@RequestHeader("Authorization") String token, 
                                       @RequestBody OrderRequest request) {
        return ResponseEntity.ok(paymentService.createOrder(request));
    }

    @PostMapping(value = "/subscription-payments", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> savePayment(@RequestHeader("Authorization") String token, 
                                       @RequestBody PaymentRequest request) {
    	String email = jwtProvider.getEmailFromToken(token);
        return ResponseEntity.ok(paymentService.savePayment(email, request));
    }
}