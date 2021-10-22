package com.neutron.im.pojo.vo;

import lombok.Data;

import java.util.Date;

/**
 * 好友请求，群组请求
 */
@Data
public class RequestVO {
    private String id;
    private String account_id;
    //    private String target_id;
    private int type;
    private String submit_reason;
    private Date submit_time;
    private int solved_result;
    private String solved_reason;
    private Date solved_time;
    private String extra;

    /**
     * 对方头像
     */
    private String avatar;
    private String nickname;
}
