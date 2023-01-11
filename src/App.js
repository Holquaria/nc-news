import logo from './logo.svg';
import './App.css';
import { Articles } from './components/Articles'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { SingleArticle } from './components/SingleArticle'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Navigation />
      <Routes>
        <Route path='/' element={<Articles />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:article_id' element={<SingleArticle loggedIn={loggedIn} />}  />
        <Route path='topics/:topic/articles' element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
