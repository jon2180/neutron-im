package com.neutron.im.service;

import com.neutron.im.pojo.entity.GroupMember;
import com.neutron.im.mapper.GroupMemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupMemberService {

    private final GroupMemberMapper mapper;

    @Autowired
    public GroupMemberService(GroupMemberMapper mapper) {
        this.mapper = mapper;
    }

    public List<GroupMember> findByGroupId(String groupId) {
        return mapper.findByGroupId(groupId);
    }

    public int insertGroupMember(GroupMember groupMember) {
        return mapper.insertGroupMember(groupMember);
    }

    public int deleteGroupMemberById(String id) {
        return mapper.deleteGroupMemberById(id);
    }

    public int deleteGroupMemberByMId(String mid, String groupId) {
        return mapper.deleteGroupMemberByMId(mid, groupId);
    }
}
