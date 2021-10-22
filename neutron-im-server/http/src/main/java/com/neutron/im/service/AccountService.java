package com.neutron.im.service;

import com.neutron.im.mapper.AccountMapper;
import com.neutron.im.pojo.entity.Account;
import com.neutron.im.pojo.exception.AuthFailedException;
import com.neutron.im.pojo.exception.DisabledAccountException;
import com.neutron.im.pojo.exception.NoSuchAccountException;
import com.neutron.im.util.Validator;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class AccountService implements UserDetailsService {

    private final AccountMapper accountMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountService(AccountMapper accountMapper, PasswordEncoder passwordEncoder) {
        this.accountMapper = accountMapper;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Locates the user based on the username. In the actual implementation, the search
     * may possibly be case sensitive, or case insensitive depending on how the
     * implementation instance is configured. In this case, the <code>UserDetails</code>
     * object that comes back may have a username that is of a different case than what
     * was actually requested..
     *
     * @param username the username identifying the user whose data is required.
     * @return a fully populated user record (never <code>null</code>)
     * @throws UsernameNotFoundException if the user could not be found or the user has no
     *                                   GrantedAuthority
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username == null || "".equals(username)) throw new UsernameNotFoundException("Username must be not empty");
        Account user = accountMapper.findOneByEmail(username);
        if (user == null) throw new UsernameNotFoundException("用户不存在");

        log.info("loadUserByUsername: {}", user);
        // 设置角色集合
        user.addAuthority(new SimpleGrantedAuthority("ROLE_" + "USER"));
        return user;
    }

    /**
     * @param email    邮箱
     * @param password 密码
     * @return 状态 <code>0</code> 成功 <code>1</code> 账户被封禁 <code>2</code> 密码错误 <code>3</code> 无账号
     */
    public Account loginCheck(@NonNull String email, @NonNull String password)
        throws NoSuchAccountException, AuthFailedException, DisabledAccountException, UsernameNotFoundException {
        Account account = (Account) loadUserByUsername(email);
        // Step 1: 验证用户是否存在
        if (account == null) throw new NoSuchAccountException(String.format("无 %s 账号", email));
        // Step 2: 若用户存在，验证密码是否正确
        if (!passwordEncoder.matches(password, account.getPassword())) throw new AuthFailedException("密码错误");
        // Step 3: 若用户存在，且密码正确，验证用户状态
        if (!account.isEnabled() || !account.isAccountNonExpired()
            || !account.isAccountNonLocked() || !account.isCredentialsNonExpired()) {
            throw new DisabledAccountException(String.format("账号 %s 处于封禁状态", email));
        }
        // Step 4: 若用户存在，密码正确，且用户状态正确，通过登录
        return account;
    }

    @Transactional(rollbackFor = RuntimeException.class)
    public int doRegister(String email, String password, String nickname) throws RuntimeException {
        if (email == null || password == null || nickname == null) throw new NullPointerException();
        if (!Validator.isEmail(email) || !Validator.isPassword(password)) return 3;
        // check if email has been token
        Account account = accountMapper.findOneByEmail(email);
        if (account != null) return 2;
        int insertRes = accountMapper.insert(email, nickname, passwordEncoder.encode(password));
        if (insertRes != 1) return 1;
        return 0;
    }

    public Account findByEmail(String email) {
        return accountMapper.findOneByEmail(email);
    }

//    public Account findByUid(String email) {
//        return accountMapper.findOneByUId(email);
//    }

//    public boolean deleteAccountByUid(String uid) {
//        return accountMapper.deleteByUid(uid);
//    }

    public boolean updateAccountById(Account account) {
        return accountMapper.update(account) == 1;
    }

    public List<Account> searchFuzzily(String keyword) {
        return accountMapper.searchFuzzily(keyword);
    }

    public Account findByID(String id) {
        return accountMapper.findOneById(id);
    }

    public boolean deleteAccountById(String id) {
        return accountMapper.deleteById(id);
    }
}
