import { Pipe, PipeTransform } from '@angular/core';
import { PostFormatListSet } from '@models/instances/contractor';
import { Format } from '@models/instances/format';

@Pipe({
  name: 'contractorsPriceListFilter'
})
export class ContractorsPriceListFilterPipe implements PipeTransform {

  transform(value: PostFormatListSet[], formats: Format[]): unknown {
    // tslint:disable-next-line:max-line-length
    return value.filter((postformatListSet: PostFormatListSet) => formats.find((format: Format) => postformatListSet.postFormat === format.postFormat));
  }

}
