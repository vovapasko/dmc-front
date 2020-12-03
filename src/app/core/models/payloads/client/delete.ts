import { ArchiveEntity } from '@models/payloads/archive/archive-entity';

export interface DeleteClientPayload {
  id: number;
  data: ArchiveEntity;
}
