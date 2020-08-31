import { Pipe, PipeTransform } from '@angular/core';
import { Contractor, PostFormatListSet } from '@models/instances/contractor';
import { NewsWavePrice } from '@models/instances/newsWavePrice';

@Pipe({ name: 'contractorsCost' })
export class ContractorsCostPipe implements PipeTransform {
  transform(data: Contractor[], priceList: NewsWavePrice[], format: string): any {
    const reducer = (a, c) => +a + +c.onePostPrice;
    const priceReducer = (a, c) => +a + +c.price;
    const total = data && data.length ? data
      // If price has been changed then stop calculate like usual
      .filter((contractor: Contractor) => !priceList.find(el => el.contractor.id !== contractor.id))
      .map(el => el.postformatlistSet)
      .map(
        (el: PostFormatListSet[]) => el.filter((e: PostFormatListSet) => e.postFormat === format)
      )
      // @ts-ignore
      .flat()
      .reduce(reducer, 0) : 0;
    return total + priceList.filter(
      (el: NewsWavePrice) => data.find(
      (contractor: Contractor) => el.contractor.id === contractor.id)
    ).reduce(priceReducer, 0);
  }
}
