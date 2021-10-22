//package me.iqq.server;
//
//import cn.itcast.dbutil.JDBCUtils;
//import org.apache.commons.dbutils.QueryRunner;
//import org.apache.commons.dbutils.handlers.BeanHandler;
//import org.apache.commons.dbutils.handlers.BeanListHandler;
//import org.junit.BeforeClass;
//import org.junit.Test;
//
//import javax.sql.rowset.serial.SerialBlob;
//import javax.sql.rowset.serial.SerialClob;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.FileReader;
//import java.util.List;
//
///**
// * 使用dbutils做增删改查 批处理大文本操作
// *
// * @author 吕鹏
// */
//public class DBUtilsTest {
//    /**
//     * 创建demo表
//     * +-------+-------------+------+-----+---------+-------+
//     * | Field | Type | Null | Key | Default | Extra |
//     * +-------+-------------+------+-----+---------+-------+
//     * | id | int(11) | YES | | NULL | |
//     * | name | varchar(10) | YES | | NULL | |
//     * +-------+-------------+------+-----+---------+-------+
//     */
//    static QueryRunner runner;
//
//    @BeforeClass
//    public static void beforeClass() {
////获取一个QueryRunner对象（构造方法带数据源 自动完成连接创建和释放）
//        runner = new QueryRunner(JDBCUtils.getDataSource());
//    }
//
//    /**
//     * 执行插入操作
//     */
//    @Test
//    public void testInsert() throws Exception {
//        String sql = "insert into demo values(?,?)";//声明sql
//        Object[] params = {2, "insert"};//初始化参数
//        runner.update(sql, params);
//    }
//
//    /**
//     * 执行删除操作
//     *
//     * @throws Exception
//     */
//    @Test
//    public void testDelete() throws Exception {
//        String sql = "delete from demo where id = ?";
//        runner.update(sql, 1);
//    }
//
//    /**
//     * 执行更新操作
//     *
//     * @throws Exception
//     */
//    @Test
//    public void testUpdate() throws Exception {
//        String sql = "update demo set name=? where id=?";
//        Object[] params = {"update", 1};
//        runner.update(sql, params);
//    }
//
//    /**
//     * 查询列表操作
//     *
//     * @throws Exception
//     */
//    @Test
//    public void testListQuery() throws Exception {
//        String sql = "select * from demo";
//        List<Demo> list = (List<Demo>) runner.query(sql, new
//            BeanListHandler(Demo.class));
//        for (int i = 0; i < list.size(); i++) {
//            System.out.println("ID:" + list.get(i).getId() + " 姓名是：" + list.get(i).getName());
//        }
//    }
//
//    /**
//     * 查询对象操作
//     *
//     * @throws Exception
//     */
//    @Test
//    public void testObjectQuery() throws Exception {
//        String sql = "select * from demo where id = ?";
//        Demo demo = (Demo) runner.query(sql, 1, new BeanHandler(Demo.class));
//        System.out.println("ID:" + demo.getId() + " Name:" + demo.getName());
//    }
//
//    /**
//     * 批处理操作
//     *
//     * @throws Exception
//     */
//    @Test
//    public void testBatch() throws Exception {
//        String sql = "insert into demo value (?,?)";
//        Object[][] params = new Object[10][];
//        for (int i = 0; i < 10; i++) {
//            params[i] = new Object[]{
//                i, "batch"
//            };
//        }
//        runner.batch(sql, params);
//    }
//
//    /**
//     * 大文本操作
//     *
//     * @throws Exception
//     */
//    @Test
//    public void testClob() throws Exception {
//        String sql = "insert into clob values(?)";
//        File file = new File("c:/a.txt");
//        Long l = file.length();
//        char[] buffer = new char[l.intValue()];
//        FileReader reader = new FileReader(file);
//        reader.read(buffer);
//        SerialClob clob = new SerialClob(buffer);
//        runner.update(sql, clob);
//    }
//
//    /**
//     * 二进制图像操作
//     *
//     * @throws Exception
//     */
//    @Test
//    public void testBlob() throws Exception {
//        String sql = "insert into blob values(?)";
//        File file = new File("c:/a.jpg");
//        Long l = file.length();
//        byte[] buffer = new byte[l.intValue()];
//        FileInputStream input = new FileInputStream(file);
//        input.read(buffer);
//        SerialBlob blob = new SerialBlob(buffer);
//        runner.update(sql, blob);
//    }
//}
