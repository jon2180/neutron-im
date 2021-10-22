package com.neutron.server;

import com.google.protobuf.InvalidProtocolBufferException;
import com.neutron.server.service.AccountService;
import com.neutron.server.socket.EventDispatcher;
import com.neutron.server.socket.NioServer;
import lombok.extern.slf4j.Slf4j;
import com.neutron.core.Controller;
import com.neutron.core.ControllerMapper;
import com.neutron.core.api.LoginApiProto;
import com.neutron.core.api.LogonApiProto;
import com.neutron.core.api.MessageHeaderProto;
import com.neutron.core.protocol.DataPacket;
import com.neutron.server.socket.impl.EventDispatcherImpl;

import java.io.IOException;
import java.nio.channels.SocketChannel;
import java.util.ResourceBundle;

/**
 * 用户程序服务端入口
 *
 * @version v200702
 */
@Slf4j
public class Server {

    private static final ResourceBundle serverConf;

    static {
        serverConf = ResourceBundle.getBundle("application");
    }

    public static void main(String[] args) {
        final Server server = new Server();

        NioServer nioServer = null;

        // 事件分发
        EventDispatcher dispatcher = new EventDispatcherImpl<>(server.buildControllerMapper());
        try {
            nioServer = new NioServer(dispatcher, Integer.parseInt(serverConf.getString("port")));
            nioServer.start();
        } catch (IOException ioE) {
            nioServer.stop();
            System.exit(-1);
            ioE.printStackTrace();
        }
    }

    public ControllerMapper<Controller> buildControllerMapper() {
        // 处理对象映射
        ControllerMapper<Controller> mapper = new ControllerMapper<>();

        final AccountService accountService = new AccountService();

        mapper.put(MessageHeaderProto.MessageHeader.ContentType.SIGN_IN, (DataPacket packet, SocketChannel channel) -> {
            LoginApiProto.LoginReq loginReq = null;
            try {
                loginReq = LoginApiProto.LoginReq.parseFrom(packet.getBody());
            } catch (InvalidProtocolBufferException e) {
                e.printStackTrace();
            }

            if (loginReq == null) {
                log.warn("Parse bode failed");
                return;
            }

            // 1. 验证用户是否存在，存在则继续
            // 2. 验证用户密码是否正确，正确则继续
            // 3. 构造返回数据

            int returnVal = accountService.login(loginReq.getUsername(), loginReq.getPassword());
            if (returnVal == 0) {
                log.warn("...");

                LoginApiProto.LoginResp respBody = LoginApiProto.LoginResp.newBuilder()
                    .setId(123456)
                    .setToken("")
                    .build();

//                byte[] messageBytes = MessageProtocol
//                    .pack(
//                        respBody.toByteArray(),
//                        "iqq://127.0.0.1:8080/sign_in_resp",
//                        MessageHeaderProto.MessageHeader.ContentType.SIGN_IN_RESP,
//                        "server",
//                        "client",
//                        TokenUtil.generate());
//
//                ByteBuffer buffer = ByteBuffer.wrap(messageBytes);
//                int len = 0;
//                while (buffer.hasRemaining()) {
//                    try {
//                        len += channel.write(buffer);
//                    } catch (IOException e) {
//                        e.printStackTrace();
//                    }
//                }
//                System.out.println("len" + len);
            } else {
                log.warn("###");
            }

        });

        mapper.put(MessageHeaderProto.MessageHeader.ContentType.SIGN_ON, (DataPacket packet, SocketChannel channel) -> {
            // ResultSet resultSet;
            LogonApiProto.LogonReq req = null;
            try {
                req = LogonApiProto.LogonReq.parseFrom(packet.getBody());
            } catch (InvalidProtocolBufferException e) {
                e.printStackTrace();
            }

            if (req == null)
                return;

            String nickname = req.getUsername();
            String password = req.getPassword();


//        String
//        try {
//
//            // 随机出来一个QQ号
//            String qq;
//
//            boolean isRepeat;
//
//            do {
//                qq = Utils.getRandom();
//
//                sql = "select qnumber, nickname from accounts where qnumber='" + qq + "'";
//
//                // 判断QQ号是否已经被占用
//                isRepeat = dbConnection.query(sql).next();
//            } while (isRepeat);
//
//            account.setQQ(qq);
//            DBUtils.createUser(account);
//
//            // 把账户返回给客户端
//            account.setQQ(qq);
//            DataWrapper data = new DataWrapper(CommandCode.REG, DataType.UserObject, account);
//            data.setStatusCode(200);
//
//            System.out.println("Successful: " + qq + ":" + nickname);
//
//            response.send(data);
//
//        } catch (IOException | SQLException ioE) {
//            ioE.printStackTrace();
//        }
        });

        mapper.put(MessageHeaderProto.MessageHeader.ContentType.MESSAGE, (DataPacket packet, SocketChannel channel) -> System.out.println("message ..."));
        mapper.put(MessageHeaderProto.MessageHeader.ContentType.ADD_FRIEND, (DataPacket packet, SocketChannel channel) -> System.out.println("friend ..."));
        return mapper;
    }
}


