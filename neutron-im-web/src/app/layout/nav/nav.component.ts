import { Component, Input, OnInit } from '@angular/core';
import { NzMenuItemDirective } from "ng-zorro-antd/menu";

@Component({
  selector: 'nim-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.less']
})
export class NavComponent implements OnInit {

  @Input() collapsed = false;

  constructor() { }

  ngOnInit(): void {
  }

  onMenuClicked(event: NzMenuItemDirective) {

  }
}
