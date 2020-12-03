import { ArchiveEntity } from '@models/payloads/archive/archive-entity';

export interface DeleteContractorPayload {
  id: number;
  data: ArchiveEntity;
}
