import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

import {ServerResponse} from '../models/responses/serverResponse';
import {ResponseHandler} from './response-handler';
import {ErrorHandler} from './error-handler';
import {ConvertCase} from './convert-case';
import {LoginPayload} from '../models/payloads/auth/login';
import {CreateContractorPayload} from '../models/payloads/contractor/create';
import {DeleteContractorPayload} from '../models/payloads/contractor/delete';
import {UpdateContractorPayload} from '../models/payloads/contractor/update';
import {ConfirmResetPasswordPayload} from '../models/payloads/user/confirmResetPassword';
import {RegisterPayload} from '../models/payloads/user/register';
import {SignupPayload} from '../models/payloads/user/signup';
import {UpdateProfilePayload} from '../models/payloads/user/updateProfile';

@Injectable({
    providedIn: 'root'
})
export class RequestHandler {
    constructor(
        private http: HttpClient,
        private responseHandler: ResponseHandler,
        private errorHandler: ErrorHandler,
        private convertCase: ConvertCase
    ) {
    }

    processPayload(payload) {
        if (!payload) {
            return {};
        }
        if (payload && 'data' in payload && payload.data instanceof FormData) {
            return payload.data;
        }
        return this.convertCase.convertFromCamelToSnakeCase(payload.data);
    }

    request(
        url,
        method,
        payload?: LoginPayload
            | CreateContractorPayload
            | DeleteContractorPayload
            | UpdateContractorPayload
            | ConfirmResetPasswordPayload
            | RegisterPayload
            | SignupPayload
            | UpdateProfilePayload,
        mapHandler = (res) => {
        }
    ) {

        return this.http[method](
            url,
            this.processPayload(payload)
        )
            .pipe(
                tap(
                    (response: ServerResponse) => this.responseHandler.handle(response)
                ),
                map(
                    (response: ServerResponse) => {
                        const convertedCaseResponse = this.convertCase.convertFromSnakeToCamelCase(response);
                        return mapHandler(convertedCaseResponse);
                    },
                    error => this.errorHandler.handle(error)
                )
            );
    }
}
