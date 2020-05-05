import { Pipe, PipeTransform } from '@angular/core';
import { Contractor } from '../../core/models/instances/contractor';

@Pipe({ name: 'contractorsNames' })
export class ContractorsNamesPipe implements PipeTransform {
  transform(data: Contractor[]) {
    return data && data.length ? data.map(el => el.editorName).toString() : [];
  }
}
