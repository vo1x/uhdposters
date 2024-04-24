import { useState, useEffect } from 'react';
import Card from '../components/Card';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTags } from 'react-icons/fa';
import Select from '../components/Select';
import SearchBar from '../components/AutoSearchBar';
import { useQuery } from '@tanstack/react-query';
import SearchResults from '../components/SearchResults';
function Search() {
  const { searchTerm } = useParams();
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = 'https://api.themoviedb.org/3';
  const fetchInfo = async () => {
    try {
      const { data } = await axios.get(
        `${tmdbBaseUrl}/search/multi?api_key=${apiKey}&query=${searchTerm}`
      );
      return data.results;
    } catch (error) {
      toast.error(error, { theme: 'colored', autoClose: 2000 });
    }
  };

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(`${tmdbBaseUrl}/trending/all/day?api_key=${apiKey}`);
      return data.results;
    } catch (error) {
      toast.error(error, { theme: 'colored', autoClose: 2000 });
    }
  };

  const {
    data: searchResults,
    isFetched,
    isFetching,
    isLoading
  } = useQuery({
    queryKey: [searchTerm !== '' ? searchTerm : 'trending'],
    queryFn: () => (searchTerm && searchTerm !== '' ? fetchInfo() : fetchTrending()),
    enabled: !!searchTerm || searchTerm !== '',
    staleTime: Infinity,
    refetchOnWindowFocus: false
  });

  const formatSelectOptions = [
    { value: 'all', label: 'Any' },
    {
      value: 'tv',
      label: 'TV Show'
    },
    { value: 'movie', label: 'Movie' }
  ];
  const currentYear = new Date().getFullYear();

  const yearOptions = Array.from({ length: currentYear - 1939 }, (_, index) => ({
    value: 1940 + index,
    label: 1940 + index
  })).reverse();

  const yearSelectOptions = [{ value: 'all', label: 'Any' }, ...yearOptions];

  const [tags, setTags] = useState({ searchTag: '', formatTag: '', yearTag: '' });

  const [selectedFormat, setSelectedFormat] = useState(formatSelectOptions[0]);
  const [selectedYear, setSelectedYear] = useState(yearSelectOptions[0]);

  const [filteredData, setFilteredData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setTags((prev) => ({
      ...prev,
      searchTag: `Search: ${inputValue}`
    }));

    if (selectedFormat.value === 'all') {
      setTags((prev) => ({ ...prev, formatTag: '' }));
    } else {
      setTags((prev) => ({ ...prev, formatTag: selectedFormat.value }));
    }
    if (selectedYear.value === 'all') {
      setTags((prev) => ({ ...prev, yearTag: '' }));
    } else {
      setTags((prev) => ({ ...prev, yearTag: selectedYear.value }));
    }
  }, [inputValue, selectedFormat.value, selectedYear.value]);

  useEffect(() => {
    if (!searchResults && isFetched) {
      return;
    }

    const filterDataByFormat = () => {
      let filteredResults = searchResults ? [...searchResults] : [];

      if (selectedFormat.value !== 'all') {
        filteredResults = filteredResults.filter((res) => res.media_type === selectedFormat.value);
      }

      if (selectedYear.value !== 'all') {
        filteredResults = filteredResults.filter(
          (res) =>
            (res.release_date && parseInt(res.release_date.split('-')[0]) === selectedYear.value) ||
            (res.first_air_date &&
              parseInt(res.first_air_date.split('-')[0]) === selectedYear.value)
        );
      }

      setFilteredData(filteredResults);
    };

    filterDataByFormat();
  }, [searchResults, selectedFormat.value, selectedYear.value, isFetched]);
  return (
    <>
      <div className="flex min-h-screen flex-col gap-10 bg-slate-900 pb-5 pt-1 ">
        <div className="place-self-center pt-2">
          <Header></Header>
        </div>
        <div className="min-w-7xl w-full max-w-7xl place-self-center px-2 md:px-0">
          <div className="items-centers flex gap-5 ">
            <div className="flex flex-col gap-1 text-slate-300">
              <span className="font-semibold">Search</span>
              <SearchBar defaultValue={searchTerm} setInputValue={setInputValue}></SearchBar>
            </div>
            <div className="flex flex-col gap-1 text-slate-300">
              <span className="font-semibold">Format</span>
              <Select
                options={formatSelectOptions}
                placeHolder={selectedFormat.label}
                onChange={setSelectedFormat}
                defaultValue={formatSelectOptions[0]}
                className={'rounded-md'}
              ></Select>
            </div>
            <div className="flex flex-col gap-1 text-slate-300">
              <span className="font-semibold">Year</span>
              <Select
                options={yearSelectOptions}
                placeHolder={selectedYear.label}
                onChange={setSelectedYear}
                defaultValue={yearSelectOptions[0]}
                className={'rounded-md'}
              ></Select>
            </div>
          </div>

          <div className="my-5 flex justify-between">
            {searchTerm && (
              <div className="flex items-center gap-2 ">
                <div className="text-xl text-slate-400">
                  <FaTags />
                </div>
                <AnimatePresence>
                  {Object.entries(tags).map(([key, value]) =>
                    value !== '' ? (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        key={key}
                        className="w-max rounded-lg bg-blue-500 p-1 px-2 text-sm font-semibold text-slate-100"
                      >
                        {value}
                      </motion.div>
                    ) : null
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          <SearchResults
            isLoading={isLoading}
            isFetched={isFetched}
            filteredData={filteredData}
            searchResults={searchResults}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </>
  );
}

export default Search;
