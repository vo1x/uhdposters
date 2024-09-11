import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTags } from 'react-icons/fa';

import Header from '../components/UI/Header';
import Footer from '../components/UI/Footer';
import Select from '../components/UI/Select';
import SearchBar from '../components/Home/AutoSearchBar';
import Card from '../components/Home/Card';
import CardSkeleton from '../components/UI/CardSkeleton';

import useSearch from '../hooks/useSearch';

import { FilterState, SearchResult, SelectOption } from '../types/interfaces';

const Search = () => {
  const { searchTerm } = useParams<{ searchTerm: string | undefined }>();

  const { data: searchResults, isFetching, isFetched } = useSearch({ searchTerm });

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

  const [filters, setFilters] = useState<FilterState>({
    format: 'all',
    year: 'all'
  });

  const [selectedFormat, setSelectedFormat] = useState<SelectOption>(formatSelectOptions[0]);
  const [selectedYear, setSelectedYear] = useState<SelectOption>(yearSelectOptions[0]);

  useEffect(() => {
    setFilters({
      format: selectedFormat.value,
      year: selectedYear.value
    });
  }, [selectedFormat.value, selectedYear.value]);

  const filterSearchResults = () => {
    let filteredResults = searchResults ?? [];

    const filteredList = filteredResults.filter((result: SearchResult) => {
      const yearMatches =
        filters.year === 'all' || parseInt(result.release_date.split('-')[0]) === filters.year;
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

          <div className="min-w-7xl w-full max-w-[70%] lg:max-w-[75%] place-self-center px-2">
            <div className="items-center flex gap-5 flex-wrap md:flex-row">
              <div className="flex flex-col gap-2 ">
                <span className="label">Search</span>
                <SearchBar defaultValue={searchTerm ?? ''} />
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
              {(searchTerm || filters.format !== 'all' || filters.year !== 'all') && (
                <div className="flex items-center gap-2 ">
                  <div className="text-xl text-slate-400">
                    <FaTags />
                  </div>
                  <AnimatePresence>
                    {[
                      { label: `Search: ${searchTerm}`, condition: searchTerm !== '' },
                      { label: `Format: ${filters.format}`, condition: filters.format !== 'all' },
                      { label: `Year: ${filters.year}`, condition: filters.year !== 'all' }
                    ].map(
                      ({ label, condition }) =>
                        condition && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            key={label}
                            className="w-max rounded-lg bg-blue-500 p-1 px-2 text-sm font-semibold text-slate-100"
                          >
                            {label}
                          </motion.div>
                        )
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Search Results */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-8 lg:gap-10">
              {isFetching ? (
                Array.from({ length: 12 }, (_, index) => <CardSkeleton key={index} />)
              ) : isFetched && searchResults.length !== 0 ? (
                filterSearchResults().map((result: SearchResult) => (
                  <Card key={result.id} data={result} />
                ))
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
};

export default Search;
