package com.neutron.im.websocket.message;

import lombok.Data;

/**
 * 发送给所有人的群聊消息的 Message。
 */
@Data
public class GroupChatMessage implements Message {
    public static final String TYPE = "SEND_TO_ALL_REQUEST";

    /**
     * 消息编号
     */
    private String messageId;
    /**
     * 内容
     */
    private String content;

    private String contentType;
    // ... 省略 set/get 方法
}
