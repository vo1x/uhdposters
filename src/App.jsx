import Search from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailsPage from './pages/DetailsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();
import axios from 'axios';
axios.defaults.baseURL = 'https://uhdpjs.vercel.app';
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/details/:mediaType/:id" element={<DetailsPage />} />
          </Routes>
        </Router>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
