import Header from './Header';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchBar() {
  const navigate = useNavigate();
  const handleClick = () => {
    if (inputValue === '') {
      toast.error('Please provide a keyword!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right'
      });
    } else {
      navigate(`/search/${inputValue}`);
    }
  };

  const [inputValue, setInputValue] = useState('');
  const [inputActive, setInputActive] = useState(false);

 
  return (
    <div>
      <div
        className={'flex content-center justify-center ' + (inputActive ? 'rounded-md ring-2' : '')}
      >
        <button
          onClick={handleClick}
          className=" rounded-l-md bg-slate-800 p-2  font-bold text-white "
        >
          <FaSearch className={`text-slate-400`}></FaSearch>
        </button>
        <input
          type="text"
          placeholder="Search movie or series"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleClick();
            }
          }}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          className="rounded-r-md bg-slate-800 p-2 text-slate-300 placeholder-slate-500 outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
