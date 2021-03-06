import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DEFAULT_INTERRUPTSOURCES, Idle, KeepaliveSvc } from 'ng2-idle-core';
import { AuthenticationService } from '@services/auth.service';
import { Timeouts } from '@constants/timeouts';
import { Store } from '@ngrx/store';
import { SetUserStatus } from '@store/actions/user.actions';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-ubold',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DMC';
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;

  public constructor(
    private titleService: Title,
    private idle: Idle,
    private store: Store,
    private userService: UserService
  ) {
    // sets an idle timeout of 5 minutes, for testing purposes.
    // idle.setIdle(60);
    idle.setIdle(Timeouts.fiveSeconds);
    // sets a timeout period of 5 minutes. after 15 minutes of inactivity, the user will be considered timed out.
    idle.setTimeout(Timeouts.fifteenMinutesInSeconds);
    // idle.setTimeout(30);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      console.log(this.idleState);
      if (this.userService.user.isOnline) {
        return;
      }
      const payload = { id: this.userService.user.id, data: { isOnline: true } };
      this.store.dispatch(new SetUserStatus(payload));
    });
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      // this.authService.logout();
      const payload = { id: this.userService.user.id, data: { isOnline: false } };
      this.store.dispatch(new SetUserStatus(payload));
      this.reset();
    });
    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      console.log(this.idleState);
    });
    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    // keepalive.start();
    //
    // keepalive.ping();

    this.reset();
  }

  ngOnInit(): void {
    this.setTitle(this.title);
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
    console.log(this.idleState);
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
