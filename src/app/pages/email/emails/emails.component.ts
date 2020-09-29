import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { opportunityData, simplePieChart } from './data';

import { Opportunities, ChartType } from './emails.model';
import { select, Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { GetNewsEmails } from '@store/actions/email.actions';
import { selectHashtags } from '@store/selectors/news.selectors';
import { selectNewsEmails } from '@store/selectors/email.selectors';
import { breadCrumbs } from '@constants/bread-crumbs';

@Component({
  selector: 'app-opportunities',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})

/**
 * Opportunities component - handling the emails with sidebar and content
 */
export class EmailsComponent implements OnInit {
  // bread crumb items
  breadCrumbItems: Array<{}>;

  opportunityData: Opportunities[];
  simplePieChart: ChartType;
  term: any;
  submitted: boolean;
  newsEmails$ = this.store.pipe(select(selectNewsEmails));


  // validation form
  validationform: FormGroup;

  constructor(
    private modalService: NgbModal,
    public formBuilder: FormBuilder,
    private store: Store<IAppState>
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.emails;

    /**
     * form validation
     */
    this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      category: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
    /**
     * fetches data
     */
    this._fetchData();
  }

  /**
   * Returns form
   */
  get form() {
    return this.validationform.controls;
  }

  /**
   * Modal Open
   * @param content modal content
   */
  openModal(content: string) {
    this.modalService.open(content, { centered: true });
  }

  /**
   * save the Opportunities data
   */
  saveData() {
    const name = this.validationform.get('name').value;
    const phone = this.validationform.get('phone').value;
    const category = this.validationform.get('category').value;
    const email = this.validationform.get('email').value;

    if (this.validationform.valid) {

      this.opportunityData.push({
        company: 'assets/images/companies/amazon.png',
        name,
        phone,
        location: 'California',
        category,
        email,
        status: 'Won'
      });
      this.validationform = this.formBuilder.group({
        name: '',
        phone: '',
        location: '',
        email: ''
      });
      this.modalService.dismissAll();
    }
    this.submitted = true;
  }

  /**
   * fetches the emails value
   */
  private _fetchData() {
    this.opportunityData = opportunityData;
    this.store.dispatch(new GetNewsEmails());
    this.simplePieChart = simplePieChart;
  }
}
