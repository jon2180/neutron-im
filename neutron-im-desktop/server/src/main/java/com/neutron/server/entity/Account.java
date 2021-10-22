package com.neutron.server.entity;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
import java.util.Date;

/**
 * 账号表的字段映射
 * 类名与数据库字段名一致。类中每一个属性都对应一个数据表的字段。实现 Serializable 是为了可以在网络流中传输对象。
 *
 * @version v191208
 */
@Data
@Accessors(chain = true)
@ToString
public class Account {
    /**
     * id号 也是 QQ号
     */
    private int id;

    /**
     * 昵称
     */
    private int uid;
    /**
     * 昵称
     */
    private String email;
    /**
     * 邮箱
     */
    private String nickname;

    /**
     * 签名
     */
    private String signature;

    /**
     * 电话号码
     */
    private String tel;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 密码
     */
    private String password;

    /**
     * 密码混合的盐
     */
    private String salt;

    /**
     * 生日
     */
    private Timestamp birthday;

    /**
     * 注册时间
     */
    private Timestamp registerTime;

    /**
     * 状态：即是否被禁用
     */
    private int status;
}
