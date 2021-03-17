import React, { useState } from "react";

import url from "url";

import { Button, Col, message } from "antd";
import { postAccount, postAccountLogin } from "@/services/user";
import { isEmail, isPassword } from "@/utils/validate";
import { setUserInfo, fetchUserInfo } from "@/store/userInfoSlice";

import styles from "./Login.module.less";
import { withRouter } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { hpre } from "@/utils/wrapper";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { UserInfoSubstate } from "@/types/state";

const loginBG = "http://localhost:3001/login-bg-hnpoppcv.jpeg";

export default withRouter(function Login(props) {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useAppDispatch();

  // 处理提交
  const onSubmit = async (email: string, password: string, captcha: string) => {
    // TODO 检查验证码的合理性
    if (!isEmail(email) || !isPassword(password)) {
      message.error("账号或密码格式不符合规则", 0.5);
      return;
    }

    try {
      const res = await postAccountLogin({
        email,
        password,
        captcha,
      });
      if (res.status === 20000) {
        message.info("登录成功", 0.5);
        // TODO 获取用户信息，并初始化 redux 中的 userInfo
        // 更新用户的登录状态
        console.log(res);
        dispatch(setUserInfo({ ...res.data as UserInfoSubstate, hasLogin: true }));
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        // TODO 跳转页面
        // setSubmitting(false);
        const data = url.parse(props.location.search, true).query;
        if (data.direct2 && typeof data.direct2 === "string")
          props.history.push(data.direct2);
        else
          props.history.push("/app");
      } else {
        message.error(res.message);
      }
    } catch (err) {
      // TODO 验证登录结果，需要重新实现验证效果
      if (err) {
        if (err.response) {
          message.error("登录失败，请重试");
          return;
        } else {
          message.error("网络连接故障");
        }
      }
    }
  };

  const submitReg = async (params: {
    email: string;
    password: string;
    nickname: string;
    captcha: string;
  }) => {
    // TODO 检查验证码的合理性
    if (!isEmail(params.email) || !isPassword(params.password)) {
      message.error("账号或密码格式不符合规则", 0.5);
      return;
    }

    const [err, res] = await hpre(
      postAccount({
        email: params.email,
        password: params.password,
        nickname: params.nickname,
        captcha: params.captcha,
      })
    );

    // TODO 验证登录结果，需要重新实现验证效果
    if (err) {
      if (err.response.status !== 400) {
        message.error(`表单数据不合法 ${err.data.error}`);
        console.error(err.data);
      }
      return;
    }

    if (!res) {
      return;
    }

    message.info("注册成功", 0.5);
    setIsLogin(true);
    // TODO 获取用户信息，并初始化 redux 中的 userInfo
    // 更新用户的登录状态
    // dispatch(setUserInfo({ ...res.data, hasLogin: true }));
    // localStorage.setItem("userInfo", JSON.stringify(res.userInfo));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBG})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
      className={styles.container}
    >
      <div className={styles.rightCol}>
        <div className={styles.formContainer}>
          <div className={styles.title}>Neutron-IM</div>
          {isLogin ? (
            <LoginForm onSubmit={onSubmit} />
          ) : (
            <RegisterForm onSubmit={submitReg} />
          )}
        </div>
        <Col span={6}>
          <Button
            size={"small"}
            onClick={() => {
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "注册" : "登录"}
          </Button>
        </Col>
      </div>
    </div>
  );
});
