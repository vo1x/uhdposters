import Search from './components/Search';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailsPage from './components/DeatilsPage';
import Home from './components/Home';

function App() {
  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/details/:mediaType/:id" element={<DetailsPage />} />
          </Routes>
        </Router>
    </>
  );
}

export default App;
