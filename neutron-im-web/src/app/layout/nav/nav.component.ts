import { Component, Input, OnInit } from '@angular/core';

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

}
