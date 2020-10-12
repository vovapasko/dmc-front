

// Table Data
import { Hashtag } from '@models/instances/hashtag';

export interface TableData {
  id?: number;
  price?: string;
  amountPublications?: number;
  emails?: string;
  numbers?: string;
  name?: string;
}

// Search Data
export interface SearchResult {
  tickets: TableData[] | Hashtag[];
  total: number;
}
