import { Pipe, PipeTransform } from '@angular/core';
import { Contractor, PostFormatListSet } from '@models/instances/contractor';

@Pipe({
  name: 'contractorsArrangement'
})
export class ContractorsArrangementPipe implements PipeTransform {

  transform(data: Contractor[], format: string) {
    const reducer = (a, c) => +a + +c.arrangedNews;
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
