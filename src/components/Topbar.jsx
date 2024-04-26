import Header from './Header';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
function Topbar() {
  return (
    <div className="absolute flex justify-between p-5 px-10">
      <Header></Header>
      <SearchBar></SearchBar>
    </div>
  );
}

export default Topbar;
