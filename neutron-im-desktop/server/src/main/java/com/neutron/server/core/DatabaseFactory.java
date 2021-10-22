package com.neutron.server.core;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

public class DatabaseFactory {

    private static DataSource dataSource;

    static {
        Properties properties = new Properties();
        InputStream iStream = Thread.currentThread()
            .getContextClassLoader()
            .getResourceAsStream("application.properties");
        try {
            properties.load(iStream);
            dataSource = DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取 data source
     *
     * @return 返回的 数据库连接池对象
     */
    public static DataSource getDataSource() {
        return dataSource;
    }

    public static Connection getConnection() throws SQLException {
        return dataSource.getConnection();
    }
}
