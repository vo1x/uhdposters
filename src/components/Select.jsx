import React, { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
// Icon component
const Icon = ({ isOpen }) => {
  return <FiChevronDown className={isOpen ? ' rotate-180' : ''} />;
};

// CloseIcon component
const CloseIcon = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};

// CustomSelect component
const CustomSelect = ({ placeHolder, options, onChange, align }) => {
  // State variables using React hooks
  const [showMenu, setShowMenu] = useState(false); // Controls the visibility of the dropdown menu
  const [selectedValue, setSelectedValue] = useState(options[0]); // Stores the selected value(s)
  const [searchValue, setSearchValue] = useState(''); // Stores the value entered in the search input
  const searchRef = useRef(); // Reference to the search input element
  const inputRef = useRef(); // Reference to the custom select input element

  useEffect(() => {
    setSearchValue('');
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener('click', handler);
    return () => {
      window.removeEventListener('click', handler);
    };
  });

  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  };

  const getDisplay = () => {
    if (!selectedValue || selectedValue.length === 0) {
      return placeHolder;
    }

    return selectedValue.label;
  };

  const removeOption = (option) => {
    return selectedValue.filter((o) => o.value !== option.value);
  };

  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);
    setSelectedValue(newValue);
    onChange(newValue);
  };

  const onItemClick = (option) => {
    setSelectedValue(option);
    onChange(option);
  };

  const isSelected = (option) => {
    if (!selectedValue) {
      return false;
    }

    return showMenu && selectedValue.value === option.value;
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }

    return options.filter(
      (option) => option.label.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
    );
  };

  return (
    <div className=" rounded-md p-2">
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className={`flex w-40 border-2 border-slate-700 ${showMenu ? 'border-blue-700' : ''} items-center justify-between rounded-md bg-slate-800 p-2`}
      >
        <div className="text-slate-400">{getDisplay()}</div>
        <div className="dropdown-tools ">
          <div className="dropdown-tool">
            <Icon isOpen={showMenu} />
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="">
          <div className="absolute mt-1 h-max w-40 rounded-md border border-slate-700 bg-slate-800 p-2 drop-shadow-md">
            {getOptions().map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option.value}
                className={`mb-2 cursor-pointer rounded-md p-1 text-slate-300 ${isSelected(option) ? 'border border-slate-600 bg-slate-700' : 'text-slate-400 hover:bg-slate-700/50 '}`}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
