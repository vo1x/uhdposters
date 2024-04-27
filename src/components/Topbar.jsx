import { useState } from 'react';
import Header from './Header';
import { Search } from 'lucide-react';
import SearchModal from './SearchModal';
function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="sticky top-0 z-50 flex justify-between bg-slate-900/90 p-3 px-10 backdrop-blur-xl">
        <Header></Header>
        <button
          onClick={() => setIsOpen(true)}
          className="flex w-40 items-center gap-2 rounded-xl border border-slate-600 bg-slate-800 p-1 text-slate-400"
        >
          <span>
            <Search size={20} />
          </span>
          <span>Search...</span>
        </button>
      </div>
      {isOpen && <SearchModal onChange={setIsOpen} />}
    </>
  );
}

export default Topbar;
