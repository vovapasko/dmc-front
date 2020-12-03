import { ArchiveEntity } from '@models/payloads/archive/archive-entity';

export interface DeleteEmailPayload {
  id: number;
  data: ArchiveEntity;
}
