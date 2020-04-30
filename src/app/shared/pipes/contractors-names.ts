import { Pipe, PipeTransform } from '@angular/core';
import { Orders } from '../../core/constants/orders';
import { Contractor } from '../../core/models/instances/contractor';

@Pipe({ name: 'contractorsNames' })
export class ContractorsNames implements PipeTransform {
  transform(data: Contractor[]) {
    return data.map(el => el.editorName).toString();
  }
}
