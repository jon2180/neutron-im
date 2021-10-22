package com.neutron.im.mapper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith({SpringExtension.class})
@Transactional
class FriendMapperTest {

    @Resource
    private FriendMapper friendMapper;

    @Test
    void testFindByAccountId() {
//        List<FriendWithInfo> friendWithInfos = friendMapper.findDetailByAccountId(3);
//        assertNotNull(friendWithInfos);
//        for (FriendWithInfo f : friendWithInfos) {
//            System.out.println(f.toString());
//            assertNotNull(f);
//        }
    }

    @Test
    void testUpdateFriend() {
//        2, 3, "自定义分组名", 1
//        Friend f = friendService.updateOne();
//        assertNotNull(f);
//        System.out.println(f.toString());
    }

}
