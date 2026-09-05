package org.nd.template.controller;

import java.util.Optional;

import org.nd.template.security.AuthService;
import org.nd.template.utils.JsonUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import tools.jackson.databind.ObjectMapper;
import tools.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/rest/public/auth")
public class AuthenticationController {

	private static Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

	@Autowired
	private AuthService authService;

	ObjectMapper mapper = new ObjectMapper();

	@PostMapping("/token")
	public ResponseEntity<?> authenticate(@RequestBody String payload) {

		Optional<String> username = JsonUtil.getString(payload, "username");
		Optional<String> password = JsonUtil.getString(payload, "password");

		String jwtToken = authService.getToken(username.orElse(null), password.orElse(null));

		ObjectNode response = JsonUtil.getResponse("token", jwtToken,"username", username.orElse(null));

		return ResponseEntity.ok(response);

	}

}