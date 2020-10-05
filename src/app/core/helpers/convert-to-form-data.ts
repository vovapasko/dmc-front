import { Injectable } from '@angular/core';

import { jsonToFormData, objectToFormData } from './utility';
import { Payloads } from '@models/payloads/payload';

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
  public convertToFormData(obj: object): Payloads {
    // return objectToFormData(obj, null, null);
    return jsonToFormData(obj);
  }

}
