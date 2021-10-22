package com.neutron.im.websocket.util;

//import cn.iocoder.springboot.lab25.springwebsocket.message.Message;
//import com.alibaba.fastjson.JSONObject;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

//import javax.websocket.RemoteEndpoint;
//import javax.websocket.Session;
//import java.io.IOException;
//import java.util.Map;
//import java.util.concurrent.ConcurrentHashMap;

import com.neutron.im.pojo.entity.Message;
import com.neutron.im.service.AccountService;
import com.neutron.im.service.ChatsService;
import com.neutron.im.service.MessageService;
import com.neutron.im.websocket.MessageParser;
import com.neutron.im.websocket.handler.BaseExecutor;
import com.neutron.im.websocket.handler.DefaultExecutor;
import com.neutron.im.websocket.handler.GroupChatExecutor;
import com.neutron.im.websocket.handler.SingleChatExecutor;
import com.neutron.im.websocket.message.WebSocketMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.websocket.Session;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Component
public class WebSocketUtil {
    public static final MessageParser messageParser = new MessageParser();

    /**
     * 消息内容类型
     */
    private static final Map<String, Integer> CONTENT_TYPE_MAP = new HashMap<>() {{
        put(ChatMessageType.TEXT.getData(), 0);
        put(ChatMessageType.IMAGE.getData(), 1);
        put(ChatMessageType.AUDIO.getData(), 2);
        put(ChatMessageType.VIDEO.getData(), 3);
        put(ChatMessageType.CODE_SNIPS.getData(), 3);
        put(ChatMessageType.FAVORITE.getData(), 3);
        put("other", 4);
    }};
    //    private static final Map<Integer, String> chatTypeMap = new HashMap<>() {{
//        put(0, "single");
//        put(1, "group");
//    }};
    private static final Map<String, Integer> chatTypeToId = new HashMap<>() {{
        put("single", 0);
        put("group", 1);
    }};
    public static ConcurrentHashMap<String, BaseExecutor> handlersMap = new ConcurrentHashMap<>();
    public static DefaultExecutor defaultHandler;
    public static MessageService messageService;
    public static AccountService accountService;
    public static ChatsService chatsService;

    @Autowired
    WebSocketUtil(
        MessageService service,
        AccountService rwaAccountService,
        ChatsService chatsService,
        DefaultExecutor defaultHandler,
        SingleChatExecutor singleChatHandler,
        GroupChatExecutor groupChatHandler
    ) {
        WebSocketUtil.messageService = service;
        WebSocketUtil.accountService = rwaAccountService;
        WebSocketUtil.chatsService = chatsService;
        WebSocketUtil.defaultHandler = defaultHandler;
        handlersMap.put("single", singleChatHandler);
        handlersMap.put("group", groupChatHandler);
    }

    public static void saveMessageToDatabase(WebSocketMessage decodedMessage) {
        // 1st: check if parameters is valid
        if (decodedMessage == null || decodedMessage.getType() == null || decodedMessage.getBody() == null) {
            log.error("Message is empty");
            return;
        }

        // 2ed: save decodedMessage to database;
        // 2.1 insert chat history
        updateMessage(decodedMessage);

        com.neutron.im.websocket.message.Message messageBody = decodedMessage.getBody();

        // TODO 保存消息到数据库
        // 2.2 update recent chat table
//        RecentChat chat = chatsService.findOneById((String) messageBody.get("chat_id"));
//        if (chat == null) {
//            log.warn("No chat Record");
////            chatsService.insertByDefault();
//        } else {
//            chat.setLast_msg_id((String) messageBody.get("id"));
//            chat.setLast_msg_content((String) messageBody.get("content"));
//            chat.setLast_msg_time(new Date((long) messageBody.get("time")));
//            chat.setUnread_count(chat.getUnread_count() + 1);
//            boolean val = WebSocketUtil.chatsService.update(chat);
//            if (!val) {
//                log.error("Update Chat Failed");
//            }
//        }
    }

    private static <T extends com.neutron.im.websocket.message.Message> void updateMessage(WebSocketMessage<T> decodedMessage) {
        T messageBody = decodedMessage.getBody();

        // TODO 更新消息到数据库
//        Message message = new Message() {{
//            setChat_id((String) messageBody.get("chat_id"));
//            // FIXME 会话类型
//            setChat_type(chatTypeToId.get(decodedMessage.getType()));
//            setSender_id((String) messageBody.get("sender_id"));
//            setReceiver_id((String) messageBody.get("receiver_id"));
//            setContent_type(CONTENT_TYPE_MAP.getOrDefault((String) messageBody.get("content_type"), 4));
//            setContent((String) messageBody.getOrDefault("content", ""));
//            setFile_info((String) messageBody.getOrDefault("file_info", ""));
//            setTime(new Date());
//            setStatus(0);
//        }};

//        if (!(message.getChat_id() == null || message.getSender_id() == null || message.getReceiver_id() == null)) {
//            messageService.insertMessage(message);
//        }
    }

    /**
     * 用于单聊，发送消息给客户端
     *
     * @param session 客户端会话 session
     * @param message 消息体
     */
    public static boolean sendText(Session session, String message) {
        if (!session.isOpen()) {
            log.info("客户端已关闭连接");
            return false;
        }
        boolean success = false;
        try {
            session.getBasicRemote().sendText(message);
            success = true;
        } catch (IOException e) {
            log.error("服务端发送消息给客户端失败：{}", e.getMessage());
            e.printStackTrace();
        }
        return success;
    }

