import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  paginationEndIndex,
  paginationPage,
  paginationPageSize,
  paginationStartIndex,
  paginationTotalSize, PaginationType
} from '@constants/pagination';

/**
 * This service for pagination any data
 */

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  page$: BehaviorSubject<number> = new BehaviorSubject<number>(paginationPage);
  pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(paginationPageSize);
  startIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(paginationStartIndex);
  endIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(paginationEndIndex);
  totalSize$: BehaviorSubject<number> = new BehaviorSubject<number>(paginationTotalSize);

  totalRecords$: BehaviorSubject<PaginationType[]> = new BehaviorSubject<PaginationType[]>([]);
  paginatedData$: BehaviorSubject<PaginationType[]> = new BehaviorSubject<PaginationType[]>([]);

  constructor() {}

  get page() {
    return this.page$.getValue();
  }

  set page(value: number) {
    this.page$.next(value);
  }

  get pageSize() {
    return this.pageSize$.getValue();
  }

  set pageSize(value: number) {
    this.pageSize$.next(value);
  }

  get startIndex() {
    return this.startIndex$.getValue();
  }

  set startIndex(value: number) {
    this.startIndex$.next(value);
  }

  get endIndex() {
    return this.endIndex$.getValue();
  }

  set endIndex(value: number) {
    this.endIndex$.next(value);
  }

  get totalSize() {
    return this.totalSize$.getValue();
  }

  set totalSize(value: number) {
    this.totalSize$.next(value);
  }

  set totalRecords(records: PaginationType[]) {
    this.totalRecords$.next(records);
  }

  get totalRecords() {
    return this.totalRecords$.getValue();
  }

  get paginatedData() {
    return this.paginatedData$.getValue();
  }

  set paginatedData(value: PaginationType[]) {
    this.paginatedData$.next(value);
  }
}
