package com.neutron.im.service;

import com.neutron.im.pojo.entity.Group;
import com.neutron.im.mapper.GroupMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GroupService {

    private final GroupMapper mapper;

    @Autowired
    GroupService(GroupMapper mapper) {
        this.mapper = mapper;
    }

    public int insert(Group group) {
        return mapper.insert(group);
    }

    public int deleteById(String id) {
        return mapper.deleteById(id);
    }

    int deleteByGId(String gid) {
        return mapper.deleteByGId(gid);
    }

    int updateGroup(Group group) {
        return mapper.updateGroup(group);
    }

    Group findOneById(String id) {
        return mapper.findOneById(id);
    }

    Group findOneByGId(String gid) {
        return mapper.findOneByGId(gid);
    }
}
