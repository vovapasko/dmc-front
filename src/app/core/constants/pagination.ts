import { Contractor } from '../models/instances/contractor';
import { User } from '../models/instances/user.models';
import { BehaviorSubject } from 'rxjs';

export const paginationPageSize = 10;
export const paginationStartIndex = 1;
export const paginationEndIndex = 10;
export const paginationTotalSize = 10;
export const paginationPage = 1;

export type PaginationType = Contractor | User;
