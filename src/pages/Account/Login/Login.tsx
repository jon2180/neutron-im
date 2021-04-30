import React, { useCallback, useState } from "react";

import url from "url";

import { message, Tabs } from "antd";
import { postAccount, postAccountLogin } from "@/services/user";
import { isEmail, isPassword } from "@/utils/validate";
import { setUserInfo, setHasLogin } from "@/store/userInfoSlice";

import styles from "./Login.module.less";
import { withRouter } from "react-router-dom";
import { useAppDispatch } from "@/store/store";
import { hpre } from "@/utils/wrapper";
import LoginForm, { LoginParams } from "./LoginForm";
import RegisterForm, { RegisterParams } from "./RegisterForm";
import { UserInfoSubstate } from "@/types/state";
import AppConstans from "@/config/url.const";
import { exportUserInfo } from "@/utils/localStorage";
import Helmet from "@/components/Helmet";

export default withRouter(function Login(props) {
  const dispatch = useAppDispatch();
  const [redirect] = useState(url.parse(props.location.search, true).query);

  // 处理提交
  const onSubmit = useCallback(
    async ({ email, password, captcha }: LoginParams) => {
      const MESSAGE_KEY = "MESSAGE_KEY";
      message.loading({
        content: "登录中...",
        key: MESSAGE_KEY,
      });
      // 检查验证码的合理性
      if (!isEmail(email) || !isPassword(password) || !captcha) {
        message.error("账号或密码格式不符合规则", 0.5);
        message.destroy(MESSAGE_KEY);
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

          // 获取用户信息，并初始化 redux 中的 userInfo
          // 更新用户的登录状态
          console.log(res);
          dispatch(setHasLogin(true));
          dispatch(setUserInfo(res.data as UserInfoSubstate));
          exportUserInfo(res.data as Record<string, any>);

          // 跳转页面
          if (redirect && typeof redirect === "string")
            props.history.push(redirect);
          else props.history.push("/im");
        } else {
          message.error(res.message);
        }
      } catch (err) {
        // 验证登录结果，需要重新实现验证效果
        if (err) {
          if (err.response) {
            message.error("登录失败，请重试");
            return;
          } else {
            message.error("网络连接故障");
          }
        }
      }
      message.destroy(MESSAGE_KEY);
    },
    [dispatch, redirect, props.history]
  );

  const submitReg = useCallback(async (params: RegisterParams) => {
    const MESSAGE_KEY = "MESSAGE_KEY";
    message.loading({
      content: "注册中...",
      key: MESSAGE_KEY,
    });
    // 检查验证码的合理性
    if (
      !isEmail(params.email) ||
      !isPassword(params.password) ||
      !params.nickname ||
      !params.captcha
    ) {
      message.error("账号或密码格式不符合规则", 0.5);
      message.destroy(MESSAGE_KEY);
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

    // 验证登录结果，需要重新实现验证效果
    if (err) {
      if (err.response.status !== 400) {
        message.error(`表单数据不合法 ${err.data.error}`);
        console.error(err.data);
      }
      message.destroy(MESSAGE_KEY);
      return;
    }

    if (!res) {
      message.destroy(MESSAGE_KEY);
      return;
    }

    message.info("注册成功", 0.5);
    message.destroy(MESSAGE_KEY);
  }, []);

  document.title = "Sign In to Neutron IM";

  return (
    <div
      style={{
        backgroundImage: `url(${AppConstans.LOGIN_BG_URL})`,
      }}
      className={styles.fullscreenContainer}
    >
      <Helmet>
        <title>Sign In to Neutron IM</title>
      </Helmet>
      <div className={styles.formContainer}>
        <div className={styles.title}>Sign in to Neutron-IM</div>
        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="登录" key="1">
            <LoginForm onSubmit={onSubmit} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="注册" key="2">
            <RegisterForm onSubmit={submitReg} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
});
