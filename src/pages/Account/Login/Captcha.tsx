import React, { useState } from "react";
import AppConstants from "@/config/url.const";
import styles from "./Captcha.module.less";
import { useIntl } from "react-intl";

export default function Captcha(props: any) {
  const intl = useIntl();
  const [captchaUrl, setCaptchaUrl] = useState(AppConstants.CAPTCHA_URL);

  const reloadCaptcha = () => {
    setCaptchaUrl(AppConstants.CAPTCHA_URL);
  };

  return (
    <img
      src={captchaUrl}
      className={styles.captchaPic}
      alt={intl.formatMessage({ id: "alt.captcha", defaultMessage: "Captcha" })}
      onClick={reloadCaptcha}
      {...props}
    />
  );
}
