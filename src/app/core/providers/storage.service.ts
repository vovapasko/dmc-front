import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly prefix = 'crm__';

  constructor() {}

  public set<T>(key: string, data: T): void {
    window.localStorage.setItem(this.prefix + key, JSON.stringify(data));
  }

  public get<T>(key: string): T {
    try {
      return JSON.parse(window.localStorage.getItem(this.prefix + key));
    } catch (e) {}
  }

  public remove(key: string): void {
    window.localStorage.removeItem(this.prefix + key);
  }
}
