import React, { useState } from "react";

import url from 'url'

import { Form, Input, Button, Col, Row, message } from "antd";
import { postAccountLogin } from "@/services/user";
import { CheckOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { isEmail, isPassword } from "@/utils/validate";
import { setUserInfo } from "@/store/userInfoSlice";

import styles from "./Login.module.css";
import { useHistory, Redirect, withRouter } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { hp, hpre } from "@/utils/wrapper";

const loginBG = "http://localhost:3001/login-bg-hnpoppcv.jpeg";

export function RedirectTo(props: { url: string }) {

  const history = useHistory();
  /**
   * 此方法会跳转到 redirect 参数所在的位置
   */
  const replaceGoto = () => {
    setTimeout(() => {
      // const { search } = history.location;
      // history.location.search
      // const { redirect } = search as { redirect: string };
      // if (!redirect) {
      //   history.replace("/");
      //   return;
      // }
      // (history as History).replace(redirect);
      history.replace("/app");
    }, 10);
  };
  return <Redirect to={props.url} />
}

export default withRouter(function Login(props) {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  console.log(props);

  // 处理提交
  // @param event 提交登录请求
  const onSubmit = async () => {
    // TODO 检查验证码的合理性
    if (!isEmail(email) || !isPassword(password)) {
      message.error("账号或密码格式不符合规则", 0.5);
      return;
    }

    setSubmitting(true);

    try {
      // const [err, res] = await hpre(postAccountLogin({
      //   email: email,
      //   password,
      //   captcha,
      // }));

      const res = await postAccountLogin({
        email: email,
        password,
        captcha,
      });

      // TODO 验证登录结果，需要重新实现验证效果
      // if (res.code !== 10001 || res.status !== "success") {
      //   message.error("登录失败，请重试");
      //   setSubmitting(false);
      //   return;
      // }

      message.info("登录成功", 0.5);
      // TODO 获取用户信息，并初始化 redux 中的 userInfo
      // 更新用户的登录状态
      dispatch(setUserInfo({ ...res.userInfo, hasLogin: true }));

      localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
      // dispatch(setUserInfo({ ...res.data.userInfo, hasLogin: true }));

      // localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));

      // TODO 跳转页面
      setSubmitting(false);
      // replaceGoto();
      props.history.push('/app')
      const data = url.parse(props.location.search, true).query

      // props.history.push('/test')
    } catch (err) {
      console.log(err?.message);
      console.log(err?.data);
      message.error("发送登录请求失败，请重试");
      setSubmitting(false);
    }

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
})
