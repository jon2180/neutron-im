package com.neutron.im.service;

import com.neutron.im.pojo.entity.RecentChat;
import com.neutron.im.mapper.ChatsMapper;
import com.neutron.im.pojo.vo.ChatVO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ChatsService {

    private final ChatsMapper chatsMapper;

    public ChatsService(ChatsMapper chatsMapper) {
        this.chatsMapper = chatsMapper;
    }

    public List<Map<String, Object>> findAllByAccountId(String id) {
        return chatsMapper.findByAccountId(id);
    }

    public RecentChat findOneById(String id) {
        return chatsMapper.findById(id);
    }

    public boolean update(RecentChat chat) {
        return chatsMapper.update(chat);
    }

    public int deleteById(String id) {
        return chatsMapper.delete(id);
    }

    public int insertByDefault(RecentChat recentChat) {
        return chatsMapper.insertByDefault(recentChat);
    }

    public ChatVO findOneById(String firstId, String secondId) {
        return chatsMapper.findByDoubleId(firstId, secondId);
    }
}
