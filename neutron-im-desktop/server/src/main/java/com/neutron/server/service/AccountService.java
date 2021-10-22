package com.neutron.server.service;

import com.neutron.server.dao.AccountDAO;
import com.neutron.server.dao.FriendDAO;
import com.neutron.server.entity.Account;

public class AccountService {

    FriendDAO friendDAO = new FriendDAO();
    AccountDAO accountDAO = new AccountDAO();

    public int register(String nickname, String password, String email) {

        // 验证参数合法性
        // validate(nickname);
        // validate(password);
        // validate(email);

        // 查询 email 是否重复

        // 随机获取一个 Unique ID 作为账号，并检验唯一性

        // 保存用户信息

        // 返回状态
        return 0;
    }

    /**
     * 登录
     *
     * @param id       用户id
     * @param password 用户密码
     * @return statusCode [0 - okay ；1 - 密码错误； 2 - 没有此用户]
     */
    public int login(String id, String password) {
//        try {
//        Account user = accountDAO.findByID(id);
//
//        if (user == null) {
//            return 2;
//        }
//
//        // TODO 密码加密
//
//        // 验证密码
//        // x 登录账户与密码不匹配
//        if (!user.getPassword().equals(password)) {
//            return 1;
//        }
//
//        // 登录成功
//        // TODO 存放当前用户的 Socket 至在线列表中
//
//        // TODO 通知当前在线好友，“我上线了”
//        List<Friend> friends = friendDAO.findByFId(id);
//        if (friends != null && !friends.isEmpty()) {
////                response.notifyFriends(friends, socketManager);
//            // TODO 广播消息
////                new TextMessageHandler().broadcast();
//        }
//
//        // TODO 返回登录结果
//
////        } catch (SQLException sqlException) {
////            sqlException.printStackTrace();
////        }

        return 0;
    }

    public Account getUserByID(String qq) {
        return null;
    }

    public Account getUserByName(String name) {
        return null;
    }

}
