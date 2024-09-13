import Search from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Details from './pages/Details';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();
import axios from 'axios';
axios.defaults.baseURL = 'https://uhdpjs.vercel.app';
// axios.defaults.baseURL = 'http://localhost:8080';


function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search/:searchTerm" element={<Search />} />
            <Route path="/details/:mediaType/:id" element={<Details />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
