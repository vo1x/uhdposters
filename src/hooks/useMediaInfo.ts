import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UseMediaInfoReturn, UseMediaInfoParams } from '../types/interfaces';

const useMediaInfo: (params: UseMediaInfoParams) => UseMediaInfoReturn = ({
  mediaType,
  mediaID
}) => {
  const fetchInfo = async () => {
    try {
      const { data } = await axios.get(`/media/${mediaType}/${mediaID}`);
      return data;
    } catch (error: any) {
      console.error('Error occurred: ', error);
      return { error };
    }
  };

  const { data: mediaDetails, isError } = useQuery({
    queryKey: [`${mediaID}-data`],
    queryFn: fetchInfo,
    staleTime: Infinity,
    enabled: !!mediaID && !!mediaType
  });

  return { mediaDetails, isError };
};

export default useMediaInfo;
