package com.example.chess.Dto.Response;

import com.example.chess.Dto.BaseDTO;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class UserInfoResponse extends BaseDTO {
    private String userId;
    private String userName;
}
