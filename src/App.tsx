import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Home = () => {
  return <h2>Accueil</h2>;
};

const About = () => {
  return <h2>À propos</h2>;
};

const Contact = () => {
  return <h2>Contact</h2>;
};

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/about">À propos</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
