import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDebounce } from 'use-debounce';

function SearchBar({ defaultValue, setInputValue }) {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState(defaultValue);
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
      <div className={'flex items-center justify-center shadow-md shadow-slate-950/25 '}>
        <input
          type="text"
          placeholder="Search movie or series"
          defaultValue={value}
          onChange={(e) => {
            setInputText(e.target.value);
            setInputValue(e.target.value);
          }}
          className="rounded-md bg-slate-800 p-2 text-slate-300 placeholder-slate-500 outline-none"
        />
      </div>
    </div>
  );
}

export default SearchBar;
