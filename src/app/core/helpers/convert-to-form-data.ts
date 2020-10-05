import { Injectable } from '@angular/core';

import { objectToFormData } from './utility';

/**
 * This service for convert from some_case to anotherCase
 */

@Injectable({
  providedIn: 'root',
})
export class ConvertToFormData {
  constructor() {}

  /**
   * Object keys converting from camelCase to snake_case
   */
  public convertToFormData(obj: object) {
    return objectToFormData(obj, null, null);
  }

}
