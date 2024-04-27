import { useQuery } from '@tanstack/react-query';

export default function useMediaInfo(mediaType, mediaID) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  const fetchInfo = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${mediaID}?append_to_response=external_ids,images,videos&api_key=${apiKey}`
      );
      const info = await response.json();
      const filteredInfo = {
        id: info.id,
        title: info.name || info.title,
        release_date: info.first_air_date || info.release_date,
        genres: info.genres.map((genre) => genre.name),
        adult: info.adult,
        runtime: info.runtime,
        backdrop_path: info.backdrop_path,
        posters: info.images.posters,
        videos: info.videos.results.filter((result) => result.type === 'Trailer'),
        in_production: info.in_production,
        languages: info.languages,
        last_air_date: info.last_air_date,
        last_episode_to_air: info.last_episode_to_air,
        number_of_seasons: info.number_of_seasons,
        number_of_episodes: info.number_of_episodes,
        original_language: info.original_language,
        original_name: info.original_name,
        overview: info.overview,
        poster_path: info.poster_path,
        seasons: info.seasons,
        status: info.status,
        external_ids: info.external_ids
      };

      return filteredInfo;
    } catch (error) {
      console.error('Error occurred: ', error);
      return { error };
    }
  };

  const { data: mediaInfo, isError } = useQuery({
    queryKey: [`${mediaID}-data`],
    queryFn: fetchInfo,
    staleTime: Infinity,
    enabled: !!mediaID && !!mediaType
  });

  return [mediaInfo, isError];
}
