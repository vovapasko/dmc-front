import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ubold',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DMC';

  public constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.setTitle(this.title);
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
