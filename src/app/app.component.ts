import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DEFAULT_INTERRUPTSOURCES, Idle, KeepaliveSvc } from 'ng2-idle-core';

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

  public constructor(private titleService: Title, private idle: Idle, private keepalive: KeepaliveSvc) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    keepalive.start();

    keepalive.ping();

    this.reset();
  }

  ngOnInit(): void {
    this.setTitle(this.title);
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  public setTitle(title: string) {
    this.titleService.setTitle(title);
  }
}
