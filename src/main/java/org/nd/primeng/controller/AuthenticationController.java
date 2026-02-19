package org.nd.primeng.controller;

import java.util.Optional;

import org.nd.primeng.security.AuthService;
import org.nd.primeng.utils.JsonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/rest/public/auth")
public class AuthenticationController {

	private static Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

	@Autowired
	private AuthService authService;

	ObjectMapper mapper = new ObjectMapper();

	@PostMapping("/token")
	public ResponseEntity<?> authenticate(@RequestBody String payload) {

		logger.debug(payload);

		Optional<String> username = JsonUtil.getString(payload, "username");
		Optional<String> password = JsonUtil.getString(payload, "password");

		String jwtToken = authService.getToken(username.orElse(null), password.orElse(null));

		ObjectNode response = mapper.createObjectNode();
		response.put("token", jwtToken);
		response.put("username", username.orElse(null));

		return ResponseEntity.ok(response);

	}

}