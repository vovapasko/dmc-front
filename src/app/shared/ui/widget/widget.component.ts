import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  @Input() showResetButton: boolean;
  @Input() showRemoveButton: boolean;
  @Input() showMoveToTrashButton: boolean;

  searchForm: FormGroup;
  @Output() reloadEvent = new EventEmitter<null>();
  @Output() removeEvent = new EventEmitter<null>();
  @Output() searchEvent = new EventEmitter<string>();


  constructor(
    public formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      term: [null, [Validators.required]]
    });
  }

  public reload(): void {
    this.reloadEvent.emit();
  }

  public remove(): void {
    this.removeEvent.emit();
  }

  public search(): void {
    if (this.searchForm.invalid && !this.searchForm.dirty) {
      return;
    }
    this.searchEvent.emit(this.searchForm.value.term);
  }
}
