package com.neutron.im.pojo.entity;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.util.Date;

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
     * 消息id
     */
    private String id;
    private String chat_id;
    /**
     * 发消息的账号
     */
    private String sender_id;

    /**
     * 收消息的账号
     */
    private String receiver_id;
    private int chat_type;

    /**
     * 消息类型，可能是文本，图片，音频，视频等，但具体实现之后考虑
     * <p>
     * 0 文本 1 图片 2 音频 3 视频 4 二进制
     */
    private int content_type;

    /**
     * 消息内容，之后可能要该
     */
    private String content;

    private String file_info;
    private Date time;
    private int status;
    private String extra;
}
