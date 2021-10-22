package com.neutron.desktop.model;

import com.neutron.desktop.socket.NioClient;
import lombok.Data;
import lombok.experimental.Accessors;

@Data()
@Accessors(chain = true)
public class ApplicationContext {
    /**
     * 窗口标题格式 '<页面主题> - ${appName}'
     */
    private String appName = "Neutron IM";

    private String appVersion;

    private String protocolVersion;

    private FrameFactory frameFactory;

    private User user;

    private FramesManager framesManager;

    private NioClient socket;

    public ApplicationContext(String appName, FrameFactory frameFactory) {
        this.appName = appName;
        this.frameFactory = frameFactory;
    }
}
