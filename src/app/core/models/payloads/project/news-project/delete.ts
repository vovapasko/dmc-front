import { ArchiveEntity } from '@models/payloads/archive/archive-entity';

export interface DeleteNewsProjectPayload {
  id: number;
  data: ArchiveEntity;
}
