package com.marouane.usertoken.controller;

import com.marouane.usertoken.model.Token;
import com.marouane.usertoken.service.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/token")
@RequiredArgsConstructor
public class TokenController {
    private final TokenService tokenService;

//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<Token>> getTokens(){
        List<Token> tokens = tokenService.getTokens();
        return ResponseEntity.ok(tokens);
    }
//    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<Token> getTokenById(@PathVariable String id){
        Token token = tokenService.getTokenById(id);
        return ResponseEntity.ok(token);
    }
//    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Token> createToken(@Valid @RequestBody Token tokenInfo){
        Token token = tokenService.createToken(tokenInfo);
        URI location = URI.create("/api/token/" + token.getId());
        return ResponseEntity.created(location).body(token);
    }
//    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Token> updateToken(@PathVariable String id, @Valid @RequestBody Token tokenInfo){
        Token token = tokenService.updateToken(id, tokenInfo);
        return ResponseEntity.ok(token);
    }
//    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToken(@PathVariable String id){
        tokenService.deleteToken(id);
        return ResponseEntity.noContent().build();
    }



//    @PreAuthorize("hasAnyRole('ADMIN') or #userId == authentication.principal.id")
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Token>> getTokensByUserId(@PathVariable String userId){
        List<Token> tokens = tokenService.getTokensByUserId(userId);
        return ResponseEntity.ok(tokens);
    }
//    @PreAuthorize("hasAnyRole('ADMIN') or #userId == authentication.principal.id")
    @GetMapping("/validUser/{userId}")
    public ResponseEntity<List<Token>> getValidatedTokensByUserId(@PathVariable String userId){
        List<Token> tokens = tokenService.getValidTokensByUserId(userId);
        return ResponseEntity.ok(tokens);
    }
//    @PreAuthorize("hasAnyRole('ADMIN') or authentication.principal.ownsToken(#token)")
    @GetMapping("/tk/{token}")
    public ResponseEntity<Token> getTokenObjByToken(@PathVariable String token){
        Token tokenObj = tokenService.getTokenObjByToken(token);
        return ResponseEntity.ok(tokenObj);
    }
//    @PreAuthorize("hasAnyRole('ADMIN')")
    @PostMapping("/tokens")
    public ResponseEntity<List<Token>> createTokens(@Valid @RequestBody List<@Valid Token> tokens){
        List<Token> tokensObj = tokenService.createTokens(tokens);
        return ResponseEntity.status(HttpStatus.CREATED).body(tokensObj); //ResponseEntity.created(location).body(tokensObj);
    }
}
