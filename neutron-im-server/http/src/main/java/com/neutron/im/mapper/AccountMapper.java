package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.Account;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AccountMapper {

    @Insert("insert into accounts(id,email,nickname,password) values (replace(uuid(), '-', ''),#{email},#{nickname},#{password})")
    int insert(String email, String nickname, String password);

    int insertAccount(Account account);

    @Delete("delete from accounts where id = #{id}")
    boolean deleteById(String id);

    int update(Account account);

    @Select("select * from accounts limit 50")
    List<Account> findAll();

    @Select("select * from accounts where id=#{id} limit 1")
    Account findOneById(String id);

    @Select("select * from accounts where email=#{email} limit 1")
    Account findOneByEmail(String email);

    List<Account> searchFuzzily(String keyword);
}
