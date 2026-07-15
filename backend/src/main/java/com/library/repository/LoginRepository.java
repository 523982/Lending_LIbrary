package com.library.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.library.model.LoginUser;

@Repository
public interface LoginRepository extends JpaRepository<LoginUser, String> {
    Optional<LoginUser> findByUsernameIgnoreCase(String username);
}
