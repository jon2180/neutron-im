package com.neutron.im.pojo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;

import java.sql.Timestamp;

/**
 * 朋友关系表的字段映射
 *
 * <p>类名与数据库字段名一致。类中每一个属性都对应一个数据表的字段。实现 Serializable 是为了可以在网络流中传输对象。</p>
 *
 * @version v191208
 */
@Data
@ToString
public class Friend {

    /**
     * 独一无二的 message id
     */
    private String id;

    /**
     * 账户1
     */
    private String fid_1;
    @JsonProperty("category_name_1")
    private String cate_name_1;
    private String remark_name_1;
    private int status_1;

    /**
     * 账户1
     */
    private String fid_2;
    @JsonProperty("category_name_2")
    private String cate_name_2;
    private String remark_name_2;

    private Timestamp link_time;

    /**
     * 好友关系状态
     */
    private int status_2;
    /**
     * 好友状态，即为是否在黑名单
     */
    private int type;
    private String extra;
}

