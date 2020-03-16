import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, AfterViewInit {

  title = 'Confirm email';

  constructor( private titleService: Title ) { }

  ngOnInit() {

    // set page title
    this.setTitle(this.title);
  }

  ngAfterViewInit() {
    document.body.classList.add('authentication-bg');
    document.body.classList.add('authentication-bg-pattern');
  }

  public setTitle( title: string) {
    this.titleService.setTitle( title );
  }
}
