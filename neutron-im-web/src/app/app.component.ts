import { UserRestService } from '@/services/user-rest.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nim-root',
  template: `<router-outlet></router-outlet>`,
  styles: [``]
})
export class AppComponent implements OnInit {
  title = 'neutron-im-web';

  constructor(private userRestService: UserRestService) { }

  ngOnInit(): void {
    // 校验登录信息
    this.userRestService.getSelfUserInfo().subscribe((val) => {
      console.log(val);
    });
  }
}
