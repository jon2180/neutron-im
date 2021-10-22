package com.neutron.im.service;

import com.neutron.im.pojo.entity.Moment;
import com.neutron.im.mapper.MomentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MomentService {

    private final MomentMapper mapper;

    @Autowired
    public MomentService(MomentMapper mapper) {
        this.mapper = mapper;
    }

    public List<Moment> findByAuthorId(String id) {
        return mapper.find(id, -1, null);
    }

    public List<Moment> findByContentType(int contentType) {
        return mapper.find(null, contentType, null);
    }

    public List<Moment> findByAuthorIdAndContentType(String id, int contentType, String keyword) {
        return mapper.find(id, contentType, null);
    }

    public List<Moment> fuzzySearch(String keyword) {
        return mapper.find(null, -1, keyword);
//        return mapper.fuzzySearch(keyword);
    }

    public Moment findById(String id) {
        return mapper.findById(id);
    }

    public int insertMoment(Moment moment) {
        return mapper.insert(moment);
    }

    public int updateMoment(Moment moment) {
        return mapper.update(moment);
    }
}
