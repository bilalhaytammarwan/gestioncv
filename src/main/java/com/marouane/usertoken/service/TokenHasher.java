package com.marouane.usertoken.service;

import com.marouane.usertoken.exception.HmacSha256Exception;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;

@Service
public class TokenHasher {

    @Value("${jwt.Hmac-secret}")
    private String SECRET_KEY;

    private static String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes)
            result.append(String.format("%02x", b));
        return result.toString();
    }

    public String hmacSha256(String token) {
        try {
            Mac hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            hmac.init(keySpec);
            byte[] hashBytes = hmac.doFinal(token.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hashBytes);
        } catch (Exception e) {
            throw new HmacSha256Exception("Token Not Hashed");
        }
    }
}
