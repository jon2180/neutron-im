import React, { useState } from "react";
import AppConstants from "@/config/url.const";
import styles from "./Captcha.module.less";

export default function Captcha(props: any) {
  const [captchaUrl, setCaptchaUrl] = useState(AppConstants.CAPTCHA_URL);

  const reloadCaptcha = () => {
    setCaptchaUrl(AppConstants.CAPTCHA_URL);
  };

  return (
    <img
      src={captchaUrl}
      className={styles.captchaPic}
      alt="captcha"
      onClick={reloadCaptcha}
      {...props}
    />
  );
}
