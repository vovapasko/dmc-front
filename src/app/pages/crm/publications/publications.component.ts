import { Component, OnInit } from '@angular/core';

import { Orders } from './orders.model';

import { ordersData } from './data';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Publication } from '@models/instances/publication';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Note } from '@models/instances/note';

@Component({
  selector: 'app-orders',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})

/**
 * Orders component: handling the orders with sidebar and content
 */
export class PublicationsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  ordersData: Orders[];
  // page number
  page = 1;
  // default page size
  pageSize = 10;
  // total number of records
  totalRecords = 0;

  preventPublicationForm: FormGroup;
  notesForm: FormGroup;
  publicationForm: FormGroup;
  publicationControls: FormArray;
  preventPublicationControls: FormArray;
  notesControls: FormArray;
  publicationList = [];
  preventPublicationList = [];
  notesList = [];

  // start and end index
  startIndex = 1;
  endIndex = 10;

  constructor(
    private modalService: NgbModal
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = [{ label: 'UBold', path: '/' }, { label: 'eCommerce', path: '/' }, { label: 'Orders', path: '/', active: true }];

    /**
     * fetches data
     */
    this._fetchData();
    this.initPreventPublicationControls();
    this.initPublicationControls();
    this.initNotesControls();
  }

  public initPublicationControls(list: Array<Publication> = []): void {
    const toGroups = list.map((entity: Publication) => {
      return new FormGroup({
        link: new FormControl(entity.link, Validators.required)
      });
    });
    this.publicationControls = new FormArray(toGroups);
  }

  public initNotesControls(list: Array<Note> = []): void {
    const toGroups = list.map((entity: Note) => {
      return new FormGroup({
        link: new FormControl(entity.note, Validators.required)
      });
    });
    this.notesControls = new FormArray(toGroups);
  }

  /**
   * Modal Open
   * @param content modal content
   */
  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
  }

  public initPreventPublicationControls(list: Array<Publication> = []): void {
    const toGroups = list.map((entity: Publication) => {
      return new FormGroup({
        link: new FormControl(entity.link, Validators.required)
      });
    });
    this.preventPublicationControls = new FormArray(toGroups);
  }

  /**
   * Handle on page click event
   */
  onPageChange(page: any): void {
    this.startIndex = (page - 1) * this.pageSize + 1;
    this.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    this.ordersData = ordersData.slice(this.startIndex - 1, this.endIndex - 1);
  }

  public publish(): void {
    // TODO
  }

  public preventPublish(): void {
    // TODO
  }

  public note(): void {

  }

  /**
   * fetches the orders value
   */
  private _fetchData() {
    this.ordersData = ordersData;
    this.totalRecords = ordersData.length;
  }
}
