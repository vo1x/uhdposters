import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchBar() {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState('');
  const [inputActive, setInputActive] = useState(false);
  const handleClick = () => {
    if (inputText.trim() === '') {
      toast.error('Please provide a keyword!', {
        theme: 'colored',
        autoClose: 2000,
        position: 'bottom-right'
      });
    } else {
      navigate(`/search/${inputText}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

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
          value={inputText}
          onChange={(e) => {
            console.log(inputText);
            setInputText(e.target.value);
          }}
          onKeyDown={(e) => handleKeyDown(e)}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          className="rounded-r-md bg-slate-800 p-2 text-slate-300 placeholder-slate-500 outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
