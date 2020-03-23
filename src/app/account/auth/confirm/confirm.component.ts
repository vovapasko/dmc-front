import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

/**
 * This component informs a user that him password was changed
 */

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, AfterViewInit {

    title = 'Confirm email';

    constructor(private titleService: Title) {
    }

    ngOnInit() {

        // set page title
        this.setTitle(this.title);
    }

    public setTitle(title: string) {
        this.titleService.setTitle(title);
    }

    ngAfterViewInit() {
        document.body.classList.add('authentication-bg');
        document.body.classList.add('authentication-bg-pattern');
    }
}
