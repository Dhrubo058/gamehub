import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { Browse } from './pages/Browse';
import { Play } from './pages/Play';
import { Disclaimer } from './pages/Disclaimer';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-retro-bg">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/play/:gamename" element={<Play />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
