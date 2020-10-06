import { Pipe, PipeTransform } from '@angular/core';
import { Label } from '@models/instances/labels';
import { HIDE } from '@constants/titles';

@Pipe({
  name: 'labelFilter'
})
export class LabelFilterPipe implements PipeTransform {

  transform(value: Label[], ...args: unknown[]): unknown {
    return value ? value.filter(label => label.messageListVisibility !== HIDE) : [];
  }

}
