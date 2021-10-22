create table accounts
(
    id        varchar(32)               not null comment '用户唯一id，自由设置，只能字母',
    email     varchar(128)              null comment '用户的邮箱',
    nickname  varchar(64)               not null comment '用户昵称',
    signature varchar(140)              null comment '签名',
    tel       varchar(16)               null comment '电话号码',
    avatar    varchar(256)              null comment '用户头像的Url',
    password  varchar(128)              null comment '用户密码,计算方式  hash(明文password + salt) ',
    gender    tinyint   default 0       null comment '0 secret
1 female
2 male',
    birthday  timestamp                 null comment '生日',
    reg_time  timestamp default (now()) not null comment '注册时间',
    status    tinyint   default 0       not null comment '用户账号状态，正常0，封禁1，注销2',
    extra     varchar(256)              null comment '预留字段',
    constraint account_id
        unique (id),
    constraint accounts_email_uindex
        unique (email),
    constraint accounts_nickname_uindex
        unique (nickname),
    constraint accounts_tel_uindex
        unique (tel)
)
    comment '用户账户表';

alter table accounts
    add primary key (id);

create table chats
(
    id               varchar(32)       not null comment '会话id,当前的回话id，它作用是标识一个回话，比如我跟你聊天or 你跟我聊天，我们的回话id应该是一致的，对于群聊也是，在群中发送消息，每个人的回话id是一致的。',
    account_id       varchar(32)       not null comment '消息所属用户的id',
    target_id        varchar(32)       null,
    type             tinyint default 0 null comment '会话类型，私聊，群聊，系统消息',
    sender_id        varchar(32)       null comment '最后一条消息的发送者id，用来判别消息是谁发的',
    receiver_id      varchar(32)       null comment '最后一条消息的接收者id',
    last_msg_time    timestamp         null comment '最后消息时间',
    last_msg_id      varchar(32)       null comment '最后一条消息的id,主要用来比较，展示会话中的一些信息，比如xx撤回了一条信息',
    last_msg_content text              null,
    unread_count     int               null comment '维度消息数目',
    status           tinyint default 0 not null,
    constraint chat_id
        unique (id)
);

alter table chats
    add primary key (id);

create table favorites
(
    id              varchar(32)                         not null
        primary key,
    title           varchar(256)                        null comment '相当于备注',
    content_type    tinyint   default 0                 null comment '0 最近动态，1 代码片段，2 最近动态， 3 消息 4 url',
    content         varchar(512)                        not null comment '内容id 或 url',
    collection_name varchar(64)                         null comment '集合名',
    create_time     timestamp default CURRENT_TIMESTAMP not null,
    status          tinyint   default 0                 null comment '0 正常 1 隐藏 2 删除'
)
    comment '收藏表';

create table friends
(
    id            varchar(32)                                not null comment '自增长主键'
        primary key,
    fid_1         varchar(32)                                not null comment '账号1',
    cate_name_1   varchar(32)      default '我的好友'            null comment '账号2在账号1列表中的组名',
    remark_name_1 varchar(128)                               null,
    status_1      tinyint unsigned default '0'               null comment '好友状态，正常为0，1拉黑2 -> 1，2拉黑->2,互相拉黑3，已经删除->4',
    fid_2         varchar(32)                                not null comment '账号2',
    cate_name_2   varchar(32)      default '我的好友'            null comment '账号1在账号2列表中的组名',
    remark_name_2 varchar(128)                               null,
    status_2      tinyint          default 0                 null,
    link_time     timestamp        default CURRENT_TIMESTAMP null comment '添加好友时间',
    type          tinyint unsigned default '0'               null comment '类型',
    extra         text                                       null comment '预留字段'
)
    comment '朋友关系表';

create table `groups`
(
    id            varchar(32)                         not null comment '自增长主键,便于检索'
        primary key,
    gid           varchar(32)                         not null comment '群组唯一id',
    owner_id      varchar(32)                         not null comment '群主账号的自增长id',
    name          varchar(64)                         null comment '群名',
    `desc`        varchar(256)                        not null comment '群描述',
    tags          varchar(256)                        not null comment '群标签',
    avatar        varchar(256)                        null comment '头像',
    numbers       int                                 null comment '群成员数量',
    managers_json text                                null comment '管理员和主要成员的json数据',
    create_time   timestamp default CURRENT_TIMESTAMP null comment '创建时间',
    type          tinyint unsigned                    null comment '群组类型，例如师生群，社区群等',
    status        tinyint unsigned                    not null comment '类型',
    extra         text                                null comment '预留字段'
)
    comment '群组列表';

create table groups_members
(
    id             varchar(32)                         not null comment '自增长主键'
        primary key,
    mid            varchar(32)                         not null comment '用户id',
    group_id       varchar(32)                         not null comment '所属群的id',
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
    id           varchar(32)                  not null comment '自增长id'
        primary key,
    chat_id      varchar(32)                  not null,
    sender_id    varchar(32)                  not null comment '源账号',
    receiver_id  varchar(32)                  not null comment '目标账号，可能是群',
    chat_type    tinyint unsigned default '0' null comment '会话类型，好友私聊，群聊，临时会话',
    content_type int unsigned                 not null comment '消息类型',
    content      text                         null comment '消息内容',
    file_info    text                         null comment '仅当消息类型是文件的情况下才存在，如果是文件，存储文件信息的json数据',
    time         timestamp                    null comment '消息发送时间',
    status       tinyint unsigned default '0' null comment '消息发送状态，发送中，发送完成，发送失败',
    extra        text                         null comment '预留字段'
)
    comment '消息内容表';

create table moments
(
    id           varchar(32)                         not null comment 'uuid'
        primary key,
    title        varchar(256)                        not null comment '标题',
    author_id    varchar(32)                         not null comment '作者id',
    create_time  timestamp default CURRENT_TIMESTAMP not null comment '创建时间',
    update_time  timestamp                           null comment '更新时间',
    content_type tinyint   default 0                 not null comment '内容类型',
    is_original  tinyint   default 1                 null,
    content      text                                not null comment '内容',
    copyright    text                                null,
    version      varchar(32)                         null,
    status       tinyint   default 0                 not null
)
    comment '最近动态表';

create table requests
(
    id            varchar(32)                         not null comment '序列号'
        primary key,
    initiator_id  varchar(32)                         not null comment '发起人id',
    target_id     varchar(32)                         not null comment '接受者id',
    type          tinyint   default 0                 not null comment '加群，或者加好友',
    submit_reason text                                null comment '发起原因',
    submit_time   timestamp default CURRENT_TIMESTAMP not null comment '发起时间',
    solved_result tinyint   default 0                 not null comment '处理结果',
    solved_reason text                                null comment '说明',
    solved_time   timestamp                           null comment '受理时间',
    extra         text                                null
)
    comment '加群请求，加好友请求，等';


