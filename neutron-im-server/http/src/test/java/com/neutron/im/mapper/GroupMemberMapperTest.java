package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.GroupMember;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Date;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith({SpringExtension.class})
class GroupMemberMapperTest {

    @Autowired
    private GroupMemberMapper mapper;

    @Test
    void findByGroupId() {
        mapper.findByGroupId("1");
    }

    @Test
    @Disabled
    void insertGroupMember() {
        GroupMember member = new GroupMember() {{
            setMid("3");
//            setGroup_id(1);
            setEnter_time(new Date());
            setGroup_nickname("mytestgroup");
        }};
        System.out.println(mapper.insertGroupMember(member));
    }

    @Test
    void deleteGroupMemberById() {
        mapper.deleteGroupMemberById("1");
    }

    @Test
    void deleteGroupMemberByMId() {
        mapper.deleteGroupMemberByMId("3", "1");
    }
}
