import { Pipe, PipeTransform } from '@angular/core';
import { Contractor } from '../../core/models/instances/contractor';

@Pipe({ name: 'contractorsCost' })
export class ContractorsCostPipe implements PipeTransform {
  transform(data: Contractor[]) {
    const reducer = (a, c) => +a + +c.onePostPrice;
    return data.reduce(reducer, 0);
  }
}
