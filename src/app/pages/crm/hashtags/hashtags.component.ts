import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TableData } from '@models/instances/tickets.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortEvent, TicketsSortableDirective } from '@shared/directives/tickets-sortable.directive';
import { hashtagMatches, TicketService } from '@services/ticket.service';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAppState } from '@store/state/app.state';
import { select, Store } from '@ngrx/store';
import { breadCrumbs } from '@constants/bread-crumbs';
import { setValues } from '@helpers/utility';
import { hashtagsTitle } from '@constants/titles';
import { Title } from '@angular/platform-browser';
import { selectHashtagList } from '@store/selectors/hashtag.selectors';
import { HashtagService } from '@services/hashtag.service';
import { Hashtag } from '@models/instances/hashtag';
import { CreateHashtag, DeleteHashtag, GetHashtags, SelectHashtag, UpdateHashtag } from '@store/actions/hashtag.actions';
import { CreateHashtagPayload } from '@models/payloads/news/hashtag/create';
import { UpdateHashtagPayload } from '@models/payloads/news/hashtag/update';
import { selectLoading } from '@store/selectors/loading.selectors';
import { PaginationService } from '@services/pagination.service';
import { paginationTotalSize } from '@constants/pagination';
import { GetContractors } from '@store/actions/contractor.actions';
import numbers from '@constants/numbers';

@Component({
  selector: 'app-hashtags',
  templateUrl: './hashtags.component.html',
  styleUrls: ['./hashtags.component.scss']
})
export class HashtagsComponent implements OnInit {
  title = hashtagsTitle;
  breadCrumbItems: Array<{}>;
  submitted = false;
  createHashtagForm: FormGroup;
  updateHashtagForm: FormGroup;
  tickets$: Observable<TableData[]>;
  hashtags$ = this.store.pipe(select(selectHashtagList));
  total$: Observable<number>;
  totalSize$: BehaviorSubject<number> = new BehaviorSubject<number>(paginationTotalSize);
  page$: BehaviorSubject<number> = new BehaviorSubject(1);
  pageSize$: BehaviorSubject<number> = new BehaviorSubject(10);
  loading$ = this.store.select(selectLoading);

  @ViewChildren(TicketsSortableDirective) headers: QueryList<TicketsSortableDirective>;

  constructor(
    public service: TicketService,
    private modalService: NgbModal,
    private hashtagService: HashtagService,
    private paginationService: PaginationService,
    private store: Store<IAppState>,
    private titleService: Title
  ) {
    this.service.matches = hashtagMatches;
    this.service.records$ = this.hashtagService.hashtags$;
    this.tickets$ = service.tickets$;
    this.total$ = service.total$;

    this.totalSize$ = this.paginationService.totalSize$;
    this.page$ = this.paginationService.page$;
    this.pageSize$ = this.paginationService.pageSize$;
  }

  ngOnInit() {
    this.breadCrumbItems = breadCrumbs.hashtags;
    this.initForms();
    this.setTitle(this.title);
    this._fetchData();
  }

  /**
   * Set page title
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  /**
   * Set controllers to create hashtags form
   */
  public addHashtag(): void {
    this.submitted = true;
    if (this.createHashtagForm.invalid) {
      return;
    }
    const data = this.createHashtagForm.value;
    this.add({ data });
    this.modalService.dismissAll();
    this.submitted = false;
  }

  public selectHashtag(hashtag: Hashtag): void {
    this.store.dispatch(new SelectHashtag(hashtag));
    setValues(this.updateHashtagForm.controls, hashtag);
  }

  /**
   * Set controllers to create hashtags form
   */
  public updateHashtag(): void {
    this.submitted = true;
    if (this.updateHashtagForm.invalid) {
      return;
    }
    const id = this.hashtagService.selectedHashtag.id;
    const data = this.updateHashtagForm.value;
    this.update({ data, id });
    this.modalService.dismissAll();
    this.submitted = false;
  }

  /**
   * Dispatch create new hashtags
   */
  public add(payload: CreateHashtagPayload): void {
    this.store.dispatch(new CreateHashtag(payload));
  }

  /**
   * Dispatch update hashtag
   */
  public update(payload: UpdateHashtagPayload): void {
    this.store.dispatch(new UpdateHashtag(payload));
  }

  /**
   * Modal Open
   * @param content modal content
   */
  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
  }


  public delete(hashtag: Hashtag): void {
    this.store.dispatch(new DeleteHashtag({ id: hashtag.id, data: {isArchived: true} }));
  }

  /**
   * Get controls form create hashtags form
   */
  get f() {
    return this.createHashtagForm.controls;
  }

  /**
   * Set controllers to create hashtags form
   */
  public initCreateHashtagForm(): void {
    this.createHashtagForm = this.hashtagService.initializeCreateHashtagForm();
  }

  /**
   * Set controllers to update hashtags form
   */
  public initUpdateHashtagForm(): void {
    this.updateHashtagForm = this.hashtagService.initializeUpdateHashtagForm();
  }

  /**
   * Set controllers to forms
   */
  public initForms(): void {
    this.initCreateHashtagForm();
    this.initUpdateHashtagForm();
  }

  /**
   * Sort table data
   * @param param0 fetch the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

  /**
   * Handle on page click event
   */
  public onPageChange(page: any): void {
    const payload = { page };
    this.store.dispatch(new GetHashtags(payload));
  }

  /**
   * Dispatch getting data
   */
  public _fetchData() {
    const payload = { page: numbers.one };
    this.store.dispatch(new GetHashtags(payload));
  }
}
