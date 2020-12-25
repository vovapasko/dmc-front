import { Pipe, PipeTransform } from '@angular/core';
import { Contractor, PostFormatListSet } from '@models/instances/contractor';
import { Format } from '@models/instances/format';

@Pipe({
  name: 'contractorsPriceList'
})
export class ContractorsPriceListPipe implements PipeTransform {

  transform(value: Array<Contractor>, formats: Array<Format>): unknown {
    return value.filter(
      (contractor: Contractor) => contractor.postformatlistSet
        .some(
          (postformatListSet: PostFormatListSet) => formats
            .find(
              (format: Format) => format.postFormat === postformatListSet.postFormat)
        )
    );
  }

}
