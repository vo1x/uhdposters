import { useState, useEffect } from 'react';
import Card from './Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Topbar from './Topbar';
import axios from 'axios';
import { FaTags } from 'react-icons/fa';
import CustomSelect from './Select';
import { FaSpinner } from 'react-icons/fa';
function Search() {
  const { searchTerm } = useParams();

  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const tmdbBaseUrl = 'https://api.themoviedb.org/3';
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data } = await axios.get(
          `${tmdbBaseUrl}/search/multi?api_key=${apiKey}&query=${searchTerm}`
        );
        setSearchResults(data.results);
      } catch (error) {
        toast.error(error, { theme: 'colored', autoClose: 2000 });
      }
    };

    searchTerm == '' ? setSearchResults(null) : fetchInfo();
  }, [searchTerm]);

  const formatSelectOptions = [
    { value: 'all', label: 'Any' },
    {
      value: 'tv',
      label: 'TV Show'
    },
    { value: 'movie', label: 'Movie' }
  ];

  const [tags, setTags] = useState({ searchTag: `Search: ${searchTerm}`, formatTag: '' });

  const [selectedFormat, setSelectedFormat] = useState(formatSelectOptions[0]);
  const [selectedYear, setSelectedYear] = useState('xxx');

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    setTags((prev) => ({ ...prev, searchTag: `Search: ${searchTerm}` }));
  }, [searchTerm]);

  useEffect(() => {
    const filterDataByFormat = () => {
      if (!searchResults) {
        setFilteredData(null); // Reset filtered data if search results are null

        return;
      }

      if (selectedFormat.value === 'all') {
        setFilteredData(searchResults); // If all is selected, show all data
        setTags((prev) => ({ ...prev, formatTag: '' }));

        return;
      }

      const filtered = searchResults.filter((res) => res.media_type === selectedFormat.value);
      setFilteredData(filtered);
      setTags((prev) => ({ ...prev, formatTag: selectedFormat.label }));
    };

    filterDataByFormat();
  }, [searchResults, selectedFormat.value]);

  return (
    <>
      <div className="flex min-h-screen flex-col gap-10 bg-slate-900 pb-5 pt-1 ">
        <Topbar />
        <div className="max-w-7xl min-w-7xl w-full place-self-center">
          {/* <div className="mb-7 border-b border-b-slate-700 pb-3 text-3xl font-bold text-slate-300">
            Showing results for "{searchTerm}"
          </div> */}
          <div className="flex gap-5">
            <div className="flex flex-col gap-1 text-slate-300">
              <span className="font-semibold">Format</span>
              <CustomSelect
                options={formatSelectOptions}
                placeHolder={selectedFormat.label}
                onChange={setSelectedFormat}
              ></CustomSelect>
              {/* <input type="text" className="w-24 rounded-md bg-slate-800 px-2 py-1 outline-none" /> */}
            </div>
            <div className="flex flex-col gap-1 text-slate-300">
              <span className="font-semibold">Year</span>
              <CustomSelect
                options={[{ value: 0, label: 'WIP' }]}
                placeHolder={'xxxx'}
                onChange={setSelectedYear}
              ></CustomSelect>
              {/* <input type="text" className="w-24 rounded-md bg-slate-800 px-2 py-1 outline-none" /> */}
            </div>
          </div>
          <div className="my-5  flex justify-between">
            <div className="flex items-center gap-2 ">
              <div className="text-xl text-slate-400">
                <FaTags />
              </div>
              {Object.entries(tags).map(([key, value]) =>
                value !== '' ? (
                  <div
                    key={key}
                    className="w-max rounded-lg bg-blue-500 p-1 px-2 text-sm font-semibold text-slate-100"
                  >
                    {value}
                  </div>
                ) : null
              )}
            </div>
            {/* <button className="flex items-center justify-center p-1 text-lg font-semibold text-slate-400">
              <span>
                <LuChevronsUpDown />
              </span>
              Year
            </button> */}
          </div>
          <div className="grid grid-cols-6 gap-10 place-self-center">
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((result, index) => (
                <Card key={result.id} data={result} index={index} length={searchResults.length} />
              ))
            ) : filteredData && filteredData.length === 0 ? (
              <span className="w-max  text-lg font-bold text-slate-400">
                No results found for ' {searchTerm} '
              </span>
            ) : (
              <span className="text-lg text-slate-100">Loading....</span>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Search;
