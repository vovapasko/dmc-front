import { NewsWaves } from '@models/instances/news-waves';

export interface UpdateNewsWavesPayload {
  id: number;
  data: NewsWaves;
}
