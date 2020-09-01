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
  price: string;
  amountPublications: number;
  emails: string;
  numbers: string;
  name: string;
}

// Search Data
export interface SearchResult {
  tickets: TableData[];
  total: number;
}
