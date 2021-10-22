package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.Friend;
import com.neutron.im.pojo.vo.FriendVO;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FriendMapper {

    List<FriendVO> findByAccountId(String accountId);

    boolean updateOne(Friend friend);

    int insertOne(Friend friend);

    @Insert("insert into friends(id, `fid_1`, `fid_2`) values(replace(uuid(), '-',''), #{fid1},#{fid2})")
    int insertOneByDefault(String fid1, String fid2);

    @Delete("delete from friends where id = #{id}")
    int deleteOneById(String id);

    Friend findOne(String myId, String id);
}
