package com.neutron.server.dao.handler;

import com.neutron.server.entity.Friend;
import org.apache.commons.dbutils.ResultSetHandler;

import java.sql.ResultSet;
import java.sql.SQLException;

public class FriendResultSetHandler implements ResultSetHandler<Friend> {
    /**
     * Turn the <code>ResultSet</code> into an Object.
     *
     * @param rs The <code>ResultSet</code> to handle.  It has not been touched
     *           before being passed to this method.
     * @return An Object initialized with <code>ResultSet</code> data. It is
     * legal for implementations to return <code>null</code> if the
     * <code>ResultSet</code> contained 0 rows.
     * @throws SQLException if a database access error occurs
     */
    @Override
    public Friend handle(ResultSet rs) throws SQLException {
        if (!rs.next())
            return null;

        return new Friend()
            .setId(rs.getInt("id"))
            .setFid1(rs.getInt("fid_1"))
            .setFid2(rs.getInt("fid_2"))
            .setCateName1(rs.getString("cate_name_1"))
            .setCateName2(rs.getString("cate_name_2"))
            .setLinkTime(rs.getTimestamp("link_time"))
            .setStatus(rs.getInt("status"))
            .setType(rs.getInt("type"));
    }
}
