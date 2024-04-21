import Search from './pages/Search';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailsPage from './pages/DeatilsPage';
import Home from './pages/Home';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Search/>} />
          <Route path="/search/:searchTerm" element={<Search />} />
          <Route path="/details/:mediaType/:id" element={<DetailsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
