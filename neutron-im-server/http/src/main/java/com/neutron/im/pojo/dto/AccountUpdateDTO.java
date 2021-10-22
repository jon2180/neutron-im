package com.neutron.im.pojo.dto;

import lombok.Data;

@Data
public class AccountUpdateDTO {
    String nickname;
    String signature;
    String gender;
    Long birthday;
}
