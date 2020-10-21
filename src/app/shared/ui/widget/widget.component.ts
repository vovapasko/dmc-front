import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import numbers from '@constants/numbers';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent implements OnInit {

  searchForm: FormGroup;

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

  }

  public search(): void {

  }
}
