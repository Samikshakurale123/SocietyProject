package com.society.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.society.backend.entity.user;
import java.util.Optional;

public interface userRepository extends JpaRepository<user, Long> {
    Optional<user> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByMobile(String mobile);
}
  