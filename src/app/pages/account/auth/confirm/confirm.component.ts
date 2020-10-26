import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { setAuthClasses } from '@helpers/utility';
import numbers from '@constants/numbers';
import { CONFIRM_EMAIL } from '@constants/titles';

/**
 * This component informs a user that him password was changed
 */

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit, AfterViewInit {
  title = CONFIRM_EMAIL;
  currentYear: number;
  startYear: number;

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.setTitle(this.title);
    this.currentYear = new Date().getFullYear();
    this.startYear = numbers.startYear;
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Add global css auth classes
   */
  ngAfterViewInit() {
    setAuthClasses();
  }
}
