package com.marouane.usertoken.mapper;

import com.marouane.usertoken.dto.TokenDTO;
import com.marouane.usertoken.model.Token;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TokenMapper {
        @Mapping(source = "token", target = "token")
        Token toEntity(TokenDTO tokenDto);
        TokenDTO toDto(Token token);
}
