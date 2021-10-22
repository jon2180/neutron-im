package com.neutron.im.websocket.message;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class WebSocketMessage<BodyType extends Message> {
    /**
     * 表示唯一状态的标识，格式 <code>{timestamp}.{uniqueId}.</code>
     */
    private String requestId;

    /**
     * 消息类型，群聊，单聊，通知，授权，心跳（及以上几种对应的响应）
     */
    private String type;

    /**
     * 消息实体
     */
    private BodyType body;
}
