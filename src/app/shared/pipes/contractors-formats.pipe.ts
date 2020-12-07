import { Pipe, PipeTransform } from '@angular/core';
import { Contractor, PostFormatListSet } from '@models/instances/contractor';

@Pipe({
  name: 'contractorsFormats'
})
export class ContractorsFormatsPipe implements PipeTransform {

  transform(data: Contractor[]): any {
    return data.map(contractor => contractor.postformatlistSet.map((format: PostFormatListSet) => ({
      ...format,
      label: `${format.postFormat} (${contractor.editorName})`
      // @ts-ignore
    }))).flat();
  }

}
