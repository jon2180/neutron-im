package com.neutron.server.entity;

import lombok.Data;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.sql.Timestamp;
import java.util.Date;

/**
 * 朋友关系表的字段映射
 *
 * <p>类名与数据库字段名一致。类中每一个属性都对应一个数据表的字段。实现 Serializable 是为了可以在网络流中传输对象。</p>
 *
 * @version v191208
 */
@Data
@Accessors(chain = true)
@ToString
public class Friend {

    /**
     * 独一无二的 message id
     */
    private int id;

    /**
     * 发送者账户
     */
    private int fid1;
    private int fid2;

    /**
     * 所在群组
     */
    private String cateName1;
    private String cateName2;

    private Timestamp linkTime;

    private int status;
    /**
     * 好友状态，即为是否在黑名单
     */
    private int type;
}
