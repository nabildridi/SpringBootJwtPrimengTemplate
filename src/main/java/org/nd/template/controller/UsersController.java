package org.nd.template.controller;

import org.nd.template.model.User;
import org.nd.template.services.UsersService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.turkraft.springfilter.boot.Filter;
import com.turkraft.springfilter.boot.Pagination;

@RestController
@RequestMapping("/rest/private/users")
public class UsersController {

	private static Logger logger = LoggerFactory.getLogger(UsersController.class);

	@Autowired
	private UsersService usersService;

	@PostMapping("/paginate")
	public Page<User> paginate(@Filter Specification<User> spec, @Pagination Pageable page) {
		return usersService.paginate(spec, page);
	}

}