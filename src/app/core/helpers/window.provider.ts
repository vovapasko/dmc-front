import { InjectionToken } from '@angular/core';

export function getWindow() {
    return window;
}

export const WINDOW = new InjectionToken('Window', {
    providedIn: 'root',
    factory: getWindow,
});
