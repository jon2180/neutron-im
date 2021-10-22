package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.Message;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith({SpringExtension.class})
//@Transactional
class MessageMapperTest {

    @Autowired
    private MessageMapper mapper;

    @Test
    void findBySenderAndReceiver() {
        List<Message> messages = mapper.findBySenderAndReceiver("1", "2");
        System.out.println(messages);
    }

    @Test
    void insertMessage() {
//        Message message = new Message() {{
//            setChat_type(0);
//            setChat_id(13);
//            setSender_id(3);
//            setReceiver_id(4);
//            setContent("test");
//            setTime(new Date());
//            setStatus(0);
//            setContent_type(0);
//        }};
//        int insertRows = mapper.insertMessage(message);
//        System.out.println(insertRows);
//        System.out.println(message);
    }
}
