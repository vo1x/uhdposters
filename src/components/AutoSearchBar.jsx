import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDebounce } from 'use-debounce';

function SearchBar({ defaultValue }) {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState(defaultValue);
  const [inputActive, setInputActive] = useState(false);
  const [value] = useDebounce(inputText, 1000);
  const handleClick = () => {
    if (value === '') {
      toast.error('Please provide a keyword!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right'
      });
    } else {
      navigate(`/search/${value}`);
    }
  };

  useEffect(() => {
    if (!inputText || inputText.trim() === '') {
      navigate('/search/trending');
    } else {
      navigate(`/search/${inputText}`);
    }
  }, [value]);

  useEffect(() => {
    setInputText(defaultValue);
  }, [defaultValue]);

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
          defaultValue={value}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          // onKeyDown={(e) => {
          //   if (e.key === 'Enter') {
          //     handleClick();
          //   }
          // }}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          className="rounded-r-md bg-slate-800 p-2 text-slate-300 placeholder-slate-500 outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
