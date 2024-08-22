import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTags } from 'react-icons/fa';

import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import Select from '../components/UI/Select';
import SearchBar from '../components/Home/AutoSearchBar';
import Card from '../components/Home/Card';
import CardSkeleton from '../components/UI/CardSkeleton';

function Search() {
  const { searchTerm } = useParams();

  const fetchInfo = async () => {
    const imdbIdRegex = /^tt\d{7,}$/;
    let url = `/search?query=${searchTerm}`;

    if (imdbIdRegex.test(searchTerm!)) {
      url = `/find?id=${searchTerm}`;
    }

    try {
      const { data } = await axios.get(url);
      return data;
    } catch (error: any) {
      toast.error(error, { theme: 'colored', autoClose: 2000 });
    }
  };

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(`/trending`);
      return data;
    } catch (error: any) {
      toast.error(error, { theme: 'colored', autoClose: 2000 });
    }
  };

  const {
    data: searchResults,
    isFetched,
    isFetching
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
    label: (1940 + index).toString()
  })).reverse();

  const yearSelectOptions = [{ value: 'all', label: 'Any' }, ...yearOptions];

  const [tags, setTags] = useState<{
    searchTag: string;
    formatTag: string;
    yearTag: string;
  }>({ searchTag: '', formatTag: '', yearTag: '' });

  const [filters, setFilters] = useState<{
    format: string;
    year: string;
  }>({
    format: 'all',
    year: 'all'
  });

  const [selectedFormat, setSelectedFormat] = useState(formatSelectOptions[0]);
  const [selectedYear, setSelectedYear] = useState<{
    value: number | string;
    label: string;
  }>(yearSelectOptions[0]);

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    setTags((prev) => ({
      ...prev,
      searchTag: `Search: ${inputValue}`
    }));

    if (selectedFormat.value === 'all') {
      setTags((prev) => ({ ...prev, formatTag: '' }));
      setFilters((prev) => ({ ...prev, format: 'all' }));
    } else {
      setTags((prev) => ({ ...prev, formatTag: selectedFormat.value }));
      setFilters((prev) => ({ ...prev, format: selectedFormat.value }));
    }
    if (selectedYear.value === 'all') {
      setTags((prev) => ({ ...prev, yearTag: '' }));
      setFilters((prev) => ({ ...prev, year: 'all' }));
    } else {
      setTags((prev) => ({ ...prev, yearTag: selectedYear.value.toString() }));
      setFilters((prev) => ({ ...prev, year: selectedYear.value.toString() }));
    }
  }, [inputValue, selectedFormat.value, selectedYear.value]);

  const filterSearchResults = () => {
    let filteredResults = searchResults ?? [];

    const filteredList = filteredResults.filter((result: any) => {
      const yearMatches =
        filters.year === 'all' || result.release_date.split('-')[0] === filters.year.toString();
      const formatMatches = filters.format === 'all' || result.media_type === filters.format;

      return yearMatches && formatMatches;
    });

    return filteredList;
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex min-h-screen flex-col gap-10 bg-slate-900 pb-6 pt-2">
          <div className="place-self-center pt-2">
            <Header></Header>
          </div>

          <div className="min-w-7xl w-full max-w-7xl place-self-center px-2 md:px-0">
            <div className="items-centers flex gap-5 ">
              <div className="flex flex-col gap-2 ">
                <span className="label">Search</span>
                <SearchBar defaultValue={searchTerm} setInputValue={setInputValue}></SearchBar>
              </div>
              <div className="flex flex-col gap-2 ">
                <span className="label">Format</span>
                <Select
                  options={formatSelectOptions}
                  onChange={setSelectedFormat}
                  defaultValue={formatSelectOptions[0]}
                  className={'rounded-md'}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="label">Year</span>
                <Select
                  options={yearSelectOptions}
                  onChange={setSelectedYear}
                  defaultValue={yearSelectOptions[0]}
                  className={'rounded-md'}
                />
              </div>
            </div>

            {/* Tags indicator */}
            <div className="my-6 flex justify-between">
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

            {/* Search Results */}
            <div className="grid grid-cols-3 place-items-center gap-y-6 md:grid-cols-4 lg:grid-cols-6 lg:place-content-center lg:place-items-start lg:gap-10">
              {isFetching ? (
                Array.from({ length: 12 }, (_, index) => <CardSkeleton key={index} />)
              ) : isFetched && searchResults.length !== 0 ? (
                filterSearchResults().map((result: any) => <Card key={result.id} data={result} />)
              ) : (
                <span className="w-max text-2xl font-bold text-slate-400">
                  No results found for "<span className="text-sky-300">{searchTerm}</span>"
                </span>
              )}
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

export default Search;
