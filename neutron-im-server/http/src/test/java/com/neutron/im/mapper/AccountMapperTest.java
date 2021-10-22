package com.neutron.im.mapper;

import com.neutron.im.pojo.entity.Account;
import com.neutron.im.util.StringUtil;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith({SpringExtension.class})
@Transactional
class AccountMapperTest {

    @Autowired
    private AccountMapper accountMapper;

    @ParameterizedTest
    @ValueSource(strings = {"1", "test", "hello", "763653451@qq.com"})
    void searchFuzzily(String keyword) {
        List<Account> accounts = accountMapper.searchFuzzily(keyword);
        assertNotNull(accounts);
        for (Account account : accounts) {
            assertNotNull(account.getId());
            System.out.println(account);
        }
    }

    @Test
    void testFindAll() {
        List<Account> list = accountMapper.findAll();
        for (Account account : list) {
            System.out.println(account.toString());
        }
        Assertions.assertTrue(true);
    }

    @Test
    void testUpdate() {

    }

    @Test
    void testInsert() {
        Account account = new Account() {{
            setEmail(StringUtil.generate(8) + "@qq.com");
            setPassword("hello");
            setNickname(StringUtil.generateUid());
        }};
        Assertions.assertEquals(accountMapper.insertAccount(account), 1);
    }
}
