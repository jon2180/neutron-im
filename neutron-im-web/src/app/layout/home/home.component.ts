import { SafeAny } from '@/types';
import { Component, OnInit } from '@angular/core';

const routes = [
  { link: '/chats', icon: '' },
  { link: '/friends' },
  { link: '/collections' },
];

@Component({
  selector: 'nim-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  navCollapsed = false;

  list: SafeAny[] = routes

  constructor() { }

  ngOnInit(): void {
  }

}
