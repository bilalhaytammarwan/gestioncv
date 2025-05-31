package com.marouane.usertoken.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TokenDTO {
    private String token;
    private Date createdAt = new Date();
    private Date expiredAt = new Date();
    private String ipAddress;
    private String userAgent;
    private String platform;
    private Date lastUsedAt;
    private Date session_start_time = new Date();
}
