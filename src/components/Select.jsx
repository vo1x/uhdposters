import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiX } from 'react-icons/fi';

const Select = ({ placeHolder, options, onChange, defaultValue, className }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
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
    setValSelected(true);
    onChange(option);
  };

  const [valSelected, setValSelected] = useState(false);

  const onOptionClear = () => {
    setSelectedValue(defaultValue);
    setValSelected(false);
    onChange(defaultValue);
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
    <div className={`z-50`}>
      <div
        ref={inputRef}
        onClick={handleInputClick}
        className={`flex w-40 cursor-pointer text-slate-400 shadow-md shadow-slate-950/25 ${showMenu ? 'border-blue-700' : ''} items-center justify-between ${className} bg-slate-800 p-2`}
      >
        <div className="">{getDisplay()}</div>
        <div className="dropdown-tools ">
          <div className="flex items-center justify-between ">
            {selectedValue.value !== defaultValue.value && valSelected ? (
              <button onClick={() => onOptionClear()}>
                <FiX />
              </button>
            ) : (
              <AnimatePresence>
                {showMenu ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 180 }}
                    transition={{ type: 'tween', duration: 0.2 }}
                    exit={{ rotate: 0 }}
                  >
                    <FiChevronDown />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ rotate: 180 }}
                    animate={{ rotate: 0 }}
                    transition={{ type: 'tween', duration: 0.2 }}
                    exit={{ rotate: 180 }}
                  >
                    <FiChevronDown />
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'tween', duration: 0.2 }}
            exit={{ opacity: 0, scale: 0 }}
            className=""
          >
            <div className="absolute mt-2 h-max max-h-96 w-40 overflow-auto rounded-md border border-slate-700 bg-slate-800 p-2 shadow-md shadow-black drop-shadow-md">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
