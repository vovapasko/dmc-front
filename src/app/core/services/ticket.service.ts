import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { TableData } from '@models/instances/tickets.model';

import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import { SortDirection } from '@shared/directives/tickets-sortable.directive';

import { SearchResult } from '@models/instances/tickets.model';
import { Hashtag } from '@models/instances/hashtag';

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
  startIndex: number;
  endIndex: number;
  totalRecords: number;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}


/**
 * Sort the table data
 * @param tickets Table field value
 * @param column Fetch the column
 * @param direction Sort direction Ascending or Descending
 */

function sort(tickets: TableData[], column: string, direction: string): TableData[] {
  if (direction === '') {
    return tickets;
  } else {
    return [...tickets].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

/**
 * Table Data Match with Search input
 * @param ticket Table field value fetch
 * @param term Search the value
 */
export function clientMatches(ticket: TableData, term: string) {
  return ticket.price.toString().toLowerCase().includes(term)
    || ticket.emails.toLowerCase().includes(term)
    || ticket.numbers.toLowerCase().includes(term)
    || ticket.amountPublications === +term
    || ticket.name.toLowerCase().includes(term)
    || ticket.id === +term;
}

export function hashtagMatches(ticket: Hashtag, term: string) {
  return ticket.name.toString().toLowerCase().includes(term);
}

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  // tslint:disable-next-line: variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line: variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line: variable-name
  private _tickets$ = new BehaviorSubject<TableData[]>([]);
  public records$ = new BehaviorSubject([]);
  // tslint:disable-next-line: variable-name
  private _total$ = new BehaviorSubject<number>(0);
  // tslint:disable-next-line: variable-name
  private _matches = clientMatches;

  // tslint:disable-next-line: variable-name
  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
    startIndex: 1,
    endIndex: 10,
    totalRecords: 0
  };

  constructor() {
    // TODO REFACTOR THIS PIECE OF CODE
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._tickets$.next(result.tickets);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get tickets$() {
    return this._tickets$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get page() {
    return this._state.page;
  }

  get pageSize() {
    return this._state.pageSize;
  }

  get searchTerm() {
    return this._state.searchTerm;
  }

  get startIndex() {
    return this._state.startIndex;
  }

  get endIndex() {
    return this._state.endIndex;
  }

  get totalRecords() {
    return this._state.totalRecords;
  }

  set matches(func: (ticket: TableData | Hashtag, term: string) => boolean) {
    this._matches = func;
  }

  get matches(): (ticket: TableData  | Hashtag, term: string) => boolean {
    return this._matches;
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set page(page: number) {
    this._set({ page });
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set startIndex(startIndex: number) {
    this._set({ startIndex });
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set endIndex(endIndex: number) {
    this._set({ endIndex });
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set totalRecords(totalRecords: number) {
    this._set({ totalRecords });
  }

  // tslint:disable-next-line: adjacent-overload-signatures
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }

  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }

  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  /**
   * Search Method
   */
  private _search(): Observable<SearchResult> {

    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
    const records = this.records$.getValue();

    // 1. sort
    let tickets = sort(records, sortColumn, sortDirection);

    // 2. filter
    tickets = tickets.filter(ticket => this.matches(ticket, searchTerm));
    const total = tickets.length;

    // 3. paginate
    this.totalRecords = tickets.length;
    this._state.startIndex = (page - 1) * this.pageSize + 1;
    this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
    if (this.endIndex > this.totalRecords) {
      this.endIndex = this.totalRecords;
    }
    tickets = tickets.slice(this._state.startIndex - 1, this._state.endIndex);

    return of({ tickets, total });
  }
}
