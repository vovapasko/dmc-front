import { Injectable } from '@angular/core';
import numbers from '@constants/numbers';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  currentYear: number;
  startYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
    this.startYear = numbers.startYear;
  }
}
