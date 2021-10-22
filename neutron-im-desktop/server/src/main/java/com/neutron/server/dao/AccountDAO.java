package com.neutron.server.dao;

import com.neutron.server.core.DatabaseFactory;
import com.neutron.server.dao.handler.AccountResultSetHandler;
import com.neutron.server.entity.Account;
import org.apache.commons.dbutils.DbUtils;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AccountDAO {

    public int create(Account accounts) {
        Long result = -1L;
        try {
            result = new QueryRunner(DatabaseFactory.getDataSource())
                .insert("insert into accounts (id, nickname, email, password) values(?,?,?,?)",
                    new ScalarHandler<>(),
                    accounts.getUid(), accounts.getNickname(), accounts.getEmail(), accounts.getPassword());
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        return result.intValue();
    }

    public int remove(String qq) throws SQLException {
        return 0;
    }

    public int update(Account accounts) throws SQLException {
        return 0;
    }

    public Account findByID(int id) {
        Account accounts = null;
        try {
            accounts = new QueryRunner(DatabaseFactory.getDataSource())
                .query("SELECT id, id, email, nickname, signature, tel, avatar, password, birthday, reg_time, status, extra FROM accounts where id = ?",
                    new AccountResultSetHandler(),
                    id
                );
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        return accounts;
    }

    public Account findByUID(String uid) {
        Account accounts = null;
        try {
            accounts = new QueryRunner(DatabaseFactory.getDataSource())
                .query("SELECT id, id, email, nickname, signature, tel, avatar, password, birthday, reg_time, status, extra FROM accounts where id = ?",
                    new AccountResultSetHandler(),
                    uid
                );
        } catch (SQLException sqlException) {
            sqlException.printStackTrace();
        }
        return accounts;
    }

    /**
     * 通过用户 id 数组来查找 user
     *
     * @param uniqueIds id 数组
     * @return 用户数组
     */
    public List<Account> findByUIds(String... uniqueIds) {

        List<Account> users = new ArrayList<>();

        QueryRunner qs = new QueryRunner();
        Connection connection = null;
        try {
            connection = DatabaseFactory.getDataSource().getConnection();
            connection.setAutoCommit(false);
            for (String s : uniqueIds) {
                Account user = qs.query(connection,
                    "SELECT id, email, nickname, signature, tel, avatar, password, birthday, reg_time, status, extra from accounts where id=?",
                    new AccountResultSetHandler(),
                    s
                );
                if (user != null)
                    users.add(user);
            }
            DbUtils.commitAndCloseQuietly(connection);
        } catch (SQLException sqlException) {
            DbUtils.rollbackAndCloseQuietly(connection);
            sqlException.printStackTrace();
        }

        return users;
    }
}

