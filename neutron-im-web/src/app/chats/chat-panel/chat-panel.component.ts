import { Component, OnInit } from '@angular/core';
import { Chat } from "@/types";

@Component({
  selector: 'nim-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.less']
})
export class ChatPanelComponent implements OnInit {
  chatHistories: Chat[] = new Array(10).fill({ account_nickname: 'hello' });

  constructor() { }

  ngOnInit(): void {
  }

}
