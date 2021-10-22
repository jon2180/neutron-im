package com.neutron.im.pojo.vo;

import lombok.Data;

/**
 * 好友列表项目 View Object
 */
@Data
public class FriendVO {
    private String id;
    private String account_id;
    private String nickname;

    private String signature;
    private String avatar;
    /**
     * fid_1 在 fid_2 这边的好友信息
     */
    private String category;
    private String remark_name;
    private String status;
    private String link_time;
    private String type;
}
