import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/login.js'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
