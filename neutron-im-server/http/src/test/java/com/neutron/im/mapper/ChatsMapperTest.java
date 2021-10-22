package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.RecentChat;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith({SpringExtension.class})
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Transactional
class ChatsMapperTest {

    @Autowired
    private ChatsMapper chatsService;

    private String serialId = null;

    @Test
    @Order(1)
    void insertByDefault() {
        RecentChat val = new RecentChat() {{
//            setCid(StringUtil.generateUid(16));
//            setAccount_id(3);
            setType(0);
//            setOpposite_name(1);
//            setSender_id(3);
//            setReceiver_id(4);
//            setLast_msg_id(1);
            setLast_msg_content("hello boy");
            setUnread_count(1);
        }};
        if (val.getId() == null || val.getId().equals("")) {
            System.out.println("Chat is null");
            return;
        }
        System.out.println(val);
//        int id = chatsService.insertByDefault(val);
//        System.out.println("id: " + id);
//        this.serialId = val.getId();
//        System.out.println(val);
    }

    @Test
    @Order(2)
    void findByAccountId() {
        System.out.println(serialId);
        List<Map<String, Object>> chats = chatsService.findByAccountId("");
        assertNotNull(chats);
        for (Map<String, Object> chat : chats) {
            System.out.println(chat);
            assertNotNull(chat);
        }
    }

    @Test
    @Order(3)
    void update() {
        System.out.println(serialId);
        RecentChat chat = chatsService.findById(serialId);
//        assertNotNull(chat);
        System.out.println(chat);
        if (chat == null) {
            System.out.println("Chat is null");
            return;
        }
        chat.setLast_msg_time(new Date());
        chat.setLast_msg_content("123456 edited");
//        chat.setLast_msg_id(2);
        boolean success = chatsService.update(chat);
        System.out.println(success);
    }

    @Test
    @Order(4)
    void findById() {
        System.out.println(serialId);
        RecentChat chat = chatsService.findById("serialId");
        assertNotNull(chat);
        System.out.println(chat);
    }

    @Test
    @Order(5)
    void deleteById() {
        System.out.println(serialId);
        if (serialId != null) {
            int num = chatsService.delete(serialId);
        }
    }

}
