import logo from './logo.svg';
import './App.css';
import { Articles } from './components/Articles'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { SingleArticle } from './components/SingleArticle'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Routes>
        <Route path='/' element={<Articles />} />
        <Route path='/articles' element={<Articles />} />
        <Route path='/articles/:article_id' element={<SingleArticle />} />
      </Routes>
    </div>
  );
}

export default App;
