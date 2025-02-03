package com.acend.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acend.config.JwtProvider;
import com.acend.dto.CertificationDto;
import com.acend.entity.Certification;
import com.acend.service.CertificationService;

@RestController
@RequestMapping("/api/certification")
public class CertificationController {

    private final CertificationService certificationService;
    private final JwtProvider jwtProvider;

    // Constructor injection
    public CertificationController(CertificationService certificationService, JwtProvider jwtProvider) {
        this.certificationService = certificationService;
        this.jwtProvider = jwtProvider;
    }

    // POST: Add a new certification
    @PostMapping
    public Certification addCertification(@RequestBody Certification certification, @RequestHeader("Authorization") String token) {
        String email = jwtProvider.getEmailFromToken(token);
        return certificationService.saveCertification(certification, email);
    }

    // PUT: Update an existing certification
    @PutMapping("/{certificationId}")
    public Certification updateCertification(
            @PathVariable Long certificationId, 
            @RequestBody CertificationDto certificationDto, 
            @RequestHeader("Authorization") String token) {
        String email = jwtProvider.getEmailFromToken(token);
        return certificationService.updateCertification(certificationId, certificationDto, email);
    }
}
