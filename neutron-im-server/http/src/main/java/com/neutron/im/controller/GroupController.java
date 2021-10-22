package com.neutron.im.controller;

import com.neutron.im.pojo.vo.ResultVO;
import com.neutron.im.service.GroupService;
import com.neutron.im.util.TokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/groups")
public class GroupController {

    private final GroupService groupService;

    @Autowired
    public GroupController(GroupService groupService) {
        this.groupService = groupService;
    }

    @GetMapping("/")
    public ResultVO getGroups(@RequestParam String filter, @RequestAttribute TokenUtil.JwtClaimsData claims) {
//        groupService.findById claims.getId();

        return ResultVO.success(null);
    }

    @PostMapping("/")
    public ResultVO postCreateGroup(@RequestBody Map<String, Object> body) {
//        groupService.insertGroup();
        log.info("postCreateGroup: {}", body);
        return ResultVO.success(null);
    }

    @PutMapping("/{groupId}")
    public ResultVO putGroup(@PathVariable String groupId, @RequestBody Map<String, Object> body) {
        log.info("putGroup: {}", body);
        return ResultVO.success(null);
    }

    @PostMapping("/{groupId}/req")
    public ResultVO postRequestEnterGroup(@PathVariable String groupId, @RequestBody String body) {
        return ResultVO.success(null);
    }

    @PostMapping("/{groupId}/confirm")
    public ResultVO postConfirmEnterGroup(@PathVariable String groupId, @RequestBody String body) {
        return ResultVO.success(null);
    }

    @GetMapping("/{groupId}/invite")
    public ResultVO inviteFriend(@PathVariable String groupId) {
        return ResultVO.success(groupId);
    }

    @DeleteMapping("/{groupId}")
    public ResultVO deleteFriend(@PathVariable String groupId) {
        return ResultVO.success(groupId);
    }
}
