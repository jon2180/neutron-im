package com.neutron.im.pojo.dto;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class RegisterDto {
    private String email;
    private String password;
    private String nickname;
    private String captcha;
}
