package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.GroupMember;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface GroupMemberMapper {

    List<GroupMember> findByGroupId(String groupId);

    int insertGroupMember(GroupMember groupMember);

    int deleteGroupMemberById(String id);

    int deleteGroupMemberByMId(String mid, String groupId);
}
