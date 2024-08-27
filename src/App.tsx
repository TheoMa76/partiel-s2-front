import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetails from './components/molecules/MovieDetails/MovieDetails';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


const App: React.FC = () => {
  return (
    <>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
