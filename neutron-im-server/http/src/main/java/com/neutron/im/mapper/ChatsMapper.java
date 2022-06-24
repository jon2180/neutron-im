package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.RecentChat;
import com.neutron.im.pojo.vo.ChatVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface ChatsMapper {

    /**
     * 查找用户的所有会话信息
     * spring boot - mybatis-plus - spring security - aj-capte - java
     * hadoop 14
     * @param id 用户账户 id
     * @return 会话信息列表
     */
    List<Map<String, Object>> findByAccountId(String id);

    RecentChat findById(String id);

    boolean update(RecentChat chat);

    int delete(String id);

    int insert(RecentChat chat);

    int insertByDefault(RecentChat chat);

    RecentChat findOneByIds(String id1, String id2);

    ChatVO findByDoubleId(String id1, String id2);
}
