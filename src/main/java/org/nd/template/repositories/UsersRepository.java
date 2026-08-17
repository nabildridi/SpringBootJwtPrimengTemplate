package org.nd.template.repositories;

import java.util.Optional;

import org.nd.template.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
	public Optional<User> findByEmailIgnoreCase(String email);
}