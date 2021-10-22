package com.neutron.im.mapper;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith({SpringExtension.class})
class RequestMapperTest {

    @Autowired
    private RequestMapper requestMapper;

    @Test
    @Disabled
    void findOneById() {
//        requestService.findOneById()
    }

    @Test
    @Disabled
    void findByOriginatorId() {
    }

    @Test
    @Disabled
    void findByTargetId() {
    }

    @Test
    @Transactional
    void insertRequest() {
//        Request request = new Request() {{
//            setInitiator_id(3);
//            setTarget_id(4);
//            setSubmit_reason("因为所以");
////            setSubmit_time()
//        }};
//        int i = requestMapper.insertRequest("3", "4", false, "因为所以");
//        System.out.println(i);
    }

    @Test
    @Transactional
    void updateRequest() {
    }

    @Test
    @Transactional
    void deleteRequest() {
    }
}
