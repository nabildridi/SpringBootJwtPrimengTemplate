package org.nd.primeng.security;

import org.nd.primeng.model.User;
import org.nd.primeng.repositories.UsersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class LoggedUserDetailsService implements UserDetailsService {

	private static Logger logger = LoggerFactory.getLogger(LoggedUserDetailsService.class);

	@Autowired
	private UsersRepository usesrRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user = usesrRepository.findByEmailIgnoreCase(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
		org.springframework.security.core.userdetails.User u = new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				AuthorityUtils.createAuthorityList(user.getRole().name()));

		return u;
	}

}