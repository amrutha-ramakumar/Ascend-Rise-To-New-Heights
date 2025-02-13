package com.acend.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acend.entity.Users;
import com.acend.repository.UserRepository;
import com.acend.service.UserService;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
    private UserRepository usersRepository;

	// works well changing because need reason for blocking

//    public String blockUser(Long userId) {
//        Optional<Users> userOptional = usersRepository.findById(userId);
//        if (!userOptional.isPresent()) {
//            throw new RuntimeException("User not found with id: " + userId);
//        }
//
//        Users user = userOptional.get();
//        if (user.isBlocked()) {
//            return "User is already blocked.";
//        }
//
//        user.setBlocked(true);
//        usersRepository.save(user);
//
//        return "User has been successfully blocked.";
//    }

    public String unblockUser(Long userId) {
        Optional<Users> userOptional = usersRepository.findById(userId);
        if (!userOptional.isPresent()) {
            throw new RuntimeException("User not found with id: " + userId);
        }

        Users user = userOptional.get();
        if (!user.isBlocked()) {
            return "User is not blocked.";
        }

        user.setBlocked(false);
        user.setReason(null);
        usersRepository.save(user);

        return "User has been successfully unblocked.";
    }

	@Override
	public boolean checkblock(String email) {
		Users user = usersRepository.findByEmail(email);
		return user.isBlocked();
	}

	@Override
	public String blockUser(Long userId, String reason) {
	    Optional<Users> userOptional = usersRepository.findById(userId);
	    if (!userOptional.isPresent()) {
	        throw new RuntimeException("User not found with id: " + userId);
	    }

	    Users user = userOptional.get();
	    if (user.isBlocked()) {
	        return "User is already blocked.";
	    }

	    user.setBlocked(true);
	    user.setReason(reason); // Assuming you have a field to store the block reason
	    usersRepository.save(user);

	    return "User has been successfully blocked for the following reason: " + reason;
	}

}
