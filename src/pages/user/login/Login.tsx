import React, { useState } from "react";

import { Form, Input, Button, Col, Row, message } from "antd";
import { postAccountLogin } from "@/services/user";
import { CheckOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { isEmail, isPassword } from "@/utils/validate";

import { setUserInfo } from "@/store/userInfoSlice";

import styles from "./Login.module.css";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { hp } from "@/utils/wrapper";

// import {  useHistory } from "react-router";
const loginBG = "http://localhost:3001/login-bg-hnpoppcv.jpeg";

export default function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  // const [autoLogin, setAutoLogin] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const history = useHistory();
  /**
   * 此方法会跳转到 redirect 参数所在的位置
   */
  const replaceGoto = () => {
    setTimeout(() => {
      // const { search } = history.location;
      // const { redirect } = search as { redirect: string };
      // if (!redirect) {
      //   history.replace("/");
      //   return;
      // }
      // (history as History).replace(redirect);
      history.replace("/app");
    }, 10);
  };

  const dispatch = useAppDispatch();

  // 处理提交
  // @param event 提交登录请求
  // event: React.MouseEvent<HTMLElement, MouseEvent>
  const onSubmit = async () => {
    // TODO 检查验证码的合理性
    if (!isEmail(email) || !isPassword(password)) {
      message.error("账号或密码格式不符合规则", 0.5);
      return;
    }
    setSubmitting(true);
    const [err, res] = await hp(postAccountLogin({
      email: email,
      password,
      captcha,
    }));

    if (err || res === null) {
      console.log(err);
      message.error("发送登录请求失败，请重试");
      return;
    }

    // TODO 验证登录结果，需要重新实现验证效果
    if (res.code !== 10001 || res.status !== "success") {
      message.error("登录失败，请重试");
      setSubmitting(false);
      return;
    }

    message.info("登录成功", 0.5);
    // TODO 获取用户信息，并初始化 redux 中的 userInfo
    // 更新用户的登录状态
    dispatch(setUserInfo({ ...res.data.userInfo, hasLogin: true }));

    localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));

    // TODO 跳转页面
    setSubmitting(false);
    replaceGoto();
  };

  return (
    <Row className={styles.container}>
      <Col
        span={15}
        style={{
          backgroundImage: `url(${loginBG})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      ></Col>
      <Col span={9}>
        <div className={styles.rightCol}>
          <div className={styles.formContainer}>
            <div className={styles.title}>Neutron-IM</div>
            <Form name="login" initialValues={{ remember: true }}>
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  value={email}
                  placeholder="E-Mail"
                  name="email"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  value={password}
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item name="captcha" valuePropName="captcha">
                <Row gutter={4}>
                  <Col span={12}>
                    <Input
                      prefix={<CheckOutlined />}
                      value={captcha}
                      name="captcha"
                      placeholder="Captcha"
                      onChange={(e) => {
                        setCaptcha(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={11}>
                    <img src="" alt="captcha" />
                  </Col>
                </Row>
              </Form.Item>

              {/* <Form.Item valuePropName="checked">
                <Checkbox
                  checked={autoLogin}
                  onChange={(e) => setAutoLogin(e.target.checked)}
                >
                  Remember me
                </Checkbox>
              </Form.Item> */}

              <Form.Item>
                <Button
                  // icon={<LoginOutlined />}
                  type="primary"
                  htmlType="submit"
                  onClick={onSubmit}
                  loading={submitting}
                  className={styles.loginFormButton}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
    // </div>
  );
}
