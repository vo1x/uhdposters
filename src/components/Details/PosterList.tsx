import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import PosterSkeleton from '../UI/PosterSkeleton';
import Poster from './Poster';

interface Poster {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string;
  vote_average: number;
  vote_count: number;
  width: number;
}

interface PosterListProps {
  fileName: string;
  posters: Poster[];
  selectedOption: { value: string };
}

const ITEMS_PER_PAGE = 10;

const PosterList: React.FC<PosterListProps> = ({ fileName, posters, selectedOption }) => {
  const { ref, inView } = useInView();

  const filteredPosters = posters?.filter((poster) => poster.iso_639_1 === selectedOption.value);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['posters', fileName],
    queryFn: async ({ pageParam = 0 }) => {
      const start = pageParam * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      return filteredPosters.slice(start, end);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ITEMS_PER_PAGE ? allPages.length : undefined;
    },
    enabled: !!posters && !!selectedOption.value
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (status === 'pending') {
    return (
      <div className="grid grid-cols-1 place-items-center md:flex md:flex-wrap gap-10">
        {Array.from({ length: 6 }, (_, index) => (
          <PosterSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return <div>Error loading posters</div>;
  }

  return (
    <div className="grid grid-cols-1 place-items-center md:flex md:flex-wrap gap-10">
      {data?.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {page.map((poster: Poster, index: number) => (
            <Poster key={`${pageIndex}-${index}`} posterData={poster} fileName={fileName} />
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage && <PosterSkeleton />}
      <div ref={ref} style={{ height: '20px', width: '100%' }} />
    </div>
  );
};

export default PosterList;
