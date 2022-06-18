import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nim-list-panel',
  templateUrl: './list-panel.component.html',
  styleUrls: ['./list-panel.component.less']
})
export class ListPanelComponent implements OnInit {

  list: { id: number, avatar: string; nickname: string; lastMsgContent: string; unread: number; }[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
