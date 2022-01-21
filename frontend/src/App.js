import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/login.js'
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { RecoilRoot,} from 'recoil';
import NotesPage from './pages/notes';
import ErrorPage from './pages/error';

function App() {

  return (
    <RecoilRoot>
      <Router sx={{height: '100%'}}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
