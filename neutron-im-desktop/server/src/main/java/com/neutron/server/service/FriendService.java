package com.neutron.server.service;


import com.neutron.server.core.DatabaseFactory;
import com.neutron.server.dao.handler.FriendListResultSetHandler;
import com.neutron.server.dao.handler.FriendResultSetHandler;
import com.neutron.server.entity.Friend;
import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FriendService {


    public Map<String, List<String>> getFriendsMapById(String userId) {
        QueryRunner qs = new QueryRunner(DatabaseFactory.getDataSource());
        List<Friend> result = null;
        try {
            result = qs.query(/* sql */"select id, fid_1, cate_name_1, remark_name_1, status_1, fid_2, cate_name_2, remark_name_2, status_2, link_time, type, extra from friends where fid_1=?" +
                    " union " +
                    "select id, fid_1, cate_name_1, remark_name_1, status_1, fid_2, cate_name_2, remark_name_2, status_2, link_time, type, extra from friends where fid_2=?",
                /* friend bean list handler */new FriendListResultSetHandler(),
                /* parameters */userId, userId);

        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        return convertFriendListToMap(result, userId);
    }

    /**
     * @param friendList List 朋友关系列表
     * @param qq         当前账号
     * @return 一个以分组名字为键，以对应键为分组名的好友列表的map
     */
    private Map<String, List<String>> convertFriendListToMap(List<Friend> friendList, String qq) {
        if (friendList == null)
            return null;

        Map<String, List<String>> hashMap = new HashMap<>();
//        for (var f : friendList) {
//            if (f.getFid1()(qq)) {
//                if (hashMap.containsKey(f.getGroupNameForFirst())) {
//                    hashMap.get(f.getGroupNameForFirst()).add(f.getSecondAccount());
//                } else {
//                    List<String> l = new ArrayList<>();
//                    l.add(f.getSecondAccount());
//                    hashMap.put(f.getGroupNameForFirst(), l);
//                }
//            } else {
//                if (hashMap.containsKey(f.getGroupNameForFirst())) {
//                    hashMap.get(f.getGroupNameForFirst()).add(f.getFirstAccount());
//                } else {
//                    List<String> l = new ArrayList<>();
//                    l.add(f.getFirstAccount());
//                    hashMap.put(f.getGroupNameForFirst(), l);
//                }
//            }
//        }
        return hashMap;
    }


    public int linkFriend(String id1, String id2) {
        QueryRunner qs = new QueryRunner(DatabaseFactory.getDataSource());
        Connection connection = null;
        // TODO: 确定类型
        Long rs = -1L;
        try {
            connection = DatabaseFactory.getDataSource().getConnection();
            connection.setAutoCommit(false);

            Friend friend = qs.query(connection, "select id, fid_1, fid_2, cate_name_1, cate_name_2, link_time, status_1, type, extra " +
                    "from friends " +
                    "where fid_1=? and fid_2=? " +
                    "union " +
                    "select id, fid_1, fid_2, cate_name_1, cate_name_2, link_time, status_1, type, extra " +
                    "from friends " +
                    "where fid_1=? and fid_2=?",
                new FriendResultSetHandler(),
                id1, id2, id2, id1);

            if (friend == null) {
                rs = qs.insert(connection, "insert into friends(neutron_im.friends.fid_1, neutron_im.friends.fid_2) values(?,?)", new ScalarHandler<>(), id1, id2);
            }

            DbUtils.commitAndCloseQuietly(connection);
        } catch (SQLException sqlException) {
            DbUtils.rollbackAndCloseQuietly(connection);
            sqlException.printStackTrace();
        }
        return rs.intValue();
    }

    public int unlinkFriend(String id1, String id2) {
        return 0;
    }
}
