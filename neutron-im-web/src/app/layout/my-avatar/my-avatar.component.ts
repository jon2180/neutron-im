import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nim-my-avatar',
  templateUrl: './my-avatar.component.html',
  styleUrls: ['./my-avatar.component.less']
})
export class MyAvatarComponent implements OnInit {

  @Input() collapsed = false;

  user = { nickname: 'Nick', }

  constructor() { }

  ngOnInit(): void {
  }

}
