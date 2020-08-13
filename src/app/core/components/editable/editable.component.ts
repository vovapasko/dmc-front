import { Component, ContentChild, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ViewModeDirective } from '@shared/directives/view-mode.directive';
import { EditModeDirective } from '@shared/directives/edit-mode.directive';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';
import { ContractorService } from '@services/contractor.service';

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
  @ContentChild(ViewModeDirective, { static: false }) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective, { static: false }) editModeTpl: EditModeDirective;

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  constructor(
    private host: ElementRef,
    private contractorService: ContractorService
  ) {
  }

  get currentView() {
    return this.mode === 'edit' || (this.editing && this.checked) ?
      this.editModeTpl.tpl
      :
      this.viewModeTpl.tpl;
  }

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'click')
      .subscribe(() => {
        this.edit.next(true);
        this.mode = 'edit';
        this.editMode.next(true);
      });
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'dblclick')
      .pipe(
        filter(({ target }) => this.element.contains(target) === false), take(1)
      );

    this.editMode$
      .pipe(switchMapTo(clickOutside$))
      .subscribe((event) => {
        this.edit.next();
        this.update.next();
        this.mode = 'view';
      });
  }

  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }
}
