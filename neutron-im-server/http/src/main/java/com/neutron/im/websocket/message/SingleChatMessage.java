package com.neutron.im.websocket.message;

import lombok.Data;

/**
 * 发送给指定人的私聊消息的 Message
 */
@Data
public class SingleChatMessage implements Message {
    public static final String TYPE = "SENT_TO_ONE_REQUEST";

    private String messageId;

    /**
     * 发送给的用户
     */
    private String toUser;

    private String content;

    private String contentType;
}
