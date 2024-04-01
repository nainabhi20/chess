package com.example.chess.Dto.Response;

import com.example.chess.Dto.BaseDTO;

import java.util.*;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class BoardResponse extends BaseDTO {
    private List<BoxResponse> boxes;
}
