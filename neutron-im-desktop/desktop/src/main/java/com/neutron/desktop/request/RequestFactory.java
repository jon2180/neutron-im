package com.neutron.desktop.request;


import com.neutron.desktop.Application;

/**
 * Request 对象装配中心
 *
 * @date 20200701
 */
public class RequestFactory {
    private static UserRequest userRequest = null;

    public static UserRequest getUserRequest() {
        // lazy init
//        if (userRequest == null)
//            userRequest = new UserRequest(Application.getFramesManager(), Application.getSocketChannel());
        return userRequest;
    }
}
