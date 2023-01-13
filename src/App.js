import logo from './logo.svg';
import './App.css';
import { Articles } from './components/Articles'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { SingleArticle } from './components/SingleArticle'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import { ErrorPage } from './components/404';
import { useContext } from 'react'
import { UserContext } from './context/User';

function App() {



  return (
    <div className="App">
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<Articles />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:article_id' element={<SingleArticle />}  />
        <Route path='topics/:topic/articles' element={<Articles />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
