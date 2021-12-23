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
import { RecoilRoot,} from 'recoil';
import Note from './components/Note';
import RegisterPage from './pages/register';
import NotesPage from './pages/notes';

function App() {

  return (
    <RecoilRoot>
      <Router sx={{height: '100%'}}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/notes" element={<NotesPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
