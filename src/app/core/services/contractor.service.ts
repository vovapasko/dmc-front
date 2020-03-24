import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {User} from '../models/instances/user.models';
import {HomeResponse} from '../models/responses/user/homeResponse';
import {NotificationService} from './notification.service';
import {Contractor} from '../models/instances/contractor';
import {DeleteContractorResponse} from '../models/responses/contractor/deleteContractorResponse';
import {UpdateContractorResponse} from '../models/responses/contractor/updateContractorResponse';
import {CreateContractorResponse} from '../models/responses/contractor/createContractorResponse';
import {GetAllContractorsResponse} from '../models/responses/contractor/getAllContractorsResponse';

const api = environment.api;

@Injectable({providedIn: 'root'})
export class ContractorService {
    constructor(private http: HttpClient, private notificationService: NotificationService) {
    }

    /**
     *  Get all users, api returns array of users
     */
    getAll(): Observable<Contractor[]> {
        return this.http
            .get(`${api}/contractor/`)
            .pipe(
                map(
                    (response: GetAllContractorsResponse ) => response.data
                )
            );
    }

    /**
     *  Get user by id, api returns single user instance
     */
    getById(id: string): Observable<User> {
        return this.http.get<User>(`${api}/contractor/${id}`);
    }

    /**
     *  Create contractor, api returns single contractor instance
     */
    create(payload): Observable<Contractor> {
        return this.http
            .post(`${api}/contractor/`, payload.data)
            .pipe(
                map(
                    (response: CreateContractorResponse) => {
                        // notify success
                        this.notifySuccess(response);

                        // returns created contractor
                        return response.contractor;
                    }
                )
            );
    }

    /**
     *  Update contractor by id, api returns single contractor instance
     */
    update(payload): Observable<Contractor> {
        return this.http
            .put(`${api}/contractor/${payload.id}`, payload.data)
            .pipe(
                map(
                    (response: UpdateContractorResponse) => {
                        // notify success
                        this.notifySuccess(response);

                        // returns created contractor
                        return response.contractor;
                    }
                )
            );
    }

    /**
     *  Delete contractor by id, api returns status
     */
    delete(payload): Observable<boolean> {
        return this.http
            .delete(`${api}/contractor/${payload.id}`)
            .pipe(
                map(
                    (response: DeleteContractorResponse) => this.handleResponse(response)
                )
            );
    }

    /**
     *  Handle successful response
     */
    private handleResponse(response) {
        // notify about success
        this.notifySuccess(response);

        // returns successful
        return response.success;
    }

    /**
     *  Notify user about successful response
     */
    private notifySuccess(response) {
        if (response.success) {
            return this.notificationService.success('Successful', response.message.message);
        }
        return null;
    }
}
