import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { setAuthClasses } from '../../../core/helpers/utility';

/**
 * This component informs a user that him password was changed
 */

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit, AfterViewInit {
  title = 'Confirm email';

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.setTitle(this.title);
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
