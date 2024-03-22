import Header from './Header';
import SearchBar from './SearchBar';

function Topbar() {
  return (
    <div className="flex justify-between p-5 px-10">
      <Header></Header>
      <SearchBar></SearchBar>
    </div>
  );
}

export default Topbar;
