import { ArchiveEntity } from '@models/payloads/archive/archive-entity';

export interface DeleteHashtagPayload {
  id: number;
  data: ArchiveEntity;
}
