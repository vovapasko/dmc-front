import { Component, OnInit } from '@angular/core';

import { Orders } from './orders.model';

import { ordersData } from './data';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Publication } from '@models/instances/publication';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Note } from '@models/instances/note';
import { GetContractors, SelectContractor } from '@store/actions/contractor.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { selectContractorList, selectSelectedContractor } from '@store/selectors/contractor.selectors';
import { BehaviorSubject } from 'rxjs';
import { Contractor } from '@models/instances/contractor';
import { setValues } from '@helpers/utility';
import { Comment } from '@models/instances/comment';
import { PublicationBlackList } from '@models/instances/publication-black-list';
import { News } from '@models/instances/news';
import { ContractorService } from '@services/contractor.service';
import { CreatePublishPayload } from '@models/payloads/publication/publish/create';
import { CreateNotPublishPayload } from '@models/payloads/publication/notPublish/create';
import { CreateCommentPayload } from '@models/payloads/publication/comment/create';
import { UpdatePublishPayload } from '@models/payloads/publication/publish/update';
import { UpdateNotPublishPayload } from '@models/payloads/publication/notPublish/update';
import { UpdateCommentPayload } from '@models/payloads/publication/comment/update';
import {
  CreateComment,
  CreateNotPublication,
  CreatePublication,
  DeleteComment,
  DeleteNotPublication,
  DeletePublication,
  GetComments,
  GetPublicationBlackList,
  GetPublications,
  UpdateComment,
  UpdateNotPublication,
  UpdatePublication
} from '@store/actions/publication.action';
import { DeletePublishPayload } from '@models/payloads/publication/publish/delete';
import { DeleteNotPublishPayload } from '@models/payloads/publication/notPublish/delete';
import { DeleteCommentPayload } from '@models/payloads/publication/comment/delete';
import { CreateNewsProjectPayload } from '@models/payloads/project/news-project/create';
import { selectCommentList, selectPublicationBlackList, selectPublicationList } from '@store/selectors/publication.selectors';
import { breadCrumbs } from '@constants/bread-crumbs';

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

  publications$ = this.store.select(selectPublicationList);
  publicationsBlackList$ = this.store.select(selectPublicationBlackList);
  comments$ = this.store.select(selectCommentList);


  preventPublicationForm: FormGroup;
  notesForm: FormGroup;
  publicationForm: FormGroup;

  publicationControls: FormArray;
  preventPublicationControls: FormArray;
  notesControls: FormArray;

  publicationList = [];
  preventPublicationList = [];
  notesList = [];


  actionTypes = { publication: 'publication', preventPublication: 'preventPublication', note: 'note' };
  selectedContractor: Contractor;
  selectedContractor$: BehaviorSubject<Contractor> = new BehaviorSubject(null);
  contractors$ = this.store.select(selectContractorList);

  // start and end index
  startIndex = 1;
  endIndex = 10;

  constructor(
    private modalService: NgbModal,
    private store: Store<IAppState>,
    private contractorService: ContractorService,
    public formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.publications;
    this._fetchData();
    this.initForms();
  }

  public addPublication(): void {
    if (this.publicationForm.invalid) {
      return;
    }
    const data = { publish: this.publicationForm.controls.publish.value, contractor: this.selectedContractor.id };
    const payload = { data } as unknown as CreatePublishPayload;
    this.publish(payload);
    this.publicationForm.controls.publish.setValue(null);
  }

  public loadPublications(contractor: Contractor): void {
    const payload = { contractor: contractor.id };
    this.store.select(selectSelectedContractor).subscribe(this.handleSelectContractor.bind(this));
    this.store.select(selectPublicationList).subscribe(this.initPublicationControls.bind(this));
    this.store.dispatch(new GetPublications(payload));
    this.store.dispatch(new SelectContractor(contractor));
  }

  public loadPublicationBlackList(contractor: Contractor): void {
    const payload = { contractor: contractor.id };
    this.store.select(selectSelectedContractor).subscribe(this.handleSelectContractor.bind(this));
    this.store.select(selectPublicationBlackList).subscribe(this.initPreventPublicationControls.bind(this));
    this.store.dispatch(new GetPublicationBlackList(payload));
    this.store.dispatch(new SelectContractor(contractor));
  }

  public loadComments(contractor: Contractor): void {
    const payload = { contractor: contractor.id };
    this.store.select(selectSelectedContractor).subscribe(this.handleSelectContractor.bind(this));
    this.store.select(selectCommentList).subscribe(this.initNotesControls.bind(this));
    this.store.dispatch(new GetComments(payload));
    this.store.dispatch(new SelectContractor(contractor));
  }

  public addNotPublication(): void {
    if (this.preventPublicationForm.invalid) {
      return;
    }
    const data = { notPublish: this.preventPublicationForm.controls.notPublish.value, contractor: this.selectedContractor.id };
    const payload = { data } as unknown as CreateNotPublishPayload;
    this.preventPublish(payload);
    this.preventPublicationForm.controls.notPublish.setValue(null);
  }

  public addNote(): void {
    if (this.notesForm.invalid) {
      return;
    }
    const data = { comment: this.notesForm.controls.comment.value, contractor: this.selectedContractor.id };
    const payload = { data } as unknown as CreateCommentPayload;
    this.note(payload);
    this.notesForm.controls.comment.setValue(null);
  }

  public initForms(): void {
    this.initPublicationForm();
    this.initPreventPublicationForm();
    this.initNoteForm();
  }

  public initPublicationForm(): void {
    this.publicationForm = this.formBuilder.group({
      publish: [null, [Validators.required]]
    });
  }

  public initPreventPublicationForm(): void {
    this.preventPublicationForm = this.formBuilder.group({
      notPublish: [null, [Validators.required]]
    });
  }

  public initNoteForm(): void {
    this.notesForm = this.formBuilder.group({
      comment: [null, [Validators.required]]
    });
  }

  public initPublicationControls(list: Array<Publication> = []): void {
    if (!list) {
      return;
    }
    const toGroups = list.map((entity: Publication) => {
      return new FormGroup({
        publish: new FormControl(entity.publish, Validators.required)
      });
    });
    this.publicationControls = new FormArray(toGroups);
  }

  public handleSelectContractor(contractor: Contractor): void {
    if (!contractor) {
      return;
    }
    this.selectedContractor = contractor;
  }

  public initNotesControls(list: Array<Comment> = []): void {
    if (!list) {
      return;
    }
    const toGroups = list.map((entity: Comment) => {
      return new FormGroup({
        comment: new FormControl(entity.comment, Validators.required)
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

  public initPreventPublicationControls(list: Array<PublicationBlackList> = []): void {
    if (!list) {
      return;
    }
    const toGroups = list.map((entity: PublicationBlackList) => {
      return new FormGroup({
        notPublish: new FormControl(entity.notPublish, Validators.required)
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

  public publish(payload: CreatePublishPayload): void {
    this.store.dispatch(new CreatePublication(payload));
  }

  public preventPublish(payload: CreateNotPublishPayload): void {
    this.store.dispatch(new CreateNotPublication(payload));
  }

  public note(payload: CreateCommentPayload): void {
    this.store.dispatch(new CreateComment(payload));
  }

  public deletePublish(payload: DeletePublishPayload): void {
    this.store.dispatch(new DeletePublication(payload));
  }

  public deletePreventPublish(payload: DeleteNotPublishPayload): void {
    this.store.dispatch(new DeleteNotPublication(payload));
  }

  public deleteNote(payload: DeleteCommentPayload): void {
    this.store.dispatch(new DeleteComment(payload));
  }

  public updatePublish(payload: UpdatePublishPayload): void {
    this.store.dispatch(new UpdatePublication(payload));
  }

  public updatePreventPublish(payload: UpdateNotPublishPayload): void {
    this.store.dispatch(new UpdateNotPublication(payload));
  }

  public updateNote(payload: UpdateCommentPayload): void {
    this.store.dispatch(new UpdateComment(payload));
  }

  /**
   * Returns control for input or select in form (distribution step or preview if direct method)
   */
  public getControl(index: number, field: string, type: string): FormControl {
    let controls = null;
    const actions = this.actionTypes;
    switch (type) {
      case actions.publication:
        controls = this.publicationControls;
        break;
      case actions.preventPublication:
        controls = this.preventPublicationControls;
        break;
      case actions.note:
        controls = this.notesControls;
    }
    if (field && controls) {
      return controls.at(index).get(field) as FormControl;
    }
    return null;
  }

  public onDeletePublication(publication: Publication): void {
    this.deletePublish({ id: publication.id });
  }

  public onDeleteNotPublication(publication: PublicationBlackList): void {
    this.deletePreventPublish({ id: publication.id });
  }

  public onDeleteNote(comment: Comment): void {
    this.deleteNote({ id: comment.id });
  }

  public updateField(index: number, field: string, type: string, publication: Publication | PublicationBlackList | Comment): News[] {
    const control = this.getControl(index, field, type);
    const actions = this.actionTypes;
    if (control.valid) {
      let payload = null;
      switch (type) {
        case actions.publication:
          payload = { id: publication.id, data: { publish: control.value } };
          this.updatePublish(payload);
          break;
        case actions.preventPublication:
          payload = { id: publication.id, data: { notPublish: control.value } };
          this.updatePreventPublish(payload);
          break;
        case actions.note:
          payload = { id: publication.id, data: { comment: control.value } };
          this.updateNote(payload);
      }
    }
    return null;
  }


  /**
   * fetches the orders value
   */
  private _fetchData() {
    this.ordersData = ordersData;
    this.totalRecords = ordersData.length;
    this.selectedContractor$ = this.contractorService.selectedContractor$;
    this.store.dispatch(new GetContractors());
  }

}
