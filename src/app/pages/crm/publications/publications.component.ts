import { Component, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Publication } from '@models/instances/publication';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GetContractors, SelectContractor } from '@store/actions/contractor.actions';
import { Store } from '@ngrx/store';
import { IAppState } from '@store/state/app.state';
import { selectContractorList, selectSelectedContractor } from '@store/selectors/contractor.selectors';
import { BehaviorSubject } from 'rxjs';
import { Contractor } from '@models/instances/contractor';
import { Comment } from '@models/instances/comment';
import { PublicationBlackList } from '@models/instances/publication-black-list';
import { News } from '@models/instances/news';
import { ContractorService } from '@services/contractor.service';
import { CreatePublishPayload } from '@models/payloads/publication/publish/create';
import { CreatePublicationBlackListPayload } from '@models/payloads/publication/notPublish/create';
import { CreateCommentPayload } from '@models/payloads/publication/comment/create';
import { UpdatePublishPayload } from '@models/payloads/publication/publish/update';
import { UpdatePublicationBlackListPayload } from '@models/payloads/publication/notPublish/update';
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
import { DeletePublicationBlackListPayload } from '@models/payloads/publication/notPublish/delete';
import { DeleteCommentPayload } from '@models/payloads/publication/comment/delete';
import { selectCommentList, selectPublicationBlackList, selectPublicationList } from '@store/selectors/publication.selectors';
import { breadCrumbs } from '@constants/bread-crumbs';
import { publicationActionTypes } from '@constants/actions';
import { PublicationService } from '@services/publication.service';
import { Title } from '@angular/platform-browser';
import { publicationTitle } from '@constants/titles';
import { selectLoading } from '@store/selectors/loading.selectors';

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
  title = publicationTitle;
  breadCrumbItems: Array<{}>;
  term: any;
  // page number
  page = 1;
  // default page size
  pageSize = 10;
  // total number of records
  totalRecords = 0;
  loading$ = this.store.select(selectLoading);

  publications$ = this.store.select(selectPublicationList);
  publicationsBlackList$ = this.store.select(selectPublicationBlackList);
  comments$ = this.store.select(selectCommentList);


  publicationBlackListForm: FormGroup;
  commentForm: FormGroup;
  publicationForm: FormGroup;

  publicationControls: FormArray;
  publicationBlackListControls: FormArray;
  commentControls: FormArray;

  actionTypes = publicationActionTypes;
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
    public formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private titleService: Title
  ) {
  }

  ngOnInit() {
    // tslint:disable-next-line: max-line-length
    this.breadCrumbItems = breadCrumbs.publications;
    this._fetchData();
    this.initForms();
    this.setTitle(this.title);
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Dispatch add publication
   */
  public addPublication(): void {
    if (this.publicationForm.invalid) {
      return;
    }
    const data = { publish: this.publicationForm.controls.publish.value, contractor: this.selectedContractor.id };
    const payload = { data } as unknown as CreatePublishPayload;
    this.publish(payload);
    this.publicationForm.controls.publish.setValue(null);
  }

  /**
   * Dispatch loading publications
   */
  public loadPublications(contractor: Contractor): void {
    const payload = { contractor: contractor.id };
    this.store.select(selectSelectedContractor).subscribe(this.handleSelectContractor.bind(this));
    this.store.select(selectPublicationList).subscribe(this.initPublicationControls.bind(this));
    this.store.dispatch(new GetPublications(payload));
    this.store.dispatch(new SelectContractor(contractor));
  }

  /**
   * Dispatch loading publications black list
   */
  public loadPublicationBlackList(contractor: Contractor): void {
    const payload = { contractor: contractor.id };
    this.store.select(selectSelectedContractor).subscribe(this.handleSelectContractor.bind(this));
    this.store.select(selectPublicationBlackList).subscribe(this.initPreventPublicationControls.bind(this));
    this.store.dispatch(new GetPublicationBlackList(payload));
    this.store.dispatch(new SelectContractor(contractor));
  }

  /**
   * Dispatch loading comments
   */
  public loadComments(contractor: Contractor): void {
    const payload = { contractor: contractor.id };
    this.store.select(selectSelectedContractor).subscribe(this.handleSelectContractor.bind(this));
    this.store.select(selectCommentList).subscribe(this.initCommentControls.bind(this));
    this.store.dispatch(new GetComments(payload));
    this.store.dispatch(new SelectContractor(contractor));
  }

  /**
   * Dispatch add new publication
   */
  public addPublicationBlackList(): void {
    if (this.publicationBlackListForm.invalid) {
      return;
    }
    const data = { notPublish: this.publicationBlackListForm.controls.notPublish.value, contractor: this.selectedContractor.id };
    const payload = { data } as unknown as CreatePublicationBlackListPayload;
    this.preventPublish(payload);
    this.publicationBlackListForm.controls.notPublish.setValue(null);
  }

  /**
   * Dispatch add comment
   */
  public addComment(): void {
    if (this.commentForm.invalid) {
      return;
    }
    const data = { comment: this.commentForm.controls.comment.value, contractor: this.selectedContractor.id };
    const payload = { data } as unknown as CreateCommentPayload;
    this.comment(payload);
    this.commentForm.controls.comment.setValue(null);
  }

  /**
   * Init forms
   */
  public initForms(): void {
    this.initPublicationForm();
    this.initPublicationBlackListForm();
    this.initCommentForm();
  }

  /**
   * Init publication form
   */
  public initPublicationForm(): void {
    this.publicationForm = this.formBuilder.group({
      publish: [null, [Validators.required]]
    });
  }

  /**
   * Init publication blacklist controls
   */
  public initPublicationBlackListForm(): void {
    this.publicationBlackListForm = this.formBuilder.group({
      notPublish: [null, [Validators.required]]
    });
  }

  /**
   * Init comment form
   */
  public initCommentForm(): void {
    this.commentForm = this.formBuilder.group({
      comment: [null, [Validators.required]]
    });
  }

  /**
   * Set publication controls
   */
  public initPublicationControls(list: Array<Publication> = []): void {
    const controls = this.publicationService.initPublicationControls(list);
    if (!controls) {
      return;
    }
    this.publicationControls = controls;
  }

  /**
   * Handle selecting contractor
   */
  public handleSelectContractor(contractor: Contractor): void {
    if (!contractor) {
      return;
    }
    this.selectedContractor = contractor;
  }


  /**
   * Set controls for publication black list form
   */
  public initCommentControls(list: Array<Comment> = []): void {
    const controls = this.publicationService.initCommentControls(list);
    if (!controls) {
      return;
    }
    this.commentControls = controls;
  }


  /**
   * Modal Open
   * @param content modal content
   */
  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
  }

  /**
   * Set controls for publication black list form
   */
  public initPreventPublicationControls(list: Array<PublicationBlackList> = []): void {
    const controls = this.publicationService.initPreventPublicationControls(list);
    if (!controls) {
      return;
    }
    this.publicationBlackListControls = controls;
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
  }

  /**
   * Dispatch publish
   */
  public publish(payload: CreatePublishPayload): void {
    this.store.dispatch(new CreatePublication(payload));
  }

  /**
   * Dispatch publish black list
   */
  public preventPublish(payload: CreatePublicationBlackListPayload): void {
    this.store.dispatch(new CreateNotPublication(payload));
  }

  /**
   * Dispatch comment
   */
  public comment(payload: CreateCommentPayload): void {
    this.store.dispatch(new CreateComment(payload));
  }

  /**
   * Dispatch delete publish
   */
  public deletePublish(payload: DeletePublishPayload): void {
    this.store.dispatch(new DeletePublication(payload));
  }

  /**
   * Dispatch delete publication black list
   */
  public deletePublicationBlackList(payload: DeletePublicationBlackListPayload): void {
    this.store.dispatch(new DeleteNotPublication(payload));
  }

  /**
   * Dispatch delete comment
   */
  public deleteComment(payload: DeleteCommentPayload): void {
    this.store.dispatch(new DeleteComment(payload));
  }

  /**
   * Dispatch update publication
   */
  public updatePublish(payload: UpdatePublishPayload): void {
    this.store.dispatch(new UpdatePublication(payload));
  }

  /**
   * Dispatch update publication black list
   */
  public updatePublicationBlackList(payload: UpdatePublicationBlackListPayload): void {
    this.store.dispatch(new UpdateNotPublication(payload));
  }

  /**
   * Dispatch update comment
   */
  public updateComment(payload: UpdateCommentPayload): void {
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
        controls = this.publicationBlackListControls;
        break;
      case actions.note:
        controls = this.commentControls;
    }
    if (field && controls) {
      return controls.at(index).get(field) as FormControl;
    }
    return null;
  }

  /**
   * Handle delete publication
   */
  public onDeletePublication(publication: Publication): void {
    this.deletePublish({ id: publication.id, contractor: publication.contractor });
  }

  /**
   * Dispatch delete publication black list
   */
  public onDeletePublicationBlackList(publication: PublicationBlackList): void {
    this.deletePublicationBlackList({ id: publication.id });
  }

  /**
   * fetches the orders value
   */
  public onDeleteComment(comment: Comment): void {
    this.deleteComment({ id: comment.id });
  }

  /**
   * Update field (publication, comment, publication blacklist)
   */
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
          this.updatePublicationBlackList(payload);
          break;
        case actions.note:
          payload = { id: publication.id, data: { comment: control.value } };
          this.updateComment(payload);
      }
    }
    return null;
  }


  /**
   * fetches the orders value
   */
  private _fetchData() {
    this.selectedContractor$ = this.contractorService.selectedContractor$;
    this.store.dispatch(new GetContractors());
  }

}
