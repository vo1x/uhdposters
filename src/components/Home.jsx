import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Search from './Search';
import Header from './Header';
function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearch = () => {
    if (searchTerm == '') {
      toast.error('Please provide a keyword!', { theme: 'colored', autoClose: 2000 });
    } else {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <>
      <div className="grid min-h-screen place-content-center bg-slate-900">
        <div className="flex flex-col gap-7 self-center">
          <Header />
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Movie or Series"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                console.log(searchTerm);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="rounded-md bg-slate-800 p-2 text-slate-300 placeholder-slate-500 outline-none focus:ring-2"
            />

            <button
              className="rounded-md bg-sky-500 p-2 font-bold text-white"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home;
