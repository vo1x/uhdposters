import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDebounce } from 'use-debounce';

function SearchBar({ defaultValue }) {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState(defaultValue);
  const [inputActive, setInputActive] = useState(false);
  const [value] = useDebounce(inputText, 1000);

  useEffect(() => {
    if (!inputText || inputText.trim() === '') {
      navigate('/');
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
        className={'flex items-center justify-center ' + (inputActive ? 'rounded-md ring-2' : '')}
      >
        <input
          type="text"
          placeholder="Search movie or series"
          defaultValue={value}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          onFocus={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          className="rounded-md bg-slate-800 p-2 text-slate-300 placeholder-slate-500 outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
