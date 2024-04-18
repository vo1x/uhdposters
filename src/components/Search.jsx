import { useState, useEffect } from 'react';
import Card from './Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import Topbar from './Topbar';
import axios from 'axios';

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

  return (
    <>
      <div className="flex min-h-screen flex-col gap-10 bg-slate-900 pb-5 pt-1">
        <Topbar />
        <div className="place-self-center">
          <div className="mb-7 border-b border-b-slate-700 pb-3 text-3xl font-bold text-slate-300">
            Showing results for "{searchTerm}"
          </div>
          <div className="grid grid-cols-6 gap-10 place-self-center">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <Card key={result.id} data={result} index={index} length={searchResults.length} />
              ))
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
