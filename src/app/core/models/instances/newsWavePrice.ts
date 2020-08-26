import { Contractor } from '@models/instances/contractor';

export interface NewsWavePrice {
  id?: number;
  newsWave?: number;
  contractor: Contractor;
  price: string;
}
