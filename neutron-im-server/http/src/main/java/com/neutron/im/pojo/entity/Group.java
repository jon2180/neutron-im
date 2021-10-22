package com.neutron.im.pojo.entity;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class Group {
    /**
     * 序列号 id
     */
    private String id;
    /**
     * 群组 id
     */
    private String gid;
    /**
     * 群名称
     */
    private String name;
    /**
     * 群简介
     */
    private String desc;
    /**
     * 群标签，用 ‘;’ 连接
     */
    private String tags;
    /**
     * 群头像
     */
    private String avatar;
    /**
     * 群成员数量
     */
    private int numbers;
    /**
     * 群主 id
     */
    private int ownerId;
    /**
     * 管理员简要信息，json 格式
     */
    private String managers_json;
    /**
     * 创建时间
     */
    private Date create_time;
    /**
     * 群类型
     */
    private int type;
    /**
     * 群状态
     */
    private int status;
    /**
     * 预留字段
     */
    private String extra;
}
