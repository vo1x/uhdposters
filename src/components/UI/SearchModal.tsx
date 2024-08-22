import { useEffect, useRef, useState } from 'react';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchModal: React.FC<{
  onChange: ((value: string | boolean) => void) | Dispatch<SetStateAction<boolean>>;
}> = ({ onChange }) => {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleEscButton = () => {
    onChange(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === 'Escape') {
        handleEscButton();
      }
    };
    if (inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key="search-modal"
        className="fixed inset-0 z-50 flex h-screen items-start justify-center overflow-hidden bg-black bg-opacity-50 backdrop-blur-md  backdrop-filter"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          key="search-content"
          className="min-w-xl max-h-3/4 mt-20 flex w-full max-w-xl flex-col gap-1  overflow-hidden rounded-lg p-1"
        >
          <div className="relative">
            <button
              onClick={() => handleEscButton()}
              className="absolute right-5 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-md border border-slate-600 bg-slate-800/50 px-2 py-1 text-sm font-semibold text-slate-300"
            >
              <span>esc</span>
            </button>

            <div className="absolute left-2 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-md bg-slate-900  px-2 py-1 text-sm font-semibold text-slate-400">
              <Search />
            </div>

            <motion.input
              ref={inputRef}
              type="text"
              placeholder="Search movie or series"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (inputText.trim() !== '') {
                    navigate(`/search/${inputText}`);
                  }
                }
              }}
              className="w-full rounded-md border border-slate-600 bg-slate-900 p-4 pl-12  text-xl text-slate-300 placeholder-slate-500 shadow-md shadow-black/75 outline-none"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
