import React, { useState } from 'react';
import AppConstants from '@/config/url.const';
import styles from './Captcha.module.less';
import { useIntl } from 'react-intl';

/**
 * 原生 IMG 标签对象的参数类型
 */
type InstrinsicImg = JSX.IntrinsicElements['img'];

type CaptchaProps = Partial<{
  [k in keyof InstrinsicImg]: InstrinsicImg[k];
}>;

export default function Captcha(props: CaptchaProps): JSX.Element {
  const intl = useIntl();
  const [captchaUrl, setCaptchaUrl] = useState(AppConstants.CAPTCHA_URL);
  const reloadCaptcha = () => {
    setCaptchaUrl(AppConstants.CAPTCHA_URL);
  };

  return (
    <img
      src={captchaUrl}
      className={styles.captchaPic}
      alt={intl.formatMessage({ id: 'alt.captcha', defaultMessage: 'Captcha' })}
      onClick={reloadCaptcha}
      {...props}
    />
  );
}
