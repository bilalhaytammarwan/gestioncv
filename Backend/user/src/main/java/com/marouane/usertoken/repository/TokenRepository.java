package com.marouane.usertoken.repository;

import com.marouane.usertoken.model.Token;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TokenRepository extends MongoRepository<Token, String> {
    List<Token> findAllByUserId(String userId);

    List<Token> findByUserIdAndExpiredFalseAndRevokedFalse(String userId);

    @Query("{ 'userId': ?0, $or: [ { 'expired': false }, { 'revoked': false } ] }")
    List<Token> findAllValidTokensByUserId(String userId);

    Token findByToken(String token);
}
