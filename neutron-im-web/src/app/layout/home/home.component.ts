import { SafeAny } from '@/types';
import { Component, OnInit } from '@angular/core';
const routes = [
  { link: '/chats', icon: '' },
  { link: '/friends' },
  { link: '/collections' },
]
@Component({
  selector: 'nim-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  list: SafeAny[] = routes

  quickCenter = {
    name: '快捷中心',
    list: [
      {
        text: '最近动态',
        path: '/activities',
        icon: null,
      },
      {
        text: '代码分享',
        path: '/codesnips',
        icon: null,
      },
      {
        text: '探索',
        path: '/search',
        icon: null,
      },
      {
        text: '聊天',
        path: '/im',
        icon: null,
      },
    ],
  };
  friendLinks = {
    name: '友情链接',
    list: [
      {
        text: 'Github',
        path: '//github.com/',
        icon: null,
      },
      {
        text: 'Ant Design',
        path: '//ant.design',
        icon: null,
      },
      {
        text: 'Typora',
        path: '//typora.io/',
        icon: null,
      },
      {
        text: 'Wuog 个人博客',
        path: '//wuog.top',
        icon: null,
      },
    ],
  };

  aboutUs = {
    name: '关于我们',
    list: [
      {
        text: 'Github - jon2180',
        path: '//github.com/jon2180',
        icon: null,
      },
      {
        text: 'E-Mail',
        path: 'mailto:763653451@qq.com',
        icon: null,
      },
    ],
  };

  fullYear = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
