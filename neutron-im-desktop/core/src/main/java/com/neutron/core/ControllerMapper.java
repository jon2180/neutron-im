package com.neutron.core;

import com.neutron.core.api.MessageHeaderProto.MessageHeader.ContentType;

import java.util.concurrent.ConcurrentHashMap;

public class ControllerMapper<T extends Controller> extends ConcurrentHashMap<ContentType, T> {
}
