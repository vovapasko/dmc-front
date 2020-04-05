import {Inject, Injectable} from '@angular/core';
import {Contractor} from '../models/instances/contractor';
import {User} from '../models/instances/user.models';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    // page number
    page = 1;
    // default page size
    pageSize = 10;
    data: Array<any> = [];
    // start and end index
    startIndex = 1;
    endIndex = 10;
    totalSize = 0;
    paginatedData$: BehaviorSubject<Array<any>>;

    set records(records: Array<any>) {
        this.data = records;
    }

    get paginatedData() {
        return this.paginatedData$.getValue();
    }

    /**
     * Pagination onpage change
     * @param page show the page
     */
    public onPageChange(page: number): void {
        const {pageSize, data} = this;
        const startIndex = (page - 1) * pageSize;
        const endIndex = (page - 1) * pageSize + pageSize;
        const paginatedData = data.slice(startIndex, endIndex);

        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.paginatedData$.next(paginatedData);
    }

    /**
     * Apply pagination
     */
    public applyPagination() {
        const {pageSize, data} = this;
        const startIndex = 0;
        const endIndex = pageSize;
        const totalSize = data.length;
        const paginatedData = data.slice(startIndex, endIndex);

        // apply pagination
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.totalSize = totalSize;
        this.paginatedData$.next(paginatedData);
    }
}
