import { Hashtag } from '@models/instances/hashtag';

export interface TableData {
  id?: number | string;
  price?: string;
  amountPublications?: number;
  emails?: string;
  numbers?: string;
  name?: string;
  isConfirmed?: boolean;
}

// Search Data
export interface SearchResult {
  tickets: TableData[] | Hashtag[];
  total: number;
}
