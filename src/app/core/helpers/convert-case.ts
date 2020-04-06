import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';
import mapKeys from 'lodash.mapkeys';
import {keysToCamel} from './utility';

import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export default class ConvertCase {
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
     * (string): Returns the camel cased string.
     * @param value [string=''] (string): The string to convert.
     */
    private static convertToCamelCase(value: string): string {
        return camelCase(value);
    }

    public convertFromCamelToSnakeCase(obj) {
        return this.convert(obj, ConvertCase.convertToSnakeCase);
    }

    public convertFromSnakeToCamelCase(obj) {
        return keysToCamel(obj);
    }

    private convert(obj: object, renameFunction) {
        return mapKeys(obj, (v, k) => renameFunction(k));
    }
}
