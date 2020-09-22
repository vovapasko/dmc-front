import { Injectable } from '@angular/core';
import { endpoints } from '@constants/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor() {
  }

  public url(api: string, endpoint: string, params: object = {}): string {
    let url = `${api}/${endpoint}/`;
    const keys = params && Object.keys(params);
    if (keys && keys.length) {
      keys.forEach(key => url += `?${key}=${params[key]}`);
    }
    return url;
  }
}
