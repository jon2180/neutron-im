package com.neutron.server.entity;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.sql.Timestamp;

/**
 * 描述 消息表 的 数据库表字段类型
 * 类名与数据库字段名一致。类中每一个属性都对应一个数据表的字段。实现 Serializable 是为了可以在网络流中传输对象。
 *
 * @version v191208
 */
@Accessors(chain = true)
@Data
@ToString
public class Message {
    /**
     *
     */
    private static final long serialVersionUID = 1L;
    /**
     * 消息id
     */
    private int id;

    private int chatType;
    /**
     * 发消息的账号
     */
    private int senderId;
    private String senderName;
    private String senderAvatar;
    /**
     * 收消息的账号
     */
    private int receiverId;
    private String receiverName;
    private String receiverAvatar;

    /**
     * 消息类型，可能是文本，图片，音频，视频等，但具体实现之后考虑
     */
    private int type;

    /**
     * 消息内容，之后可能要该
     */
    private String content;

    private String fileInfo;
    private Timestamp time;
    private int status;
}
