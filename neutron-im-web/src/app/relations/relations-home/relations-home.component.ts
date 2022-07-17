import { Component, OnInit } from '@angular/core';
import { ChatRestService } from "@/services";

@Component({
  selector: 'nim-relations-home',
  templateUrl: './relations-home.component.html',
  styleUrls: ['./relations-home.component.less']
})
export class RelationsHomeComponent implements OnInit {
  searchKeyword: string = '';
  searchPlaceholder: string = 'Search chats, chat histories and etc.';

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

  onSearch() {
    console.log('search');
  }
}
