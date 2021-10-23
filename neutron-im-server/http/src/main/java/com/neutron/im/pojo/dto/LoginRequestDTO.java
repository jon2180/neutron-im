package com.neutron.im.pojo.dto;

import lombok.Data;

@Data
public class LoginRequestDTO {
    private String email;
    private String password;
    private String captcha;
}
