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

export interface CopyToClipboardProps {
  text: string;
  item?: string;
  toastEnabled?: boolean;
  timeout?: number;
}

export interface UseClipboardProps {
  copyToClipboard: (props: CopyToClipboardProps) => void;
  isCopied: boolean;
}

export interface UseImgDownloaderReturn {
  downloadImage: (url: string, fileName: string) => void;
  isDownloading: boolean;
}

export interface UseMediaInfoParams {
  mediaType: string | undefined;
  mediaID: string | undefined;
}

export interface UseMediaInfoReturn {
  mediaDetails: any;
  isError: boolean;
}

export interface UseSearchParams {
  searchTerm?: string;
}

export interface UseSearchReturn {
  data: SearchResult[];
  isFetched: boolean;
  isFetching: boolean;
}
