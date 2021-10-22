package com.neutron.im.websocket.message;

import lombok.Data;

@Data
public class SendToUserResponse implements Message {

    public static final String TYPE = "SEND_TO_USER_REQUEST";

    /**
     * 消息编号
     */
    private String msgId;
    /**
     * 响应状态码
     */
    private Integer code;
    /**
     * 响应提示
     */
    private String message;

    private String chatId;

    private String content;

    private String contentType;

    private String id;

    private String senderId;
    private String receiverId;
    private long time;

    // ... 省略 set/get 方法


}
