import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';
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
        this.convert(obj, ConvertCase.convertToSnakeCase);
    }

    public convertFromSnakeToCamelCase(obj) {
        this.convert(obj, ConvertCase.convertToCamelCase);
    }

    private convert(obj: object, renameFunction) {
        const oldNames = Object.keys(obj);
        oldNames.forEach(oldName => this.renameKey(obj, oldName, renameFunction(oldName)));
        return obj;
    }

    /**
     * Performs renaming object key
     */
    public renameKey(obj, oldName, newName) {
        // Do nothing if the names are the same
        if (oldName === newName) {
            return obj;
        }
        // Check for the old property name to avoid a ReferenceError in strict mode.
        if (obj.hasOwnProperty(oldName)) {
            obj[newName] = obj[oldName];
            delete obj[oldName];
        }
        return obj;
    }
}
