import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    page$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    pageSize$: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    startIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
    endIndex$: BehaviorSubject<number> = new BehaviorSubject<number>(10);
    totalSize$: BehaviorSubject<number> = new BehaviorSubject<number>(10);

    totalRecords$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
    paginatedData$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

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

    set totalRecords(records: Array<any>) {
        this.totalRecords$.next(records);
    }

    get totalRecords() {
        return this.totalRecords$.getValue();
    }

    get paginatedData() {
        return this.paginatedData$.getValue();
    }

    /**
     * Pagination onpage change
     * @param page show the page
     */
    public onPageChange(page: number): void {
        const {pageSize, totalRecords} = this;
        const startIndex = (page - 1) * pageSize;
        const endIndex = (page - 1) * pageSize + pageSize;
        const paginatedData = totalRecords.slice(startIndex, endIndex);

        this.page = page;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.paginatedData$.next(paginatedData);
    }

    /**
     * Apply pagination
     */
    public applyPagination() {
        const {pageSize, totalRecords} = this;
        const startIndex = 0;
        const endIndex = pageSize;
        const totalSize = totalRecords.length;
        const paginatedData = totalRecords.slice(startIndex, endIndex);

        // apply pagination
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.totalSize = totalSize;
        this.paginatedData$.next(paginatedData);
    }
}
