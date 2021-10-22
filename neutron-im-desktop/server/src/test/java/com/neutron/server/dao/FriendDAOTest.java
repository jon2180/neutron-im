package com.neutron.server.dao;

import com.neutron.server.entity.Friend;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class FriendDAOTest {

    FriendDAO friendDAO = new FriendDAO();

    @BeforeEach
    void setUp() {

    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void linkFriend() {
    }

    @Test
    void unlinkFriend() {
    }

    @Test
    void getFriendById() {
    }

    @Test
    void testFindByFId() {
//        String qq = "2345678";
        List<Friend> list = friendDAO.findByFId(1);

//        assertNotNull(list);

        for (var f : list) {
//            assertNotNull(f.getFid1());
            System.out.println(f);
        }

//        ConcurrentHashMap<String, List<Account>> hashMap = new ConcurrentHashMap<>();
//        for (var f : list) {
//            if (f.getFid1().equals(qq)) {
//                Account user = new Account().setId(f.getFid2());
//                if (hashMap.containsKey(f.getCateName1())) {
//                    hashMap.get(f.getCateName1()).add(user);
//                } else {
//                    List<Account> l = new ArrayList<>();
//                    l.add(user);
//                    hashMap.put(f.getCateName1(), l);
//                }
//            } else {
//                Account user = new Account().setId(f.getFid1());
//                if (hashMap.containsKey(f.getFid1())) {
//                    hashMap.get(f.getFid1()).add(user);
//                } else {
//                    List<Account> l = new ArrayList<>();
//                    l.add(user);
//                    hashMap.put(f.getFid1(), l);
//                }
//            }
//        }
//        Set<Map.Entry<String, List<Account>>> u = hashMap.entrySet();
//        for (var e : u) {
//            System.out.println(e.getKey());
//            for (var v : e.getValue()) {
//                System.out.println(v.getId());
//            }
//        }
    }

    @Test
    public void testGetFriendsMapById() {
//        String id = "123456";
//        Map<String, List<String>> listMap = friendDAO.getFriendsMapById(id);
//
//        var entrySet = listMap.entrySet();
//        for (var e : entrySet) {
//            System.out.println(e.getKey());
//            System.out.println(e.getValue());
//        }
    }
}
