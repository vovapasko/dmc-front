import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { TableData } from '@models/instances/tickets.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortEvent, TicketsSortableDirective } from '@shared/directives/tickets-sortable.directive';
import { TicketService } from '@services/ticket.service';
import { FormGroup } from '@angular/forms';
import { ClientService } from '@services/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAppState } from '@store/state/app.state';
import { select, Store } from '@ngrx/store';
import { CreateClient, DeleteClient, GetClients, SelectClient, UpdateClient } from '@store/actions/client.actions';
import { CreateClientPayload } from '@models/payloads/client/create';
import { breadCrumbs } from '@constants/bread-crumbs';
import { selectHashtags } from '@store/selectors/news.selectors';
import { selectEmailsList } from '@store/selectors/project.selectors';
import { GetEmails } from '@store/actions/project.actions';
import { GetProjectConfiguration } from '@store/actions/news.actions';
import { UpdateClientPayload } from '@models/payloads/client/update';
import { Client } from '@models/instances/client';
import { setValues } from '@helpers/utility';
import { clientsTitle } from '@constants/titles';
import { Title } from '@angular/platform-browser';
import numbers from '@constants/numbers';
import { GetHashtags } from '@store/actions/hashtag.actions';
import { paginationTotalSize } from '@constants/pagination';
import { PaginationService } from '@services/pagination.service';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  title = clientsTitle;
  breadCrumbItems: Array<{}>;
  submitted = false;
  createClientForm: FormGroup;
  updateClientForm: FormGroup;
  tickets$: Observable<TableData[]>;
  hashtags$ = this.store.pipe(select(selectHashtags));
  emails$ = this.store.pipe(select(selectEmailsList));
  total$: Observable<number>;
  totalSize$: BehaviorSubject<number> = new BehaviorSubject<number>(paginationTotalSize);
  page$: BehaviorSubject<number> = new BehaviorSubject(1);
  pageSize$: BehaviorSubject<number> = new BehaviorSubject(10);
  @ViewChildren(TicketsSortableDirective) headers: QueryList<TicketsSortableDirective>;

  constructor(
    public service: TicketService,
    private paginationService: PaginationService,
    private clientService: ClientService,
    private modalService: NgbModal,
    private store: Store<IAppState>,
    private titleService: Title
  ) {
    this.service.records$ = this.clientService.clients$;
    this.tickets$ = service.tickets$;
    this.total$ = service.total$;
    this.totalSize$ = this.paginationService.totalSize$;
    this.page$ = this.paginationService.page$;
    this.pageSize$ = this.paginationService.pageSize$;
  }

  ngOnInit() {
    this.breadCrumbItems = breadCrumbs.clients;
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
   * Set controllers to create clients form
   */
  public addClient(): void {
    this.submitted = true;
    if (this.createClientForm.invalid) {
      return;
    }
    const data = this.createClientForm.value;
    this.add({ data });
    this.modalService.dismissAll();
    this.submitted = false;
  }

  public selectClient(client: Client): void {
    this.store.dispatch(new SelectClient(client));
    setValues(this.updateClientForm.controls, client);
  }

  /**
   * Set controllers to create clients form
   */
  public updateClient(): void {
    this.submitted = true;
    if (this.updateClientForm.invalid) {
      return;
    }
    const id = this.clientService.selectedClient.id;
    const data = this.updateClientForm.value;
    this.update({ data, id });
    this.modalService.dismissAll();
    this.submitted = false;
  }

  /**
   * Dispatch create new clients
   */
  public add(payload: CreateClientPayload): void {
    this.store.dispatch(new CreateClient(payload));
  }

  /**
   * Dispatch update client
   */
  public update(payload: UpdateClientPayload): void {
    this.store.dispatch(new UpdateClient(payload));
  }

  /**
   * Modal Open
   * @param content modal content
   */
  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
  }


  /**
   * Handle on page click event
   */
  public onPageChange(page: any): void {
    const payload = { page };
    this.store.dispatch(new GetClients(payload));
  }

  public delete(client: Client): void {
    this.store.dispatch(new DeleteClient({ id: client.id, data: { isArchived: true } }));
  }

  /**
   * Get controls form create clients form
   */
  get f() {
    return this.createClientForm.controls;
  }

  /**
   * Set controllers to create clients form
   */
  public initCreateClientForm(): void {
    this.createClientForm = this.clientService.initializeCreateClientForm();
  }

  /**
   * Set controllers to update clients form
   */
  public initUpdateClientForm(): void {
    this.updateClientForm = this.clientService.initializeUpdateClientForm();
  }

  /**
   * Set controllers to forms
   */
  public initForms(): void {
    this.initCreateClientForm();
    this.initUpdateClientForm();
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
   * Dispatch getting data
   */
  public _fetchData() {
    const payload = { page: numbers.one };
    this.store.dispatch(new GetClients(payload));
    this.store.dispatch(new GetEmails());
    this.store.dispatch(new GetProjectConfiguration());
  }
}
