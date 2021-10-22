package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.Request;
import com.neutron.im.pojo.vo.RequestVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RequestMapper {
    Request findOneById(String id);

    List<RequestVO> findByOriginatorId(String id);

    List<RequestVO> findByTargetId(String id);

    int insertRequest(Request request);

    boolean updateRequest(Request request);

    int deleteRequest(String id);

    Request findOne(String firstId, String secondId);
}
