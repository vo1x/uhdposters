import axios from 'axios';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';

import { SearchResult } from '../types/interfaces';

interface UseSearchParams {
  searchTerm?: string;
}

interface UseSearchReturn {
  data: SearchResult[];
  isFetched: boolean;
  isFetching: boolean;
}

const useSearch: (params: UseSearchParams) => UseSearchReturn = ({ searchTerm }) => {
  const fetchTrending = async (): Promise<SearchResult[]> => {
    try {
      const { data } = await axios.get<SearchResult[]>(`/trending`);
      return data;
    } catch (error: any) {
      toast.error(error.message || 'An error occurred', { theme: 'colored', autoClose: 2000 });
      throw error;
    }
  };

  const fetchInfo = async (query: string): Promise<SearchResult[]> => {
    const imdbIdRegex = /^tt\d{7,}$/;
    const url = query && imdbIdRegex.test(query) ? `/find?id=${query}` : `/search?query=${query}`;

    try {
      const { data } = await axios.get<SearchResult[]>(url);
      return data;
    } catch (error: any) {
      toast.error(error.message || 'An error occurred', { theme: 'colored', autoClose: 2000 });
      throw error;
    }
  };

  const {
    data = [],
    isFetched,
    isFetching
  } = useQuery({
    queryKey: [searchTerm !== '' ? searchTerm : 'trending'],
    queryFn: async () =>
      searchTerm && searchTerm !== '' ? await fetchInfo(searchTerm) : await fetchTrending(),
    enabled: !!searchTerm || searchTerm !== '',
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });
  return { data, isFetched, isFetching };
};

export default useSearch;
