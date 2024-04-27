import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function SearchModal({ onChange }) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = 'https://api.themoviedb.org/3';
  const [inputText, setInputText] = useState('');
  const [value] = useDebounce(inputText, 1000);
  const inputRef = useRef(null);
  const handleEscButton = () => {
    onChange(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleEscButton();
      }
    };
    inputRef.current.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const [loading, setIsLoading] = useState(false);
  const fetchInfo = async (query) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${tmdbBaseUrl}/search/multi?api_key=${apiKey}&query=${query}`
      );
      setIsLoading(false);
      return data.results;
    } catch (error) {
      toast.error(error, { theme: 'colored', autoClose: 2000 });
    }
  };

  const {
    data: searchResults,
    isFetched,
    isFetching
  } = useQuery({
    queryKey: [value],
    queryFn: () => fetchInfo(value),
    enabled: !!value || value !== '',
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });
  const imageBaseUrl = 'https://image.tmdb.org/t/p/w94_and_h141_face';
  return (
    <div className="fixed inset-0 z-50 flex h-screen items-center justify-center overflow-hidden bg-black bg-opacity-50 backdrop-blur-md  backdrop-filter">
      <div className="min-w-xl max-h-3/4 flex w-full max-w-xl flex-col gap-1  overflow-hidden rounded-lg p-1">
        <div className="relative">
          <button
            onClick={() => handleEscButton()}
            className="absolute right-5 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-md border border-slate-600 bg-slate-800/50 px-2 py-1 text-sm font-semibold text-slate-300"
          >
            <span>esc</span>
          </button>

          <div className="absolute left-2 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-md bg-slate-900  px-2 py-1 text-sm font-semibold text-slate-400">
            <span>{loading ? <Loader2 className="animate-spin" /> : <Search />}</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            placeholder="Search movie or series"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full rounded-md border border-slate-600 bg-slate-900 p-4 pl-12  text-xl text-slate-300 placeholder-slate-500 shadow-md shadow-black/75 outline-none"
          />
        </div>

        {isFetched && searchResults && searchResults.length > 0 ? (
          <div className="mt-2 max-h-[440px] overflow-y-auto rounded-lg border border-slate-600 bg-slate-900 text-slate-50 shadow-md shadow-black/75">
            {searchResults.map((result) => (
              <Link to={`/details/${result.media_type}/${result.id}`}>
                <div
                  onClick={() => onChange(false)}
                  className="flex max-h-24 gap-2 rounded-lg p-2 hover:bg-slate-800"
                >
                  <img src={imageBaseUrl + result.poster_path} width={48} alt="" />
                  <div className="flex flex-col overflow-hidden">
                    <span>{result.name || result.title}</span>
                    <span className="truncate">{result.overview}</span>
                    <div className="flex">
                      <span>{result.media_type}</span>
                      <span>{result.first_air_date || result.release_date}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-2 max-h-[440px] overflow-y-auto rounded-lg border border-slate-600 bg-slate-900 text-slate-50 shadow-md shadow-black/75">
            <span className="flex max-h-24 gap-2 rounded-lg p-2 text-slate-400 hover:bg-slate-800">
              No results found
            </span>
          </div>
        )}
        {/* 
        {isFetched && searchResults && searchResults.length > 0 ? (
          <div className="mt-2 max-h-[440px] overflow-y-auto rounded-lg border border-slate-600 bg-slate-900 text-slate-50 shadow-md shadow-black/75">
            {searchResults.map((result) => (
              <div className="flex max-h-24 gap-2 rounded-lg p-2 hover:bg-slate-800">
                <img src={imageBaseUrl + result.poster_path} width={48} alt="" />
                <div className="flex flex-col overflow-hidden">
                  <span>{result.name || result.title}</span>
                  <span className="truncate">{result.overview}</span>
                  <div className="flex">
                    <span>{result.media_type}</span>
                    <span>{result.first_air_date || result.release_date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-2 max-h-[440px] overflow-y-auto rounded-lg border border-slate-600 bg-slate-900 text-slate-50 shadow-md shadow-black/75">
            <span>loading</span>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default SearchModal;
