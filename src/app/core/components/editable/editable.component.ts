import { Component, ContentChild, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewModeDirective } from '../../../shared/directives/view-mode.directive';
import { EditModeDirective } from '../../../shared/directives/edit-mode.directive';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';
import { untilDestroyed } from '@ngneat/until-destroy';

@Component({
  selector: 'editable',
  template: `
      <ng-container *ngTemplateOutlet="currentView"></ng-container> `
})
export class EditableComponent implements OnInit {
  @Output() update = new EventEmitter();
  @ContentChild(ViewModeDirective, { static: false }) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective, { static: false }) editModeTpl: EditModeDirective;

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  constructor(private host: ElementRef) {
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'dblclick')
      .subscribe(() => {
        this.mode = 'edit';
        this.editMode.next(true);
      });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click')
      .pipe(
        filter(({ target }) => this.element.contains(target) === false), take(1)
      );

    this.editMode$
      .pipe(switchMapTo(clickOutside$))
      .subscribe((event) => {
        this.update.next();
        this.mode = 'view';
      });
  }

  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }
}
