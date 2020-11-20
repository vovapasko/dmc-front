import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewModeDirective } from '@shared/directives/view-mode.directive';
import { EditModeDirective } from '@shared/directives/edit-mode.directive';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';
import { EditableMode } from '@components/editable/editable.model';

@Component({
  selector: 'editable',
  template: `
      <ng-container *ngTemplateOutlet="currentView"></ng-container> `
})
export class EditableComponent implements OnInit {
  @Input() checked: boolean;
  @Input() editing: boolean;
  @Output() edit = new EventEmitter();
  @Output() update = new EventEmitter();
  @ContentChild(ViewModeDirective) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective) editModeTpl: EditModeDirective;

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode = EditableMode.view;

  constructor(private host: ElementRef) {
  }

  /**
   * Returns html template
   */
  get currentView(): TemplateRef<any> {
    return this.mode === 'edit' || (this.editing && this.checked) ?
      this.editModeTpl.tpl
      :
      this.viewModeTpl.tpl;
  }

  ngOnInit(): void {
    this.viewModeHandler();
    this.editModeHandler();
  }

  private get element() {
    return this.host.nativeElement;
  }

  /**
   * Handle view mode
   */
  private viewModeHandler(): void {
    fromEvent(this.element, 'click')
      .subscribe(() => {
        this.edit.next(true);
        this.mode = EditableMode.edit;
        this.editMode.next(true);
      });
  }

  /**
   * Handle edit mode
   */
  private editModeHandler(): void {
    const clickOutside$ = fromEvent(document, 'dblclick')
      .pipe(
        filter(({ target }) => this.element.contains(target) === false), take(1)
      );

    this.editMode$
      .pipe(switchMapTo(clickOutside$))
      .subscribe((event) => {
        this.edit.next();
        this.update.next();
        this.mode = EditableMode.view;
      });
  }

  /**
   * Switch to view mode
   */
  public toViewMode(): void {
    this.update.next();
    this.mode = EditableMode.view;
  }
}
