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
    const handleKeyDown = (e) => {
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
      <div className="sticky top-0 z-50 flex justify-between bg-slate-900/90 p-3 px-10 backdrop-blur-xl">
        <Header></Header>
        <div
          onClick={() => setIsOpen(true)}
          className="relative flex cursor-pointer w-44 items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 p-1 text-slate-400"
        >
          <button className="absolute right-1 top-1/2 flex -translate-y-1/2 transform items-center justify-center rounded-lg border  border-slate-600 bg-slate-800/50 px-1 py-1 text-xs font-semibold text-slate-300">
            <span>CTRL + K</span>
          </button>
          <span>
            <Search size={20} />
          </span>
          <span>Search...</span>
        </div>
      </div>
      {isOpen && <SearchModal onChange={setIsOpen} />}
    </>
  );
}

export default Topbar;
