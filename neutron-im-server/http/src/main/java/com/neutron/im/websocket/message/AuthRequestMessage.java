package com.neutron.im.websocket.message;

import lombok.Data;

/**
 * 用户认证请求
 * 在 WebSocket 协议中，我们也需要认证当前连接，用户身份是什么。一般情况下，我们采用用户调用 HTTP 登录接口，登录成功后返回的访问令牌 accessToken 。
 */
@Data
public class AuthRequestMessage implements Message {
    public static final String TYPE = "AUTH_REQUEST";

    /**
     * 认证 token
     */
    private String accessToken;
}
