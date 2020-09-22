import { Injectable } from '@angular/core';
import numbers from '@constants/numbers';
import { calculateExperience } from '@constants/formula';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  /**
   * Returns the cookie value by name
   * @param name cookie name
   */
  public getCookie(name: string) {
    if (!name) {
      return null;
    }
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');
    // tslint:disable-next-line: prefer-for-of
    for (let i = numbers.zero; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(numbers.zero) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === numbers.zero) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  /**
   * Deletes the cookie with given name
   * @param name cookie name
   * @param path path of the domain
   */
  public deleteCookie(name: string) {
    this.setCookie(name, '', -1);
  }

  /**
   * Creates/sets the cookie
   * @param name name of cookie
   * @param value cookie value
   * @param days validity in days
   */
  public setCookie(name: string, value: string, days?: number) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + calculateExperience(days));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  }
}
