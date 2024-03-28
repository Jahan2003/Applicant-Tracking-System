package com.ats.security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.ats.security.entity.HRuser;
import com.ats.security.entity.User;

@Repository
public interface HRuserRepository extends JpaRepository<HRuser, Integer> {

	Optional<HRuser> findByEmail(String email);
    // You can add custom query methods here if needed
}
