package com.library.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.library.dto.LoginRequestDTO;
import com.library.dto.LoginResponseDTO;
import com.library.model.LoginUser;
import com.library.repository.LoginRepository;

@Service
public class AuthService {

    private final LoginRepository loginRepository;

    public AuthService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public LoginResponseDTO login(LoginRequestDTO request) {
        String username = request.getUsername().trim();

        LoginUser loginUser = loginRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password"));

        if (!loginUser.getPw().equals(request.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid username or password");
        }

        if (!"admin".equalsIgnoreCase(loginUser.getRole())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Only admin users can access admin area");
        }

        return new LoginResponseDTO(loginUser.getUsername(), loginUser.getRole());
    }
}
