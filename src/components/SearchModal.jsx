import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
        `/search?query=${query}`
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
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="search-modal"
        className="fixed inset-0 z-50 flex h-screen items-start justify-center overflow-hidden bg-black bg-opacity-50 backdrop-blur-md  backdrop-filter"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          key="search-content"
          className="min-w-xl max-h-3/4 mt-20 flex w-full max-w-xl flex-col gap-1  overflow-hidden rounded-lg p-1"
        >
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

            <motion.input
              ref={inputRef}
              type="text"
              placeholder="Search movie or series"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full rounded-md border border-slate-600 bg-slate-900 p-4 pl-12  text-xl text-slate-300 placeholder-slate-500 shadow-md shadow-black/75 outline-none"
            />
          </div>
          <AnimatePresence>
            {isFetched && searchResults && searchResults.length > 0 && (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="mt-2 max-h-[440px] overflow-y-auto rounded-lg border border-slate-600 bg-slate-900 text-slate-50 shadow-md shadow-black/75"
              >
                {searchResults.map((result, index) => (
                  <Link key={index} to={`/details/${result.media_type}/${result.id}`}>
                    <div
                      onClick={() => onChange(false)}
                      className="flex max-h-24 gap-2 rounded-lg p-2 hover:bg-slate-800"
                    >
                      <div className="min-w-12">
                        <img
                          src={imageBaseUrl + result.poster_path}
                          width={48}
                          loading="lazy"
                          alt=""
                        />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-semibold">{result.name || result.title}</span>
                        <span className="truncate text-sm text-slate-300">{result.overview}</span>
                        <div className="flex gap-1 capitalize text-slate-400">
                          <span>{result.media_type}</span>
                          <span>•</span>
                          <span>{result.first_air_date || result.release_date}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default SearchModal;
