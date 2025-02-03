package com.acend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.acend.entity.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
	public Users findByEmail(String email);
}
