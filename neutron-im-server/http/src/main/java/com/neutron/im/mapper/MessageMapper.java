package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.Message;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

@Mapper
public interface MessageMapper {
    Message findOneById(String id);

    List<Message> findBySenderAndReceiver(String id1, String id2);

    int insert(Message message);

    List<Message> findByChatId(String chatId);

    Map<String, Object> countAfter(String chatId, Timestamp time);
}
