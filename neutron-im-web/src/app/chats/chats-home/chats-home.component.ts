import { Component, OnInit } from "@angular/core";
import { ChatRestService } from "@/services";

@Component({
  selector: 'nim-chats-home',
  templateUrl: './chats-home.component.html',
  styleUrls: ['./chats-home.component.less']
})
export class ChatsHomeComponent implements OnInit {

  constructor(private chatRestService: ChatRestService) { }

  ngOnInit(): void {
    // this.chatRestService.getRecentList().subscribe({
    //   next: value => {
    //     console.log(value);
    //   },
    //   error: err => {
    //     console.log(err);
    //   },
    //   complete: () => {}
    // })
  }

}
