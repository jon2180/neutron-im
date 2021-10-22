package com.neutron.im.websocket.message;

import lombok.Data;

/**
 * 用户认证请求，是需要用户认证响应的
 */
@Data
public class AuthResponseMessage implements Message {
    public static final String TYPE = "AUTH_RESPONSE";

    /**
     * 响应状态码
     */
    private Integer code;

    /**
     * 响应提示
     */
    private String message;
}
