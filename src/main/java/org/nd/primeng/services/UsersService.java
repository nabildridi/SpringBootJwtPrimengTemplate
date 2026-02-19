package org.nd.primeng.services;

import java.util.Optional;

import org.nd.primeng.model.User;
import org.nd.primeng.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

	@Autowired
	private UsersRepository usersRepository;

	public Optional<User> findByUsername(String email) {
		if (email != null)
			email = email.trim();
		return usersRepository.findByEmailIgnoreCase(email);
	}

	public Page<User> paginate(Specification<User> spec, Pageable page) {
		return usersRepository.findAll(spec, page);
	}

}
