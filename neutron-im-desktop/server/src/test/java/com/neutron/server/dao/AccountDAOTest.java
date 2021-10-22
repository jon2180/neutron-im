package com.neutron.server.dao;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

@Slf4j
class AccountDAOTest {

    AccountDAO accountDAO = new AccountDAO();

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void save() {
    }

    @Test
    void remove() {
    }

    @Test
    void update() {
    }

    @Test
    void find() {
        var account = accountDAO.findByUID("1234567");
        Assertions.assertNotNull(account);
        log.info("Account: {}", account);
    }

    @Test
    void findUserByIds() {
        var list = accountDAO.findByUIds("1234567", "2345678", "3456789");
        log.info("List size: {}", list.size());
        for (var u : list) {
            log.info("Item(Account): {}", u);
            Assertions.assertNotNull(u);
        }
    }
}
