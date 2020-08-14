import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CardData, TableData } from '@models/instances/tickets.model';
import { Observable } from 'rxjs';
import { SortEvent, TicketsSortableDirective } from '@shared/directives/tickets-sortable.directive';
import { TicketService } from '@services/ticket.service';
import { FormGroup } from '@angular/forms';
import { ClientService } from '@services/client.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAppState } from '@store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectClientList } from '@store/selectors/client.selectors';
import { CreateClient, GetClients } from '@store/actions/client.actions';
import { CreateClientPayload } from '@models/payloads/client/create';
import { breadCrumbs } from '@constants/bread-crumbs';
import { selectHashtags } from '@store/selectors/news.selectors';
import { selectEmailsList } from '@store/selectors/project.selectors';
import { GetEmails } from '@store/actions/project.actions';
import { GetProjectConfiguration } from '@store/actions/news.actions';

@Component({
  selector: 'app-client',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  submitted = false;
  cardData: CardData[];
  createClientForm: FormGroup;
  tickets$: Observable<TableData[]>;
  hashtags$ = this.store.pipe(select(selectHashtags));
  emails$ = this.store.pipe(select(selectEmailsList));
  total$: Observable<number>;

  @ViewChildren(TicketsSortableDirective) headers: QueryList<TicketsSortableDirective>;

  constructor(
    public service: TicketService,
    private proxyService: ClientService,
    private modalService: NgbModal,
    private store: Store<IAppState>
  ) {
    this.service.records$ = this.proxyService.clients$;
    this.tickets$ = service.tickets$;
    this.total$ = service.total$;
  }

  ngOnInit() {
    this.breadCrumbItems = breadCrumbs.proxies;
    this.initForm();
    this._fetchData();
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
    this.add({ data: [data] });
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
   * Modal Open
   * @param content modal content
   */
  public openModal(content: string): void {
    this.modalService.open(content, { centered: true });
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
  public initForm(): void {
    this.createClientForm = this.proxyService.initializeCreateClientForm();
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
    this.store.dispatch(new GetClients());
    this.store.dispatch(new GetEmails());
    this.store.dispatch(new GetProjectConfiguration());
  }
}
