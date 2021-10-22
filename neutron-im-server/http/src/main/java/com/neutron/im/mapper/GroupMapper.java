package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.Group;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface GroupMapper {

    int insert(Group group);

    int deleteById(String id);

    int deleteByGId(String gid);

    int updateGroup(Group group);

    Group findOneById(String id);

    Group findOneByGId(String gid);
}
