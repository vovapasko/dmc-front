import { Injectable } from '@angular/core';

import { keysToCase, toCamel } from './utility';
import snakeCase from 'lodash.snakecase';

/**
 * This service for convert from some_case to anotherCase
 */

@Injectable({
  providedIn: 'root',
})
export class ConvertCase {
  constructor() {}

  /**
   * Object keys converting from camelCase to snake_case
   */
  public convertFromCamelToSnakeCase(obj: object): object {
    return keysToCase(obj, snakeCase);
  }

  /**
   * Deep object keys converting from snake_case to camelCase
   */
  public convertFromSnakeToCamelCase(obj: object): object {
    return keysToCase(obj, toCamel);
  }
}


