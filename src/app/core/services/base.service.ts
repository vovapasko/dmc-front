import { Injectable } from '@angular/core';
import { stringType } from '@constants/formula';
import { separators } from '@constants/separators';
import snakeCase from 'lodash.snakecase';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor() {
  }

  public url(api: string, endpoint: string, id: number | string = null, params: object = {}): string {
    let url = `${api}/${endpoint}/`;
    const keys = params && Object.keys(params);
    if (Number.isInteger(id) || typeof id === stringType) {
      url += id;
    }
    if (keys && keys.length) {
      url += separators.questionMark;
      keys.forEach(key => url += `${snakeCase(key)}=${params[key]}${separators.ampersand}`);
    }
    return url;
  }
}
