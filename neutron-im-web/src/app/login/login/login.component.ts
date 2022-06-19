import { I18nService } from "@/components/i18n";
import { LoginParams, RegisterParams, UserRestService } from "@/services/user-rest.service";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NzMessageService } from "ng-zorro-antd/message";
import { isEmail, isPassword } from "@/utils/validate";
import { LocalStorageService } from "@/components/storage/local-storage.service";

@Component({
  selector: "nim-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.less"]
})
export class LoginComponent {
  formGroup!: FormGroup;

  isLogin = true;

  isSubmitting = false;

  constructor(
    private message: NzMessageService,
    private i18n: I18nService,
    private userRest: UserRestService,
    private fb: FormBuilder,
    private local: LocalStorageService
  ) {
    this.formGroup = this.fb.group({
      email: ["", [Validators.email]],
      password: ["", [Validators.required]],
      captcha: ["", (val: any) => {
        // console.log(val)
        return {
          result: true
        };
      }]
    });
  }

  switchLoginOrReg() {
    this.isLogin = !this.isLogin;

    // 以下内容仅注册时需要填写
    // name: [null, [Validators.required]],
    // repassword: [null, [Validators.required]],
    if (this.isLogin) {
      this.formGroup.removeControl("name");
      this.formGroup.removeControl("repassword");
    } else {
      this.formGroup.addControl("name", new FormControl(null, [Validators.required]));
      this.formGroup.addControl("repassword", new FormControl(null, [Validators.required]));
    }
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

  get loginFormValue() {
    return this.formGroup.value as LoginParams;
  }

  get registerFormValue() {
    return this.formGroup.value as RegisterParams;
  }

  login() {
    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;

    this.formGroup.updateValueAndValidity();
    const { email, password, captcha } = this.loginFormValue;
    // 检查验证码的合理性
    if (!isEmail(email) || !isPassword(password) || !captcha) {

      // this.message.remove();
      console.log("错误提示：表单有错");
      this.message.error(
        this.i18n.get("app.login.form.invalid_account_password_format")
        // { nzDuration: 0.5 }
      );
      this.isSubmitting = false;
      return;
    }
    this.userRest.postAccountLogin(this.loginFormValue).subscribe({
      next: res => {
        console.log(res);
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error(err);
        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });

    // this.submitting = true;
    // this.message.loading(this.i18n.get('app.login.logging'));

    // this.userRest.postAccountLogin({ email, password, captcha }).subscribe(val => {
    //   console.log(val)
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
