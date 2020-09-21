import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { ServerResponse } from '@models/responses/server/response';
import { ResponseHandler } from './response-handler';
import { ErrorHandler } from './error-handler';
import { ConvertCase } from './convert-case';
import { Payloads } from '@models/payloads/payload';
import { dataTitle } from '@constants/data';

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
    private convertCase: ConvertCase
  ) {
  }

  processPayload(payload) {
    if (!payload) {
      return {};
    }
    if (payload && dataTitle in payload && payload.data instanceof FormData) {
      return payload.data;
    }
    return this.convertCase.convertFromCamelToSnakeCase(payload.data);
  }

  request(url, method, payload?: Payloads, mapHandler = (_) => {
  }) {
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
