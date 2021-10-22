package com.neutron.im.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * redis操作工具类.</br>
 * (基于RedisTemplate)
 *
 * @author xcbeyond
 * 2018年7月19日下午2:56:24
 */
@Component
public class RedisUtil {

    private final RedisTemplate<String, String> redisTemplate;

    @Autowired
    RedisUtil(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * 读取缓存
     *
     * @param key 键
     * @return 取值
     */
    public String get(final String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    /**
     * 写入缓存
     */
    public boolean set(final String key, String value) {
        boolean result = false;
        try {
            redisTemplate.opsForValue().set(key, value);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 更新缓存
     */
    public boolean getAndSet(final String key, String value) {
        boolean result = false;
        try {
            redisTemplate.opsForValue().getAndSet(key, value);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    /**
     * 删除缓存
     */
    public boolean delete(final String key) {
        boolean result = false;
        try {
            redisTemplate.delete(key);
            result = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public boolean setHashMap(String redisKey, String hashKey, String value) {
        try {
            redisTemplate.opsForHash().put(redisKey, hashKey, value);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public String getHashValue(String redisKey, String hashKey) {
        if (StringUtil.isEmpty(redisKey)) {
            return null;
        }
        if (hashKey == null) {
            return null;
        }
        try {
            return (String) redisTemplate.opsForHash().get(redisKey, hashKey);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Map<Object, Object> getHashes(String redisKey) {
        if (StringUtil.isEmpty(redisKey)) {
            return null;
        }
        try {
            return redisTemplate.opsForHash().entries(redisKey);
        } catch (Exception e) {
            return null;
        }
    }
}
