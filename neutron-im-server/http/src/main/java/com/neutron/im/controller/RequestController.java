package com.neutron.im.controller;

import com.neutron.im.pojo.dto.RequestDTO;
import com.neutron.im.pojo.entity.Friend;
import com.neutron.im.pojo.entity.Request;
import com.neutron.im.pojo.code.StatusCode;
import com.neutron.im.pojo.vo.RequestVO;
import com.neutron.im.pojo.vo.ResultVO;
import com.neutron.im.service.FriendService;
import com.neutron.im.service.GroupService;
import com.neutron.im.service.RequestService;
import com.neutron.im.util.StringUtil;
import com.neutron.im.util.TokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/requests")
public class RequestController {

    private final RequestService requestService;
    private final FriendService friendService;
    private final GroupService groupService;

    @Autowired
    public RequestController(RequestService requestService,
                             FriendService friendService,
                             GroupService groupService) {
        this.requestService = requestService;
        this.friendService = friendService;
        this.groupService = groupService;
    }

    /**
     * 获取好友请求列表
     *
     * @param claims 从 tokan 中取值
     * @return result
     */
    @GetMapping("/friends/")
    public ResultVO getFriendRequests(@RequestAttribute TokenUtil.JwtClaimsData claims) {
        List<RequestVO> requests = requestService.findByTargetId(claims.getId());
        log.info("{} [Get /#/friends]: {}", claims.getId(), requests);
        return ResultVO.success(requests);
    }

    @GetMapping("/friends/$")
    public ResultVO getMyRequests(@RequestAttribute TokenUtil.JwtClaimsData claims) {
        List<RequestVO> requests = requestService.findByOriginatorId(claims.getId());
        log.info("{} [Get /#/friends]: {}", claims.getId(), requests);
        return ResultVO.success(requests);
    }

    @GetMapping("/groups/")
    public ResultVO getGroupRequests(@RequestAttribute TokenUtil.JwtClaimsData claims) {
        List<RequestVO> requests = requestService.findByTargetId(claims.getId());
        return ResultVO.success(requests);
    }

    /**
     * add friend request
     *
     * @param claims
     * @param requestForm
     * @return
     */
    @Transactional
    @PostMapping("/friends")
    public ResultVO postAddFriendRequest(
        @RequestAttribute TokenUtil.JwtClaimsData claims,
        @RequestBody RequestDTO.AddFriendRequest requestForm
    ) {
        final String oppositeId = requestForm.getOppositeId().trim();
        final String reason = requestForm.getReason().trim();

        if (StringUtil.isEmpty(oppositeId)) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "Empty OppositeId");
        }

        Friend friend = friendService.findOne(claims.getId(), oppositeId);
        if (friend != null) {
            return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "Already be friend");
        }

        Request request = requestService.findOne(claims.getId(), oppositeId);
        if (request != null) {
            return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "Already Sent Request", request);
        }

        int val = requestService.insertRequest(claims.getId(), oppositeId, false, reason);
        if (val <= 0) {
            return ResultVO.failed(StatusCode.S403_FORBIDDEN, "发送请求失败", null);
        }
        return ResultVO.success("Sent Request Successful");
    }

    @Transactional
    @PutMapping("/friends/{requestId}")
    public ResultVO postConfirmFriend(
        @PathVariable String requestId,
        @RequestAttribute TokenUtil.JwtClaimsData claims,
        @RequestBody RequestDTO.ConfirmFriendRequest body
    ) {
        final String type = body.getType().trim();
        final String reason = body.getReason().trim();

        if (StringUtil.isEmpty(type) ||
            (!"accept".equalsIgnoreCase(type) && !"reject".equalsIgnoreCase(type))
        ) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "Empty Type");
        }

        // update request status
        Request request = requestService.findOneById(requestId);
        if (request == null) {
            return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "No Specific Request");
        }
        if (!claims.getId().equals(request.getTarget_id())) {
            return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "Not Your Request");
        }
        if (request.getSolved_time() != null) {
            return ResultVO.failed(StatusCode.S400_BAD_REQUEST, "Had Been Solved");
        }
        final boolean isAccept = "accept".equals(type);
        request.setSolved_reason(reason);
        request.setSolved_time(new Timestamp(System.currentTimeMillis()));
        request.setSolved_result(isAccept ? 1 : 0);
        requestService.updateRequest(request);

        // update friend list
        if (isAccept) {
            friendService.insertOneByDefault(request.getInitiator_id(), request.getTarget_id());
        }
        return ResultVO.success(request);
    }

    @PostMapping("/groups/{gid}/req")
    public String postEnterGroupRequest(@PathVariable String gid) {
        return gid;
    }

    @PostMapping("/groups/{gid}/confirm")
    public String putEnterGroupConfirm(@PathVariable String gid) {
        return gid;
    }
}
