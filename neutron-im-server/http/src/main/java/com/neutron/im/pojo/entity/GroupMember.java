package com.neutron.im.pojo.entity;

import lombok.Data;

import java.util.Date;

@Data
public class GroupMember {
    /**
     * 序列号 id
     */
    private String id;
    /**
     * 群员用户 id group member id
     */
    private String mid;
    /**
     * 群 id
     */
    private String group_id;
    /**
     * 群头像
     */
    private String avatar;
    /**
     * 群昵称
     */
    private String group_nickname;
    /**
     * 所在群组里的角色
     */
    private int group_role;
    /**
     * 群状态
     */
    private int group_status;
    /**
     * 禁言时间
     */
    private Date muted_time;
    /**
     * 禁言时长
     */
    private long muted_during;
    /**
     * 进群时间
     */
    private Date enter_time;
    /**
     * 预留字段
     */
    private String extra;
}
