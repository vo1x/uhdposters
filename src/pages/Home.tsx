import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTags } from 'react-icons/fa';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Select from '../components/Select';
import SearchBar from '../components/Home/AutoSearchBar';
import Card from '../components/Card';
import CardSkeleton from '../components/CardSkeleton';

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

  const [selectedFormat, setSelectedFormat] = useState(formatSelectOptions[0]);
  const [selectedYear, setSelectedYear] = useState<{
    value: number | string;
    label: string;
  }>(yearSelectOptions[0]);

  const [filteredData, setFilteredData] = useState<any>([]);
  const [inputValue, setInputValue] = useState<string>('');

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
      setTags((prev) => ({ ...prev, yearTag: selectedYear.value.toString() }));
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
      <div className="flex flex-col">
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
                  onChange={setSelectedFormat}
                  defaultValue={formatSelectOptions[0]}
                  className={'rounded-md'}
                />
              </div>
              <div className="flex flex-col gap-1 text-slate-300">
                <span className="font-semibold">Year</span>
                <Select
                  options={yearSelectOptions}
                  onChange={setSelectedYear}
                  defaultValue={yearSelectOptions[0]}
                  className={'rounded-md'}
                />
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
            <div className="grid grid-cols-3 place-items-center gap-y-6 md:grid-cols-4 lg:grid-cols-6 lg:place-content-center lg:place-items-start lg:gap-10">
              {isFetching ? (
                Array.from({ length: 12 }, (_, index) => <CardSkeleton key={index} />)
              ) : isFetched && searchResults.length !== 0 ? (
                filteredData.map((result: any) => <Card key={result.id} data={result} />)
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
