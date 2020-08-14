// Card Data
export interface CardData {
  icon: string;
  tickets: number;
  title: string;
  text: string;
}

// Table Data
export interface TableData {
  id: number;
  onePostPrice: string;
  arrangedNews: number;
  email: string;
  phone: string;
  client: string;
}

// Search Data
export interface SearchResult {
  tickets: TableData[];
  total: number;
}
