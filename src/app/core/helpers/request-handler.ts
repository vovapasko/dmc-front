import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ServerResponse } from '@models/responses/server/response';
import { ResponseHandler } from './response-handler';
import { ErrorHandler } from './error-handler';
import { ConvertCase } from './convert-case';
import { Payloads } from '@models/payloads/payload';
import { dataTitle } from '@constants/data';
import { Observable } from 'rxjs';
import { ConvertToFormData } from '@helpers/convert-to-form-data';

/**
 * This service handle request from clients, process and send to server
 */

@Injectable({
  providedIn: 'root'
})
export class RequestHandler {
  constructor(
    private http: HttpClient,
    private responseHandler: ResponseHandler,
    private errorHandler: ErrorHandler,
    private convertCase: ConvertCase,
    private convertToFormDataService: ConvertToFormData
  ) {
  }

  /**
   * Converts to snake_case, pass form data.
   */
  public processPayload(payload: Payloads | { data: object | FormData }) {
    if (!payload) {
      return {};
    }
    // @ts-ignore
    if (payload && dataTitle in payload && payload.data instanceof FormData) {
      // @ts-ignore
      return payload.data;
    }
    // @ts-ignore
    return this.convertCase.convertFromCamelToSnakeCase(payload.data);
  }

  /**
   * Converts to snake_case, pass form data.
   */
  public request(url, method, payload?: Payloads, mapHandler = (_) => {
  }): Observable<any> {
    return this.http[method](url, this.processPayload(payload))
      .pipe(
        tap((response: ServerResponse) => this.responseHandler.handle(response)),
        map(
          (response: ServerResponse) => {
            const convertedCaseResponse = this.convertCase.convertFromSnakeToCamelCase(response);
            return mapHandler(convertedCaseResponse);
          }
        )
      );
  }
}
