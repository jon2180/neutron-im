package com.neutron.server.dao;

import com.neutron.server.core.DatabaseFactory;
import com.neutron.server.dao.handler.FriendListResultSetHandler;
import com.neutron.server.entity.Friend;
import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

public class FriendDAO {
    public int create(int id1, int id2, String cateName1, String cateName2) {
        QueryRunner qs = new QueryRunner(DatabaseFactory.getDataSource());
        Connection connection = null;
        // TODO: 确定类型
        Long rs = -1L;
        try {
            connection = DatabaseFactory.getDataSource().getConnection();
            connection.setAutoCommit(false);

            rs = qs.insert(
                connection,
                "insert into friends(fid_1, fid_2, cate_name_1, cate_name_2) values(?,?,?,?)",
                new ScalarHandler<>(),
                id1, id2, cateName1, cateName2
            );
            DbUtils.commitAndCloseQuietly(connection);
        } catch (SQLException sqlException) {
            DbUtils.rollbackAndCloseQuietly(connection);
            sqlException.printStackTrace();
        }
        return rs.intValue();
    }

    public int remove(int id1, int id2) {
        return 0;
//        try {
//            int accounts = new QueryRunner(DatabaseFactory.getDataSource());
//                .query(/* sql */"delete from friends where fid_1=? and fid_2=?",
////                    /* result set handle */new,
//                    /* params */id1, id2
//                );
//            return
//        } catch (SQLException sqlException) {
//            sqlException.printStackTrace();
//        }
//        return accounts;
    }

    public int update(Friend friend) {
        return 0;
    }

    /**
     * 通过 唯一自增 id 查找具体的某一个朋友关系
     *
     * @param id id
     * @return 朋友实体
     */
    public Friend findById(int id) {
        return null;
    }

    /**
     * 通过两个用户的id来查找具体的朋友实体
     *
     * @param fid1 第一个用户 id
     * @param fid2 第二个用户 id
     * @return 朋友关系实体
     */
    public Friend findByIds(int fid1, int fid2) {
        return null;
    }

    /**
     * 获取好友列表
     * 通过 用户id 查找朋友列表
     *
     * @return the friends
     */
    public List<Friend> findByFId(int fid) {
        QueryRunner qs = new QueryRunner(DatabaseFactory.getDataSource());
        List<Friend> result = null;
        try {
            result = qs.query(
                "select id, fid_1, fid_2, cate_name_1, cate_name_2, link_time, status_1, type from friends where fid_1=? or fid_2=?",
                new FriendListResultSetHandler(),
                fid, fid);
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        return result;
    }
}
