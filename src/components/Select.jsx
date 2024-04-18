import { useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
const Icon = ({ isOpen }) => {
  return <FiChevronDown className={isOpen ? ' rotate-180' : ''} />;
};

const CustomSelect = ({ placeHolder, options, onChange, isDisabled }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const inputRef = useRef();

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

  const getOptions = () => {
    return options;
  };

  return (
    <div className="z-50 rounded-md">
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
