package com.neutron.im.service;

import com.neutron.im.pojo.entity.Request;
import com.neutron.im.mapper.RequestMapper;
import com.neutron.im.pojo.vo.RequestVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestService {

    private final RequestMapper requestMapper;

    @Autowired
    public RequestService(RequestMapper requestMapper) {
        this.requestMapper = requestMapper;
    }

    public Request findOneById(String id) {
        return requestMapper.findOneById(id);
    }

    public List<RequestVO> findByOriginatorId(String id) {
        return requestMapper.findByOriginatorId(id);
    }

    public List<RequestVO> findByTargetId(String id) {
        return requestMapper.findByTargetId(id);
    }

    public int insertRequest(@NonNull String initiatorId, @NonNull String targetId, @NonNull boolean isGroupRequest, String submitReason) {
//        if (initiatorId == 0 || targetId == 0) {
//            return 0;
//        }

        Request request = new Request() {{
            setInitiator_id(initiatorId);
            setTarget_id(targetId);
            setType(isGroupRequest ? 1 : 0);
            setSubmit_reason(submitReason);
        }};

        return requestMapper.insertRequest(request);
    }

    public boolean updateRequest(Request request) {
        return requestMapper.updateRequest(request);
    }

    public int deleteRequest(String id) {
        return requestMapper.deleteRequest(id);
    }

    public Request findOne(String firstId, String secondId) {
        return requestMapper.findOne(firstId, secondId);
    }
}
