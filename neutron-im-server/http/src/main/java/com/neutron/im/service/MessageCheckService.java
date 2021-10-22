package com.neutron.im.service;

import com.neutron.im.util.RedisUtil;
import com.neutron.im.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class MessageCheckService {

    private final RedisUtil redisUtil;

    private final String keyFormat = "nim:msg.check:{userid}";

    @Autowired
    public MessageCheckService(RedisUtil redisUtil) {
        this.redisUtil = redisUtil;
    }

    private static String getKey(String viewId) {
        if (viewId == null) return null;
        return String.format(
            "nim:msg.checking:%s",
            URLEncoder.encode(viewId, StandardCharsets.UTF_8)
        );
    }

    public Long getLastCheckTime(String viewerId, String targetId) {
        try {
            return Long.parseLong(redisUtil.getHashValue(MessageCheckService.getKey(viewerId), targetId));
        } catch (ClassCastException e) {
            e.printStackTrace();
            return 0L;
        }
    }

    public Map<Object, Object> getEntries(String viewerId) {
        if (StringUtil.isEmpty(viewerId)) return null;
        return redisUtil.getHashes(MessageCheckService.getKey(viewerId));
    }

    public boolean setOrUpdate(String viewerId, String targetId, Long latestData) {
        try {
            return redisUtil.setHashMap(MessageCheckService.getKey(viewerId), targetId, String.valueOf(latestData));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
