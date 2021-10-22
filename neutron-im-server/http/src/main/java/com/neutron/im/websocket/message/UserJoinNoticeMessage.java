package com.neutron.im.websocket.message;

import lombok.Data;

/**
 * 用户成功认证之后，会广播用户加入群聊的通知 Message
 */
@Data
public class UserJoinNoticeMessage implements Message {
    public static final String TYPE = "USER_JOIN_NOTICE_REQUEST";

    /**
     * 昵称
     */
    private String nickname;
}
