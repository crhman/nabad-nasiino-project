import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import StressTools from './pages/StressTools';
import Breathing from './pages/Breathing';
import Journal from './pages/Journal';
import Audio from './pages/Audio';
import Quotes from './pages/Quotes';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stress-tools" element={<StressTools />} />
              <Route path="/breathing" element={<Breathing />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/audio" element={<Audio />} />
              <Route path="/quotes" element={<Quotes />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
