import { Pipe, PipeTransform } from '@angular/core';
import { EmailEntity } from '@models/instances/email';
import { FROM } from '@constants/titles';

@Pipe({
  name: 'fromEmail'
})
export class FromEmailPipe implements PipeTransform {

  transform(value: EmailEntity, ...args: unknown[]): unknown {
    return value.payload.headers.find(header => header.name.toLowerCase() === FROM.toLowerCase()).value;
  }

}
