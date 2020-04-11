import {Injectable} from '@angular/core';
import mapKeys from 'lodash.mapkeys';
import snakeCase from 'lodash.snakecase';

import {keysToCamel} from './utility';

/**
 * This service for convert from some_case to anotherCase
 */

@Injectable({
    providedIn: 'root'
})
export class ConvertCase {
    constructor() {
    }

    /**
     * (string): Returns the snake cased string.
     * @param value [string=''] (string): The string to convert.
     */
    private static convertToSnakeCase(value: string): string {
        return snakeCase(value);
    }

    /**
     * Object keys converting from camelCase to snake_case
     */
    public convertFromCamelToSnakeCase(obj) {
        return this.convert(obj, ConvertCase.convertToSnakeCase);
    }

    /**
     * Deep object keys converting from snake_case to camelCase
     */
    public convertFromSnakeToCamelCase(obj) {
        return keysToCamel(obj);
    }

    /**
     * Use lodash map keys for deep mapping object keys and rename key
     */
    private convert(obj: object, renameFunction) {
        return mapKeys(obj, (v, k) => renameFunction(k.replace('update', '').replace(/^\w/, c => c.toLowerCase())));
    }
}
