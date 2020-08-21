import { Pipe, PipeTransform } from '@angular/core';
import { Contractor, PostFormatListSet } from '@models/instances/contractor';

@Pipe({ name: 'contractorsCost' })
export class ContractorsCostPipe implements PipeTransform {
  transform(data: Contractor[], format: string): any {
    const reducer = (a, c) => +a + +c.onePostPrice;
    return data && data.length ? data
      .map(el => el.postformatlistSet)
      .map(
        (el: PostFormatListSet[]) => el.filter((e: PostFormatListSet) => e.postFormat === format)
      )
      // @ts-ignore
      .flat()
      .reduce(reducer, 0) : 0;
  }
}
