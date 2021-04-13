import React, { useState } from "react";
import { generateCaptcha } from "@/utils/generator";

const getCaptchaUrl = () => {
  return `${process.env.REACT_APP_API_BASE_URL || '//localhost:3001'}/captcha-pic?id=${generateCaptcha()}`
}

export default function Captcha(props:any) {

  const [captchaUrl, setCaptchaUrl] = useState(getCaptchaUrl);
  
  const reloadCaptcha = () => {
    setCaptchaUrl(getCaptchaUrl())
  }

  return <img src={captchaUrl} alt="captcha" onClick={reloadCaptcha} {...props}/>
}