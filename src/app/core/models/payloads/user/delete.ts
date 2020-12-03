import { ArchiveEntity } from '@models/payloads/archive/archive-entity';

export interface DeleteUserPayload {
  id: number;
  data: ArchiveEntity;
}
