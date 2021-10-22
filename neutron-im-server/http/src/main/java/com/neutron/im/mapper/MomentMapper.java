package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.Moment;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface MomentMapper {
    List<Moment> find(String authorId, int contentType, String keyword);

    Moment findById(String id);

    int insert(Moment moment);

    int update(Moment moment);
//    List<Moment> fuzzySearch(String keyword);
}
