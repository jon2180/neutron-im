import React, { useState } from 'react';
import { postAccountLogin } from '@/services/user';

export default function TestPage() {

  const [res, setRes] = useState({});
  const [err, setErr] = useState({});

  const submit = async () => {
    try {
      const data = await postAccountLogin({
        email: '76365451@qq.com',
        password: 'Staea1478',
        captcha: 'xxdf',
      })
      console.log(data)
      setRes(data)
    } catch (err) {
      console.log(err)
      setErr(err)
    }
  }


  return (
    <div>
      <button onClick={submit}>Click to Show Data</button>
      <div>
        Data
        {
          JSON.stringify(res, null, '\t')
        }
      </div>
      <div>
        Error
        {
          JSON.stringify(err,null, 4)
        }
      </div>
    </div>
  )
}
