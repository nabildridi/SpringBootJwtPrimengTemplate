package org.nd.primeng.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

	@Autowired
    private AuthenticationManager authenticationManager;
	
	@Autowired
    private JwtTokenService jwtTokenService;

    public String getToken(String username, String password) {
        var token = new UsernamePasswordAuthenticationToken( username,  password);
        Authentication authentication = authenticationManager.authenticate(token);

        String jwtToken = jwtTokenService.generateToken(authentication);
        

        return jwtToken;
    }
}
