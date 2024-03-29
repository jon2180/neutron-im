import React, { useCallback, useEffect } from 'react';

import { message } from 'antd';
import { postAccount, postAccountLogin } from '@/services/user';
import { isEmail, isPassword } from '@/utils/validate';
import { setUserInfo, setHasLogin } from '@/store/userInfoSlice';

import styles from './Login.module.less';
import { withRouter } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { createSemaphore } from '@/utils/wrapper';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { exportUserInfo } from '@/utils/localStorage';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage, useIntl } from 'react-intl';

import type { RegisterParams } from './RegisterForm';
import type { LoginParams } from './LoginForm';
import type { UserInfoSubstate } from '@/types/state';
import { useGetParams } from '@/utils/hooks';
import { useSafeState } from 'ahooks';
import type { NimSafeAny } from '@/types';

const MESSAGE_KEY = 'MESSAGE_KEY';
const loginStatus = createSemaphore();
const logonStatus = createSemaphore();

export default withRouter(function Login(props) {
  const dispatch = useAppDispatch();
  const [isLogin, setIsLogin] = useSafeState(true);
  const urlParams = useGetParams({
    redirect: '',
    tab: 'login',
  });

  const intl = useIntl();

  useEffect(() => {
    if (urlParams.tab && urlParams.tab === 'logon') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  });

  // 处理提交
  const onSubmit = useCallback(
    async ({ email, password, captcha }: LoginParams) => {
      if (loginStatus.loading === 'pending') return;

      // 检查验证码的合理性
      if (!isEmail(email) || !isPassword(password) || !captcha) {
        message.destroy(MESSAGE_KEY);
        message.error(
          intl.formatMessage({
            id: 'app.login.form.invalid_account_password_format',
            defaultMessage: 'Invalid format of account or password',
          }),
          0.5,
        );
        return;
      }

      message.loading({
        content: intl.formatMessage({
          id: 'app.login.logging',
          defaultMessage: 'Logging in...',
        }),
        key: MESSAGE_KEY,
      });
      loginStatus.loading = 'pending';
      const res = await postAccountLogin({
        email,
        password,
        captcha,
      });
      loginStatus.loading = 'idle';
      message.destroy(MESSAGE_KEY);

      if (res.status !== 20000 || !res.data || typeof res.data !== 'object') {
        message.error(res.message);
        console.log(res);
        return;
      }

      message.info(
        intl.formatMessage({
          id: 'app.login.logged',
          defaultMessage: 'Logged in',
        }),
        0.3,
      );

      // 获取用户信息，并初始化 redux 中的 userInfo
      // 更新用户的登录状态
      dispatch(setHasLogin(true));
      dispatch(setUserInfo(res.data as UserInfoSubstate));
      exportUserInfo(res.data as Record<string, NimSafeAny>);

      setTimeout(() => {
        // 跳转页面
        if (urlParams.redirect && typeof urlParams.redirect === 'string') {
          props.history.push(decodeURI(urlParams.redirect));
        } else {
          props.history.push('/im');
        }
      }, 500);
    },
    [dispatch, urlParams, props.history, intl],
  );

  const submitReg = useCallback(
    async (params: RegisterParams) => {
      if (logonStatus.loading === 'pending') return;

      // 检查验证码的合理性
      if (
        !isEmail(params.email) ||
        !isPassword(params.password) ||
        !params.nickname ||
        !params.captcha
      ) {
        message.destroy(MESSAGE_KEY);
        message.error(
          intl.formatMessage({
            id: 'app.login.form.invalid_account_password_format',
            defaultMessage: 'Invalid format of account or password',
          }),
          0.5,
        );
        return;
      }

      // const MESSAGE_KEY = "MESSAGE_KEY";
      message.loading({
        content: '注册中...',
        key: MESSAGE_KEY,
      });
      logonStatus.loading = 'pending';
      const res = await postAccount({
        email: params.email,
        password: params.password,
        nickname: params.nickname,
        captcha: params.captcha,
      });
      logonStatus.loading = 'idle';
      message.destroy(MESSAGE_KEY);

      // 验证登录结果，需要重新实现验证效果
      if (!res || res.status !== 20000) {
        message.error(`注册失败，${res.message}`);
        return;
      }

      message.info(
        intl.formatMessage({
          id: 'app.register.registered',
          defaultMessage: 'Register successfully',
        }),
        0.2,
      );
    },
    [intl],
  );

  return (
    <div
      className={styles.fullscreenContainer}
      style={{ backgroundImage: 'url(/assets/login-bg.jpg)' }}
    >
      <Helmet>
        <title>
          {intl.formatMessage({
            id: 'app.login',
            defaultMessage: 'Sign in to Neutron-IM',
          })}
        </title>
      </Helmet>
      <div className={styles.formContainer}>
        <div
          style={{ backgroundImage: 'url(/assets/login-bg.jpg)' }}
          className={styles.imgDesc}
        >
          <div className={styles.brandDescBox}>
            <div className={styles.brandDesc}>Made for Developers</div>
            <div className={styles.brandDesc}>
              {' '}
              更
              <span
                style={{
                  color: 'rgba(64, 169, 255, 0.65)',
                }}
              >
                「 IT 」
              </span>
              的即时通讯工具
            </div>
            <div className={styles.brandName}>Neutron IM</div>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.title}>
            <span
              style={{
                fontSize: '14px',
                lineHeight: '22px',
                color: 'rgba(0, 0, 0, 0.45)',
                fontWeight: 500,
              }}
            >
              <FormattedMessage
                id="app.login.greeting"
                description="Greeting to welcome the user to the app"
                defaultMessage="Hello, {name}!"
                values={{
                  name: 'Eric',
                }}
              />
            </span>
            <br />
            Neutron IM
          </div>
          {isLogin ? (
            <LoginForm onSubmit={onSubmit} />
          ) : (
            <RegisterForm onSubmit={submitReg} />
          )}
          <div>
            <div style={{ color: 'rgba(0,0,0,0.45)' }}>Or</div>
            <div>
              <span
                style={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  color: 'rgba(0,0,0,0.65)',
                }}
                onClick={() => {
                  const searchStr = new URLSearchParams({
                    ...urlParams,
                    tab: isLogin ? 'logon' : 'login',
                  }).toString();
                  setIsLogin(!isLogin);
                  props.history.replace({
                    pathname: props.location.pathname,
                    search: searchStr ? `?${searchStr}` : '',
                  });
                }}
              >
                {isLogin ? (
                  <FormattedMessage
                    id="app.register"
                    defaultMessage="Register"
                  />
                ) : (
                  <FormattedMessage id="app.login" defaultMessage="Login" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
