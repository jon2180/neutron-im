package com.neutron.im.pojo.vo;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

@Data
@ToString
public class ChatVO {
    private String id;
    private String account_id;
    private String target_id;
    private int type;
    private String sender_id;
    private String receiver_id;
    private Date last_msg_time;
    private String last_msg_id;
    private String last_msg_content;
    private int unread_count;
    private int status;

    private String account_email;
    private String account_nickname;
    private String account_signature;
    private String account_avatar;
    private String account_status;
}
