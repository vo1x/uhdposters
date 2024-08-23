import { useEffect, useState } from 'react';
import Header from './Header';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';

function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleShortcut = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.ctrlKey === true && e.key === 'k') {
        e.preventDefault();
        handleShortcut();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between bg-slate-900/90 p-3 px-4 md:px-6 lg:px-10 backdrop-blur-xl">
        <Header />

        <div
          onClick={() => setIsOpen(true)}
          className="w-max md:w-48 relative flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 p-2 text-slate-400 cursor-pointer"
        >
          <button className="absolute right-2 top-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-600 bg-slate-800/50 px-2 py-1 text-xs font-semibold text-slate-300 hidden md:flex">
            <span>CTRL + K</span>
          </button>
          <span className="flex-shrink-0">
            <Search size={20} />
          </span>
          <span className="hidden md:inline">Search...</span>
        </div>
      </div>
      {isOpen && <SearchModal onChange={setIsOpen} />}
    </>
  );
}

export default Topbar;
