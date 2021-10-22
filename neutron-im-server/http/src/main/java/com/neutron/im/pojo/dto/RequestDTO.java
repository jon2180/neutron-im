package com.neutron.im.pojo.dto;

import lombok.Data;
import lombok.ToString;

import java.util.Date;

public class RequestDTO {

    @Data
    @ToString
    public static class RegisterForm {
        private String email;
        private String password;
        private String nickname;
    }

    @Data
    @ToString
    public static class UpdateFriendForm {
        private String category;
        private int status;
    }


    @Data
    @ToString
    public static class ChatsRequestForm {
        private String type;
        private String sender_id;
        private String receiver_id;
    }

    @Data
    @ToString
    public static class MessageSaveForm {
        private String id;
        private String chat_id;
        private String sender_id;
        private String receiver_id;
        /**
         * 消息内容类型
         */
        private String content_type;
        /**
         * 聊天类型，群聊，单聊等
         */
        private int chat_type;
        private String content;
        private String file_info;
        private Date time;
        /**
         * 已读状态
         */
        private int status;
    }

    @Data
    @ToString
    public static class AddFriendRequest {
        private String oppositeId;
        private String reason;
    }

    @Data
    @ToString
    public static class ConfirmFriendRequest {
        private String type;
        private String reason;
    }
}