    /**
     * 广播消息
     * 发送至每一个在线用户
     */
    @Deprecated
    public static void broadcast(String message) {
        for (var item : MemoryUtil.clientMap().entrySet()) {
            //同步异步说明参考：http://blog.csdn.net/who\_is\_xiaoming/article/details/53287691
            item.getValue().session.getAsyncRemote().sendText(message);//异步发送消息.
        }
    }

    public enum ChatMessageType {
        TEXT("text"),
        IMAGE("image"),
        AUDIO("audio"),
        VIDEO("video"),
        CODE_SNIPS("codesnips"),
        FAVORITE("favorite");

        private final String data;

        ChatMessageType(String data) {
            this.data = data;
        }

        public String getData() {
            return data;
        }
    }

//    public enum MessageType {
//        SINGLE("single"),
//        GROUP("group");
//
//        private final String data;
//
//        MessageType(String data) {
//            this.data = data;
//        }
//
//        public String getData() {
//            return data;
//        }
//    }


//    public static boolean send(Session session, WebSocketMessage message) {
//        return send(session, messageParser.encode(message));
//    }

//    @Deprecated
//    public static int send(List<Session> sessionList, String message) {
//        if (sessionList == null) {
//            log.error("IllegalArguments: Session Not Null");
//            return 0;
//        }
//        int sentCount = 0;
//        for (Session session : sessionList) {
//            if (session.isOpen() && send(session, message)) {
//                sentCount++;
//            }
//        }
//        return sentCount;
//    }

//    public static int send(List<Session> sessionList, WebSocketMessage message) {
//        return send(sessionList, messageParser.encode(message));
//    }


    //
//    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketUtil.class);
//
//    // ========== 会话相关 ==========
//
//    /**
//     * Session 与用户的映射
//     */
//    private static final Map<Session, String> SESSION_USER_MAP = new ConcurrentHashMap<>();
//    /**
//     * 用户与 Session 的映射
//     */
//    private static final Map<String, Session> USER_SESSION_MAP = new ConcurrentHashMap<>();
//
//    /**
//     * 添加 Session 。在这个方法中，会添加用户和 Session 之间的映射
//     *
//     * @param session Session
//     * @param user 用户
//     */
//    public static void addSession(Session session, String user) {
//        // 更新 USER_SESSION_MAP
//        USER_SESSION_MAP.put(user, session);
//        // 更新 SESSION_USER_MAP
//        SESSION_USER_MAP.put(session, user);
//    }
//
//    /**
//     * 移除 Session 。
//     *
//     * @param session Session
//     */
//    public static void removeSession(Session session) {
//        // 从 SESSION_USER_MAP 中移除
//        String user = SESSION_USER_MAP.remove(session);
//        // 从 USER_SESSION_MAP 中移除
//        if (user != null && user.length() > 0) {
//            USER_SESSION_MAP.remove(user);
//        }
//    }
//
//    // ========== 消息相关 ==========
//
//    /**
//     * 广播发送消息给所有在线用户
//     *
//     * @param type 消息类型
//     * @param message 消息体
//     * @param <T> 消息类型
//     */
//    public static <T extends Message> void broadcast(String type, T message) {
//        // 创建消息
//        String messageText = buildTextMessage(type, message);
//        // 遍历 SESSION_USER_MAP ，进行逐个发送
//        for (Session session : SESSION_USER_MAP.keySet()) {
//            sendTextMessage(session, messageText);
//        }
//    }
//
//    /**
//     * 发送消息给单个用户的 Session
//     *
//     * @param session Session
//     * @param type 消息类型
//     * @param message 消息体
//     * @param <T> 消息类型
//     */
//    public static <T extends Message> void send(Session session, String type, T message) {
//        // 创建消息
//        String messageText = buildTextMessage(type, message);
//        // 遍历给单个 Session ，进行逐个发送
//        sendTextMessage(session, messageText);
//    }
//
//    /**
//     * 发送消息给指定用户
//     *
//     * @param user 指定用户
//     * @param type 消息类型
//     * @param message 消息体
//     * @param <T> 消息类型
//     * @return 发送是否成功你那个
//     */
//    public static <T extends Message> boolean send(String user, String type, T message) {
//        // 获得用户对应的 Session
//        Session session = USER_SESSION_MAP.get(user);
//        if (session == null) {
//            LOGGER.error("[send][user({}) 不存在对应的 session]", user);
//            return false;
//        }
//        // 发送消息
//        send(session, type, message);
//        return true;
//    }
//
//    /**
//     * 构建完整的消息
//     *
//     * @param type 消息类型
//     * @param message 消息体
//     * @param <T> 消息类型
//     * @return 消息
//     */
//    private static <T extends Message> String buildTextMessage(String type, T message) {
//        JSONObject messageObject = new JSONObject();
//        messageObject.put("type", type);
//        messageObject.put("body", message);
//        return messageObject.toString();
//    }
//
//    /**
//     * 真正发送消息
//     *
//     * @param session Session
//     * @param messageText 消息
//     */
//    private static void sendTextMessage(Session session, String messageText) {
//        if (session == null) {
//            LOGGER.error("[sendTextMessage][session 为 null]");
//            return;
//        }
//        RemoteEndpoint.Basic basic = session.getBasicRemote();
//        if (basic == null) {
//            LOGGER.error("[sendTextMessage][session 的  为 null]");
//            return;
//        }
//        try {
//            basic.sendText(messageText);
//        } catch (IOException e) {
//            LOGGER.error("[sendTextMessage][session({}) 发送消息{}) 发生异常",
//                    session, messageText, e);
//        }
//    }

}
