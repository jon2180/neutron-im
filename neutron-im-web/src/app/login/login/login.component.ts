import { I18nService } from '@/components/i18n';
import { RegisterParams, UserRestService } from '@/services/user-rest.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'nim-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  validateForm!: FormGroup;

  isLogin = true;

  isSubmitting = false;

  constructor(
    private message: NzMessageService,
    private i18n: I18nService,
    private userRest: UserRestService,
    private fb: FormBuilder
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email]],
      password: [null, [Validators.required]],
      captcha: ['', (val: any) => {
        // console.log(val)
        return {
          result: true,
        }
      }],

      // 以下内容仅注册时需要填写
      // name: [null, [Validators.required]],
      // repassword: [null, [Validators.required]],

    });
  }

  get formValue() {
    return this.validateForm.value as RegisterParams;
  }

  login() {
    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;

    console.log(this.formValue);
    this.validateForm.updateValueAndValidity();
    if (this.validateForm.invalid) {
      console.log('错误提示：表单有错');
      this.isSubmitting = false;
      return;
    }

    this.isSubmitting = false;
    // this.validateForm.
    // const { email, password, captcha } = this.validateForm;
    // // 检查验证码的合理性
    // if (!isEmail(email) || !isPassword(password) || !captcha) {
    //   // this.message.destroy(MESSAGE_KEY);
    //   this.message.error(
    //     this.i18n.get(
    //       'app.login.form.invalid_account_password_format'
    //     ),
    //    { nzDuration:  0.5}
    //   );
    //   return;
    // }

    // this.submitting = true;
    // this.message.loading(this.i18n.get('app.login.logging'));

    // this.userRest.postAccountLogin({ email, password, captcha }).subscribe(val => {
    //   console.log(val)
    // });
  }

  switchLoginOrReg() {
    this.isLogin = !this.isLogin;
    // const searchStr = new URLSearchParams({
    //   ...urlParams,
    //   tab: isLogin ? 'logon' : 'login',
    // }).toString();
    // setIsLogin(!isLogin);
    // props.history.replace({
    //   pathname: props.location.pathname,
    //   search: searchStr ? `?${searchStr}` : '',
    // });
  }


}



// rules = {
//   email: [{
//     required: true,
//     pattern:
//       /^[A-Za-z0-9]+([.+-_][a-zA-Z0-9]+)*@[A-Za-z0-9]+([.-][a-zA-Z0-9]+)*\.[A-Za-z]{2,14}$/,
//     message: 'Please input your email correctly!',
//   }],
//   password: [{
//     required: true,
//     pattern: /^\w{6,16}$/,
//     message: 'Please input your password correctly!',
//   }]
// }

// formData = {
//   email: '',
//   name: '',
//   password: '',
//   repassword: '',
//   captcha: ''
// };
