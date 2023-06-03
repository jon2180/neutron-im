create database neutron_im;
use neutron_im;

create table accounts
(
    id        int unsigned auto_increment comment '自增长主键'
        primary key,
    uid       varchar(16)                         not null comment '用户唯一id，自由设置，只能字母',
    email     varchar(128)                        null comment '用户的邮箱',
    nickname  varchar(64)                         not null comment '用户昵称',
    signature varchar(140)                        null comment '签名',
    tel       varchar(16)                         null comment '电话号码',
    avatar    varchar(256)                        null comment '用户头像的Url',
    password  varchar(128)                        null comment '用户密码,计算方式  hash(明文password + salt) ',
    salt      varchar(64)                         null comment '密码盐,通过盐与用户输入密码组合然后 hash 加密形成密码',
    birthday  timestamp                           null comment '生日',
    reg_time  timestamp default CURRENT_TIMESTAMP null comment '注册时间',
    status    tinyint   default 0                 null comment '用户账号状态，正常0，封禁1，注销2',
    extra     varchar(256)                        null comment '预留字段',
    constraint account_id
        unique (uid)
)
    comment '用户账户表';

create table friends
(
    id          int unsigned auto_increment comment '自增长主键'
        primary key,
    fid_1       int                                        not null comment '账号1',
    fid_2       int                                        not null comment '账号2',
    cate_name_1 varchar(32)      default '我的好友'            null comment '账号2在账号1列表中的组名',
    cate_name_2 varchar(32)      default '我的好友'            null comment '账号1在账号2列表中的组名',
    link_time   timestamp        default CURRENT_TIMESTAMP null comment '添加好友时间',
    status      tinyint unsigned default '0'               null comment '好友状态，正常为0，1拉黑2 -> 1，2拉黑->2,互相拉黑3，已经删除->4',
    type        tinyint unsigned default '0'               null comment '类型',
    extra       text                                       null comment '预留字段'
)
    comment '朋友关系表';

create table `groups`
(
    id            int unsigned auto_increment comment '自增长主键,便于检索'
        primary key,
    gid           varchar(16)                         not null comment '群组唯一id',
    name          varchar(64)                         null comment '群名',
    `desc`        varchar(256)                        not null comment '群描述',
    tags          varchar(256)                        not null comment '群标签',
    avatar        varchar(256)                        null comment '头像',
    numbers       int                                 null comment '群成员数量',
    owner_id      int unsigned                        not null comment '群主账号的自增长id',
    managers_json text                                null comment '管理员和主要成员的json数据',
    create_time   timestamp default CURRENT_TIMESTAMP null comment '创建时间',
    type          tinyint unsigned                    null comment '群组类型，例如师生群，社区群等',
    status        tinyint unsigned                    not null comment '类型',
    extra         text                                null comment '预留字段'
)
    comment '群组列表';

create table groups_members
(
    id             int auto_increment comment '自增长主键'
        primary key,
    mid            varchar(16)                         not null comment '用户id',
    group_id       int                                 not null comment '所属群的id',
    avatar         varchar(256)                        null comment '成员头像',
    group_nickname varchar(64)                         null comment '成员在群内的名片',
    group_role     tinyint   default 2                 null comment '成员角色，群主0，管理员1，普通成员2，访客3，特殊身份',
    group_status   tinyint   default 0                 null comment '发言状态：正常，禁言',
    muted_time     timestamp                           null comment '被禁言的时间',
    muted_during   int                                 null comment '被禁言的持续时长',
    enter_time     timestamp default CURRENT_TIMESTAMP null comment '进群时间',
    extra          text                                null comment '预留字段'
)
    comment '群组成员';

create table messages
(
    id              int unsigned auto_increment comment '自增长id'
        primary key,
    chat_type       tinyint unsigned default '0' null comment '会话类型，好友私聊，群聊，临时会话',
    sender_id       int                          not null comment '源账号',
    sender_name     varchar(64)                  not null comment '消息发送者昵称',
    sender_avatar   varchar(256)                 not null comment '消息发送者头像',
    receiver_id     int                          not null comment '目标账号，可能是群',
    receiver_name   varchar(64)                  not null comment '目标账号昵称，可能是群',
    receiver_avatar varchar(256)                 not null comment '消息接收者头像，可能是群',
    type            int unsigned                 not null comment '消息类型',
    content         text                         null comment '消息内容',
    file_info       text                         null comment '仅当消息类型是文件的情况下才存在，如果是文件，存储文件信息的json数据',
    time            timestamp                    null comment '消息发送时间',
    status          tinyint unsigned default '0' null comment '消息发送状态，发送中，发送完成，发送失败',
    extra           text                         null comment '预留字段'
)
    comment '消息内容表';

create table recent_chats
(
    id               int auto_increment comment '自增主键'
        primary key,
    cid              varchar(32)       not null comment '会话id,当前的回话id，它作用是标识一个回话，比如我跟你聊天or 你跟我聊天，我们的回话id应该是一致的，对于群聊也是，在群中发送消息，每个人的回话id是一致的。',
    account_id       int               not null comment '消息所属用户的id',
    type             tinyint default 0 null comment '会话类型，私聊，群聊，系统消息',
    opposite_name    int               null comment '聊天对象名字',
    sender_id        int               null comment '最后一条消息的发送者id，用来判别消息是谁发的',
    receiver_id      int               null comment '最后一条消息的接收者id',
    last_msg_time    timestamp         null comment '最后消息时间',
    last_msg_id      int               null comment '最后一条消息的id,主要用来比较，展示会话中的一些信息，比如xx撤回了一条信息',
    last_msg_content text              null,
    unread_count     int               null comment '维度消息数目',
    constraint chat_id
        unique (cid)
);


