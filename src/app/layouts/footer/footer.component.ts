import { Component, OnInit } from '@angular/core';
import numbers from '@constants/numbers';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  currentYear: number;
  startYear: number;
  constructor() {}

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.startYear = numbers.startYear;
  }
}
