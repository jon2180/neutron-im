package com.neutron.im.controller;

import com.neutron.im.config.AppConstants;
import com.neutron.im.pojo.code.StatusCode;
import com.neutron.im.pojo.dto.AccountUpdateDTO;
import com.neutron.im.pojo.entity.Account;
import com.neutron.im.pojo.vo.ResultVO;
import com.neutron.im.service.AccountService;
import com.neutron.im.util.StringUtil;
import com.neutron.im.util.TokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/accounts")
public class AccountController {

    private final AccountService accountService;

    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    /**
     * 获取自己的信息
     *
     * @return 用户列表
     */
    @GetMapping("/")
    public ResultVO getSelfInfo(@RequestAttribute TokenUtil.JwtClaimsData claims) {
        Account account = accountService.findByID(claims.getId());
        return ResultVO.success(account);
    }

    /**
     * 获取指定用户信息
     *
     * @param id   用户id
     * @param data 当前用户的 token 携带数据
     */
    @GetMapping("/{id}")
    public ResultVO getAccountInfo(@PathVariable String id, @RequestAttribute("claims") TokenUtil.JwtClaimsData data) {
        if (StringUtil.isEmpty(id)) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "Empty Parameter: Account Id", null);
        }
        Account account = accountService.findByID(id);
        if (account == null) {
            return ResultVO.failed(StatusCode.S404_NOT_FOUND, "No Specific Account", null);
        }
        return ResultVO.success(account);
    }

    /**
     * 删除用户
     *
     * @param claims token 携带数据
     */
    @DeleteMapping("/")
    public ResultVO deleteAccount(@RequestAttribute TokenUtil.JwtClaimsData claims) {
        return accountService.deleteAccountById(claims.getId())
            ? ResultVO.success("OK")
            : ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "Delete Failed", null);
    }

    /**
     * 更新账户信息
     */
    @PutMapping("/")
    public ResultVO putAccountInfo(
        @RequestAttribute TokenUtil.JwtClaimsData claims,
        @RequestBody AccountUpdateDTO map
    ) {
        final String nickname = map.getNickname();
        final String signature = map.getSignature();
        final String gender = map.getGender();
        final Long birthday = map.getBirthday();

        final Account account = accountService.findByID(claims.getId());

        if (!StringUtil.isEmpty(nickname))
            account.setNickname(nickname);
        if (!StringUtil.isEmpty(signature))
            account.setSignature(signature);
        if (!StringUtil.isEmpty(gender)) {
            int val = 0;
            switch (gender) {
                case "female":
                    val = 1;
                    break;
                case "male":
                    val = 2;
                    break;
                case "secret":
                default:
            }
            account.setGender(val);
            log.info("gender: {}", gender);
        }
        if (birthday != null) {
            log.info("birthday: {}", birthday);
            try {
                account.setBirthday(new Timestamp(birthday));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        return accountService.updateAccountById(account)
            ? ResultVO.success("OK")
            : ResultVO.failed(StatusCode.S400_BAD_REQUEST, "更新出错", null);
    }

    /**
     * TODO 这里应该有更丰富的授权机制
     */
    @PutMapping("/bindings")
    public ResultVO putBindings() {
        return ResultVO.failed(StatusCode.S400_INVALID_PARAMETERS_FORMAT, "Ok, We received something, but we did nothing.");
    }

    @PostMapping("/avatar")
    public ResultVO updateAvatar(
        MultipartFile file,
        @RequestAttribute TokenUtil.JwtClaimsData claims
    ) {
        if (file == null || file.isEmpty()) {
            return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "No Avatar to Upload", null);
        }
        String filePath = AppConstants.getAvatarPath();
        File tempDir = new File(filePath);
        if (!tempDir.exists() && !tempDir.mkdir()) {
            return ResultVO.failed(StatusCode.S500_FILE_STORAGE_ERROR, "InvalidTempDirectory", null);
        }

        HashMap<String, Object> responseData = new HashMap<>();
        String message = null;
        String fileName = claims.getId() + "-" + StringUtil.generate(8) + Objects.requireNonNull(file.getOriginalFilename()).substring(file.getOriginalFilename().lastIndexOf("."));
        try {
            file.transferTo(new File(filePath + "/" + fileName));
            message = ("文件上传成功");
        } catch (IOException e) {
            log.error(e.toString(), e);
            message = "文件失败，转换失败";
        }

        String avatarUrl = AppConstants.getAvatarUrl(fileName);
        responseData.put("message", message);
        responseData.put("url", avatarUrl);

        Account account = accountService.findByID(claims.getId());
        account.setAvatar(avatarUrl);
        accountService.updateAccountById(account);
        return ResultVO.success(responseData);
    }

    @GetMapping("/search")
    public ResultVO searchFriend(
        @RequestParam("keyword") String keyword,
        @RequestParam("type") String type,
        @RequestAttribute("claims") TokenUtil.JwtClaimsData data
    ) {
        if (keyword != null && !"".equals(keyword)) {
            List<Account> accounts = accountService.searchFuzzily(keyword);
            return ResultVO.success(accounts);
        }
        return ResultVO.failed(StatusCode.S400_EMPTY_PARAMETER, "BadRequest: Empty Parameter", null);
    }
}
