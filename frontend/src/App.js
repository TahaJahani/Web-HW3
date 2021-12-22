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
import Note from './components/Note';
import RegisterPage from './pages/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/notes" element={<Note title="sample title" body="sample body" color="#ffffff" />} />
      </Routes>
    </Router>
  );
}

export default App;
