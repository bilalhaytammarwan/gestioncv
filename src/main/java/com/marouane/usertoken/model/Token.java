package com.marouane.usertoken.model;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "tokens")
@TypeAlias("token")
public class Token {
    @Id
    private String id;

    @NotBlank(message = "User ID must not be blank")
    private String userId;

    @NotBlank(message = "Token must not be blank")
    @Size(min = 10, max = 500, message = "Token length must be between 10 and 500 characters")
    private String token;

    @NotNull(message = "Token type must not be null")
    private TokenType tokenType = TokenType.REFRESH;

    private boolean revoked = false;
    private boolean expired = false;
    private boolean used = false;

    @NotNull(message = "Created date must not be null")
    @PastOrPresent(message = "Created date cannot be in the future")
    private Date createdAt = new Date();

    @NotNull(message = "Expiration date must not be null")
    private Date expiredAt = new Date();
    @NotNull(message = "IP Address must not be null")
    @Pattern(
            regexp = "^(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$|^([a-fA-F\\d]{0,4}:){1,7}[a-fA-F\\d]{0,4}$",
            message = "Invalid IP address format"
    )
    private String ipAddress;

    @NotNull(message = "User Agent must not be null")
    @Size(max = 512, message = "User agent string too long")
    private String userAgent;

    @NotNull(message = "Platform must not be null")
    @Size(max = 100, message = "Platform name too long")
    @Pattern(
            regexp = "^(WEB|Windows|macOS|Linux|Android|iOS|Other)?$",
            message = "Invalid platform name"
    )
    private String platform;

    @NotNull(message = "Last Used At must not be null")
    @PastOrPresent(message = "Last used date cannot be in the future")
    private Date lastUsedAt;

    @NotNull(message = "Session start time must not be null")
    @PastOrPresent(message = "Session start time cannot be in the future")
    private Date session_start_time = new Date();
}
