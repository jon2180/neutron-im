package com.neutron.im.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.neutron.im.pojo.code.StatusCode;
import com.neutron.im.pojo.dto.RequestDTO;
import com.neutron.im.pojo.entity.Message;
import com.neutron.im.pojo.entity.RecentChat;
import com.neutron.im.pojo.vo.ResultVO;
import com.neutron.im.service.ChatsService;
import com.neutron.im.service.MessageService;
import com.neutron.im.util.TokenUtil;
import com.neutron.im.websocket.WebSocketServerEndpoint;
import com.neutron.im.websocket.message.SendToUserResponse;
import com.neutron.im.websocket.message.WebSocketMessage;
import com.neutron.im.websocket.util.MemoryUtil;
import com.neutron.im.websocket.util.WebSocketUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/messages")
public class MessageController {

    private static final Map<String, Integer> map = new HashMap<>() {{
        put("text", 0);
        put("image", 1);
        put("voice", 2);
        put("video", 3);
        put("other", 4);
    }};

    private static final Map<Integer, String> chatTypeMap = new HashMap<>() {{
        put(0, "single");
        put(1, "group");
    }};

    private final MessageService messageService;
    private final ChatsService chatsService;

    @Autowired
    public MessageController(MessageService service, ChatsService chatsService) {
        this.messageService = service;
        this.chatsService = chatsService;
    }

    /**
     * 分页获取聊天记录
     *
     * @param id       chatId
     * @param ackNo    ack编号
     * @param pageNum  页码
     * @param pageSize 每页大小
     * @param claims   个人信息
     * @return 对象
     */
    @GetMapping("/{id}")
    public ResultVO getChatHistory(
        @PathVariable String id,
        @RequestParam(required = false) String ackNo,
        @RequestParam(required = false) Integer pageNum,
        @RequestParam(required = false) Integer pageSize,
        @RequestAttribute TokenUtil.JwtClaimsData claims
    ) {
        if (pageNum == null) {
            pageNum = 1;
        }
        if (pageSize == null) {
            pageSize = 20;
        }
        List<Message> messages = messageService.findByChatId(id, pageNum, pageSize);
        return ResultVO.success(messages);
    }

    @PostMapping("/")
    public ResultVO postChatHistory(
        @RequestBody RequestDTO.MessageSaveForm message,
        @RequestAttribute TokenUtil.JwtClaimsData claims
    ) {
        // 1st: check if parameters is valid
        if (message == null || message.getContent() == null || "".equals(message.getContent())) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "Invalid Parameters", null);
        }

        if (!Objects.equals(claims.getId(), message.getSender_id())) {
            return ResultVO.failed(StatusCode.S403_FORBIDDEN, "Can`t Send Message From Others By Yourself", null);
        }

        // 2ed: save message to database;
        // 2.1 insert chat history
        messageService.insertMessage(new Message() {{
            setChat_id(message.getChat_id());
            setChat_type(message.getChat_type());
            setSender_id(message.getSender_id());
            setReceiver_id(message.getReceiver_id());
            setContent_type(map.getOrDefault(message.getContent_type(), 4));
            setContent(message.getContent());
            setFile_info(message.getFile_info());
            setTime(message.getTime());
            setStatus(message.getStatus());
        }});

        // 2.2 update recent chat table
        RecentChat chat = chatsService.findOneById(message.getChat_id());
        if (chat == null) {
            return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "No Chat Record", null);
        }
        chat.setLast_msg_id(message.getId());
        chat.setLast_msg_content(message.getContent());
        chat.setLast_msg_time(message.getTime());
        chat.setUnread_count(chat.getUnread_count() + 1);
        boolean val = chatsService.update(chat);

        if (!val) {
            return ResultVO.failed(StatusCode.S500_SQL_ERROR, "Update Failed");
        }
        WebSocketServerEndpoint messageClient = MemoryUtil.clientMap().get(message.getReceiver_id());
        if (messageClient == null) {
            return ResultVO.failed(StatusCode.S500_SQL_ERROR, "Update Failed");
        }
        if (messageClient.session == null || !messageClient.session.isOpen()) {
            return ResultVO.failed(StatusCode.S500_SQL_ERROR, "Update Failed");
        }
        // 3rd: relay message
        boolean sendResult = false;
        try {
            sendResult = WebSocketUtil.sendText(messageClient.session, WebSocketUtil.messageParser.encode(
                new WebSocketMessage<SendToUserResponse>() {{
                    // TODO set chat type
                    setType(message.getChat_type() == 0 ? "single" : "group");
                    setBody(new SendToUserResponse() {{
                        setChatId(message.getChat_id());
                        setContent(message.getContent());
                        setContentType(message.getContent_type());
                        setId(message.getId());
                        setSenderId(message.getSender_id());
                        setReceiverId(message.getReceiver_id());
                        setTime(message.getTime().getTime());
                    }});
                }}));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        log.info("sent result: {}", sendResult);

        // 4th: response to client
        return ResultVO.success(null);
    }
}
