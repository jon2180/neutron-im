import { Component, OnInit } from "@angular/core";
import { formatTimestamp } from "@/utils/format";

interface Chat {
  id: number;
  avatar: string;
  nickname: string;
  last_msg_time: number;
  lastMsgContent: string;
  unread: number;
}

@Component({
  selector: "nim-list-panel",
  templateUrl: "./list-panel.component.html",
  styleUrls: ["./list-panel.component.less"]
})
export class ListPanelComponent implements OnInit {

  selectedChat = {
    id: -1,
    avatar: "http://localhost:3001/hello.png",
    nickname: "helloworlod",
    lastMsgContent: "helloworlod",
    unread: 10,
    last_msg_time: Date.now()
  };

  list: Chat[] = new Array(10).fill({
    id: 1,
    avatar: "http://localhost:3001/hello.png",
    nickname: "helloworlod",
    lastMsgContent: "helloworlod",
    unread: 10,
    last_msg_time: Date.now()
  });

  constructor() {
  }

  ngOnInit(): void {

  }

  formatTimestamp = formatTimestamp;

}
