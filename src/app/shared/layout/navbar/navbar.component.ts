import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sga-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ]
})
export class NavbarComponent implements OnInit {
  toggleFullScreen: any;

  constructor() { }

  ngOnInit() {
  }

}
