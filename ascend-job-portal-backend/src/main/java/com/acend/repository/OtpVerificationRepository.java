package com.acend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.acend.entity.OtpVerification;

public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long>{

	OtpVerification findByEmail(String email);

}
