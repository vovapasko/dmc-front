import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-ubold',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DMC';

  public constructor(private titleService: Title ) { }

  public setTitle( title: string) {
    this.titleService.setTitle( title );
  }
}
