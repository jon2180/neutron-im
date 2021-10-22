package com.neutron.im.controller;

import com.neutron.im.pojo.code.StatusCode;
import com.neutron.im.pojo.vo.ResultVO;
import com.neutron.im.service.MessageCheckService;
import com.neutron.im.util.StringUtil;
import com.neutron.im.util.TokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/mchecks")
public class MessageCheckingController {
    private final MessageCheckService msgCheckingService;

    @Autowired
    public MessageCheckingController(MessageCheckService messageCheckService) {
        this.msgCheckingService = messageCheckService;
    }

    @GetMapping("/")
    public ResultVO getAllCheckingTime(@RequestAttribute TokenUtil.JwtClaimsData claims) {
        final String userId = claims.getId();
        if (StringUtil.isEmpty(userId)) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "Empty Url Parameter");
        }
        Map<Object, Object> map = msgCheckingService.getEntries(userId);
        if (map == null) {
            return ResultVO.failed(StatusCode.S404_NOT_FOUND, "Not Found The Entries");
        }
        return ResultVO.success(map);
    }

    @GetMapping("/{targetId}")
    public ResultVO getCheckingTime(
        @RequestAttribute TokenUtil.JwtClaimsData claims,
        @PathVariable String targetId
    ) {
        final String viewerId = claims.getId();
        if (StringUtil.isEmpty(viewerId) || StringUtil.isEmpty(targetId)) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "Empty Path Paramters");
        }
        Object res = msgCheckingService.getLastCheckTime(viewerId, targetId);
        if (res == null) {
            return ResultVO.failed(StatusCode.S404_NOT_FOUND, "No Record");
        }
        return ResultVO.success(res);
    }

    @PutMapping("/{targetId}")
    public ResultVO updateCheckingTime(
        @RequestAttribute TokenUtil.JwtClaimsData claims,
        @PathVariable String targetId
    ) {
        final String viewerId = claims.getId();
        if (StringUtil.isEmpty(viewerId) || StringUtil.isEmpty(targetId)) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "Empty Path Paramters");
        }
        boolean res = msgCheckingService.setOrUpdate(viewerId, targetId, System.currentTimeMillis());
        if (!res) {
            return ResultVO.failed(StatusCode.S404_NOT_FOUND, "No Record");
        }
        return ResultVO.success("Update Success");
    }
}
