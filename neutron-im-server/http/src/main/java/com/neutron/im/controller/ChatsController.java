package com.neutron.im.controller;

import com.neutron.im.pojo.code.StatusCode;
import com.neutron.im.pojo.dto.RequestDTO;
import com.neutron.im.pojo.entity.RecentChat;
import com.neutron.im.pojo.vo.ChatVO;
import com.neutron.im.pojo.vo.ResultVO;
import com.neutron.im.service.ChatsService;
import com.neutron.im.service.MessageCheckService;
import com.neutron.im.service.MessageService;
import com.neutron.im.util.StringUtil;
import com.neutron.im.util.TokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/chats")
public class ChatsController {

    private final ChatsService chatsService;
    private final MessageService messageService;
    private final MessageCheckService messageCheckService;

    @Autowired
    public ChatsController(ChatsService chatsService, MessageService messageService, MessageCheckService messageCheckService) {
        this.chatsService = chatsService;
        this.messageService = messageService;
        this.messageCheckService = messageCheckService;
    }

    @GetMapping("/")
    public ResultVO getChats(@RequestAttribute("claims") TokenUtil.JwtClaimsData claims) {
        // find all chats related to the account
        List<Map<String, Object>> chats = chatsService.findAllByAccountId(claims.getId());
        log.info("chats: {}", chats);
        Map<Object, Object> checkTimeMap = messageCheckService.getEntries(claims.getId());
        log.info("checkTimeMap: {}", checkTimeMap);
        if (checkTimeMap != null) {
            final Date defaultTime = new Date(0L);
            try {
                log.info("chatSize: {}", chats.size());
                for (Map<String, Object> item : chats) {
                    String chatId = (String) item.get("id");
                    log.info("chat_id: {}", chatId);
                    if (checkTimeMap.containsKey(chatId)) {
                        long latestCheckTime = Long.parseLong((String) checkTimeMap.get(chatId));
                        long count = messageService.countAfter(chatId, latestCheckTime);
                        item.replace("unread_count", count);
                        log.info("checked {} {}", latestCheckTime, count);
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                return ResultVO.failed(StatusCode.S500_LOGIC_ERROR, "Search Failed");
            }
            log.info("checkTimeMap is not null");
        } else {
            log.info("checkTimeMap is  null");
        }

        return ResultVO.success(chats);
    }

    /**
     * 通过 会话双方的用户 id 来查找会话信息
     */
    @GetMapping("/id")
    public ResultVO getChatByAccountId(@RequestAttribute("claims") TokenUtil.JwtClaimsData claims, @RequestBody Map<String, String> body) {
        final String firstId = body.getOrDefault("sender_id", "");
        final String secondId = body.getOrDefault("receiver_id", "");

        ChatVO chat = chatsService.findOneById(firstId, secondId);
        if (chat == null) {
            return ResultVO.failed(StatusCode.S500_LOGIC_ERROR, "错误的请求");
        }
        return ResultVO.success(chat);
    }

    /**
     * 获取会话
     */
    @GetMapping("/{id}")
    public ResultVO getChat(@PathVariable String id, @RequestAttribute("claims") TokenUtil.JwtClaimsData claims) {
        if (id == null || "".equals(id)) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "No Parameter: id", null);
        }
        RecentChat chat = chatsService.findOneById(id);
        if (chat == null || chat.getId() == null || "".equals(chat.getId())) {
            return ResultVO.failed(StatusCode.S404_NOT_FOUND, "No Specific Chat", null);
        }
        if (!claims.getId().equals(chat.getAccount_id())) {
            return ResultVO.failed(StatusCode.S403_FORBIDDEN, "No Authorization", null);
        }
        return ResultVO.success(chat);
    }

    @Transactional
    @PostMapping("/")
    public ResultVO postChats(@RequestAttribute("claims") TokenUtil.JwtClaimsData claims, @RequestBody RequestDTO.ChatsRequestForm body) {
        if (body == null) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "请指定参数", null);
        }
        if (StringUtil.isEmpty(body.getSender_id()) || StringUtil.isEmpty(body.getReceiver_id()) || StringUtil.isEmpty(body.getType())) {
            return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "错误的请求");
        }

        final ChatVO chat = chatsService.findOneById(body.getSender_id(), body.getReceiver_id());
        if (chat != null) {
            return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "Exist Chat");
        }

        int insertRow = chatsService.insertByDefault(new RecentChat() {{
            setAccount_id(body.getSender_id());
            setTarget_id(body.getReceiver_id());
            setType("single".equals(body.getType()) ? 0 : 1);
        }});

        if (insertRow == 0) {
            return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "Insert Failed");
        }

        var data = chatsService.findOneById(body.getSender_id(), body.getReceiver_id());

        return ResultVO.success(data);
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResultVO deleteChats(@PathVariable String id, @RequestAttribute("claims") TokenUtil.JwtClaimsData claims) {
        return ResultVO.failed(StatusCode.S500_LOGIC_ERROR, "NotImplemented", null);
    }
}
