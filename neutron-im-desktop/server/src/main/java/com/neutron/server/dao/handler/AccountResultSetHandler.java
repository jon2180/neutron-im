package com.neutron.server.dao.handler;

import com.neutron.server.entity.Account;
import org.apache.commons.dbutils.ResultSetHandler;

import java.sql.ResultSet;
import java.sql.SQLException;

public class AccountResultSetHandler implements ResultSetHandler<Account> {

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
    public Account handle(ResultSet rs) throws SQLException {
        if (!rs.next())
            return null;

        return new Account()
            .setId(rs.getInt("id"))
            .setUid(rs.getInt("uid"))
            .setEmail(rs.getString("email"))
            .setNickname(rs.getString("nickname"))
            .setSignature(rs.getString("signature"))
            .setTel(rs.getString("tel"))
            .setAvatar(rs.getString("avatar"))
            .setPassword(rs.getString("password"))
            .setSalt(rs.getString("salt"))
            .setBirthday(rs.getTimestamp("birthday"))
            .setRegisterTime(rs.getTimestamp("reg_time"))
            .setStatus(rs.getInt("status"));
    }
}
