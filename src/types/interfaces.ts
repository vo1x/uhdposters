export interface FilterState {
  format: string | number;
  year: string | number;
}

export interface SearchResult {
  backdrop_path: string;
  id: string | number;
  title: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  release_date: string;
}

export interface SelectOption {
  value: number | string;
  label: string;
}
