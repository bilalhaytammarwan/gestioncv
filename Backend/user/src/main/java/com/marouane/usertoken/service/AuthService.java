package com.marouane.usertoken.service;


import com.marouane.usertoken.dto.TokenWrapper;
import com.marouane.usertoken.dto.UserLoginDTO;
import com.marouane.usertoken.model.AuthenticationResponse;
import com.marouane.usertoken.model.Token;
import com.marouane.usertoken.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthService {
    @Autowired
    UserService userService;
    @Autowired
    ApplicationContext context;
    @Autowired
    TokenService tokenService;

//    @Autowired
//    private AuthenticationManager authenticationManager;

    private void revokeAllUserTokens(String userId) {
        List<Token> validUserTokens = tokenService.getValidTokensByUserId(userId);
        if(validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenService.createTokens(validUserTokens);
    }
    private void saveUserToken(User user, TokenWrapper token) {
        Token tokenObj = new Token();
        tokenObj.setUserId(user.getId());
        tokenObj.setToken(token.getToken());
        tokenObj.setCreatedAt(token.getCreatedAt());
        tokenObj.setExpiredAt(token.getExpiredAt());
        tokenObj.setIpAddress(token.getIpAddress());
        tokenObj.setUserAgent(token.getUserAgent());
        tokenObj.setPlatform(token.getPlatform());
        tokenObj.setLastUsedAt(token.getLastUsedAt());

        tokenService.createToken(tokenObj);
    }

    public ResponseEntity<?> register(HttpServletRequest request, User user) {
        try {
            user = userService.createUser(user);
//            TokenWrapper accessTokenDto = jwtService.generateAccessToken(request, user.getEmail());
//            TokenWrapper refreshTokenDto = jwtService.generateRefreshToken(request, user.getEmail());
//            saveUserToken(user, accessTokenDto);
//            return new ResponseEntity<>(AuthenticationResponse.builder()
//                    .accessToken(accessTokenDto.getToken())
//                    .refreshToken(refreshTokenDto.getToken())
//                    .build(), HttpStatus.OK);
            return new ResponseEntity<>("success", HttpStatus.CREATED);
        } catch(Exception e){
            return new ResponseEntity<>("failed", HttpStatus.FORBIDDEN);
        }
    }


    public ResponseEntity<?> authenticate( UserLoginDTO user) {
        if(userService.getUserByEmailAndPassword(user.getEmail(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.OK).body("Success");
        }
//        Authentication authentication = authenticationManager.
//                authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
//        if(authentication.isAuthenticated()) {
//            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
//            User authenticatedUser = userPrincipal.getUser();
//            TokenWrapper accessTokenDto = jwtService.generateAccessToken(request, authenticatedUser.getEmail());
//            TokenWrapper refreshTokenDto = jwtService.generateRefreshToken(request, authenticatedUser.getEmail());
//            revokeAllUserTokens(authenticatedUser.getId());
//            saveUserToken(authenticatedUser, accessTokenDto);
//            return new ResponseEntity<>(AuthenticationResponse.builder()
//                    .accessToken(accessTokenDto.getToken())
//                    .refreshToken(refreshTokenDto.getToken())
//                    .build(), HttpStatus.OK);
        else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Failed");
        }
    }

//    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) { //throws IOException
//        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
//        String refreshToken = null;
//        String userEmail = null;
//
//        if(authHeader != null && authHeader.startsWith("Bearer ")){
//            refreshToken = authHeader.substring(7);
//            userEmail = jwtService.extractUserEmail(refreshToken);
//        }
////        if(userEmail != null){
////                User user = this.userService.getUserByEmail(userEmail);
////
////                if(jwtService.validateToken(refreshToken, new UserPrincipal(user))){
////                    TokenWrapper accessTokenDto = jwtService.generateAccessToken(request, user.getEmail());
////                    revokeAllUserTokens(user.getId());
////                    saveUserToken(user, accessTokenDto);
//////                    new ObjectMapper().writeValue(response.getOutputStream(), authResponse);
////                    return new ResponseEntity<>(AuthenticationResponse.builder()
////                            .accessToken(accessTokenDto.getToken())
////                            .refreshToken(refreshToken)
////                            .build(), HttpStatus.OK);
////                }
//        }
//        return new ResponseEntity<>("token not refreshed", HttpStatus.FORBIDDEN);
//    }
}
