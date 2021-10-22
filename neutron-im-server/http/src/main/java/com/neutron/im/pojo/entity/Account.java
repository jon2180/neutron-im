package com.neutron.im.pojo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collection;

/**
 * 账号表的字段映射
 * 类名与数据库字段名一致。类中每一个属性都对应一个数据表的字段。实现 Serializable 是为了可以在网络流中传输对象。
 *
 * @version v191208
 */
@Data
@ToString
@JsonIgnoreProperties({
    "accountNonLocked", "accountNonExpired", "credentialsNonExpired", "enabled", "authorities", "username"
})
public class Account implements UserDetails {
    /**
     * id号 也是 QQ号
     */
    private String id;

    /**
     * 昵称
     */
    private String email;
    /**
     * 邮箱
     */
    private String nickname;

    /**
     * 签名
     */
    private String signature;

    /**
     * 电话号码
     */
    private String tel;

    /**
     * 头像
     */
    private String avatar;

    /**
     * 密码
     */
    @JsonIgnore
    private String password;

    /**
     * 生日
     */
    private Timestamp birthday;

    private int gender;
    /**
     * 注册时间
     */
    private Timestamp reg_time;

    /**
     * 状态：即是否被禁用
     */
    private int status;
    private String extra;

    /**
     * Returns the authorities granted to the user. Cannot return <code>null</code>.
     *
     * @return the authorities, sorted by natural key (never <code>null</code>)
     */
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private Collection<GrantedAuthority> authorities = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void addAuthority(GrantedAuthority authority) {
        assert authority != null;
        authorities.add(authority);
    }

    /**
     * Returns the username used to authenticate the user. Cannot return
     * <code>null</code>.
     *
     * @return the username (never <code>null</code>)
     */
    @Override
    public String getUsername() {
        return email;
    }

    /**
     * Indicates whether the user's account has expired. An expired account cannot be
     * authenticated.
     *
     * @return <code>true</code> if the user's account is valid (ie non-expired),
     * <code>false</code> if no longer valid (ie expired)
     */
    @Override
    public boolean isAccountNonExpired() {
        return status == 0;
    }

    /**
     * Indicates whether the user is locked or unlocked. A locked user cannot be
     * authenticated.
     *
     * @return <code>true</code> if the user is not locked, <code>false</code> otherwise
     */
    @Override
    public boolean isAccountNonLocked() {
        return status == 0;
    }

    /**
     * Indicates whether the user's credentials (password) has expired. Expired
     * credentials prevent authentication.
     *
     * @return <code>true</code> if the user's credentials are valid (ie non-expired),
     * <code>false</code> if no longer valid (ie expired)
     */
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Indicates whether the user is enabled or disabled. A disabled user cannot be
     * authenticated.
     *
     * @return <code>true</code> if the user is enabled, <code>false</code> otherwise
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
