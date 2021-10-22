package com.neutron.desktop;

import com.neutron.core.ControllerMapper;
import com.neutron.core.api.MessageHeaderProto;
import com.neutron.core.socket.EventDispatcher;
import com.neutron.core.socket.SelectionKeyHandler;
import com.neutron.core.socket.impl.EventDispatcherImpl;
import com.neutron.core.socket.impl.SelectionKeyHandlerImpl;
import com.neutron.desktop.controller.BaseController;
import com.neutron.desktop.controller.MessageReceiveController;
import com.neutron.desktop.controller.SignInRespController;
import com.neutron.desktop.controller.SignOnRespController;
import com.neutron.desktop.model.ApplicationContext;
import com.neutron.desktop.model.FrameFactory;
import com.neutron.desktop.model.FramesManager;
import com.neutron.desktop.socket.NioClient;
import com.neutron.desktop.util.ConfigurationLoader;
import lombok.extern.slf4j.Slf4j;

import java.net.InetSocketAddress;

/**
 * 应用程序客户端入口
 *
 * @version v191204
 */
@Slf4j
public class Application {

    private final ApplicationContext context;

    public Application() {
        this.context = new ApplicationContext("Neutron IM", new FrameFactory())
            .setAppVersion("0.0.1")
            .setProtocolVersion(ConfigurationLoader.getString("protocol_version"));
        FramesManager framesManager = new FramesManager(context);
        context.setFramesManager(framesManager);


        log.info("Application Version: " + context.getAppVersion());
        log.info("Protocol Version: " + context.getProtocolVersion());
    }

    /**
     * Says hello to the world.
     * 以登录为入口
     *
     * @param args The arguments of the program.
     */
    public static void main(String[] args) {
        new Application().startApplication(args);
    }

    public void start() {
        context.getSocket().getReceiverThread().start();
    }

    public void shutdown() {
        context.getSocket().shutdown();
    }

    public ControllerMapper<BaseController> getControllerMap() {
        return new ControllerMapper<>() {{
            put(
                MessageHeaderProto.MessageHeader.ContentType.SIGN_IN_RESP,
                new SignInRespController(context.getFramesManager(), null)
            );
            put(
                MessageHeaderProto.MessageHeader.ContentType.SIGN_ON_RESP,
                new SignOnRespController(context.getFramesManager(), null)
            );
            put(
                MessageHeaderProto.MessageHeader.ContentType.MESSAGE,
                new MessageReceiveController(context.getFramesManager(), null)
            );
        }};
    }

    public void startApplication(String... args) {
        try {
            ControllerMapper<BaseController> mapper = this.getControllerMap();
            SelectionKeyHandler keyHandler = this.getKeyHandler(mapper);

            NioClient nc = new NioClient(
                new InetSocketAddress(ConfigurationLoader.getString("ip"), ConfigurationLoader.getInt("port")),
                keyHandler
            );

            context.setSocket(nc);
            start();
            context.getFramesManager().switchToLogin();
        } catch (Exception e) {
            e.printStackTrace();
            this.shutdown();
        }
    }

    private SelectionKeyHandler getKeyHandler(ControllerMapper<BaseController> mapper) {
        EventDispatcher dispatcher = new EventDispatcherImpl<>(mapper);
        return new SelectionKeyHandlerImpl(dispatcher);
    }
}

