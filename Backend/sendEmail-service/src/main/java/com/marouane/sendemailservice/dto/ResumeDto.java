package com.marouane.sendemailservice.dto;

import com.marouane.sendemailservice.model.AttachementType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResumeDto {
    private String name;
    private String type;
    private long size;
    private byte[] bytes;
    private final AttachementType attachementType = AttachementType.CV;
}