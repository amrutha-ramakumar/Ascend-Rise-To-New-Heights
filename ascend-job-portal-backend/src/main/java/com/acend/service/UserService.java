package com.acend.service;

public interface UserService {

//	String blockUser(Long id);

	String unblockUser(Long id);

	boolean checkblock(String email);

	String blockUser(Long id, String reason);

}
