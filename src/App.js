import logo from './logo.svg';
import './App.css';
import { Articles } from './components/Articles'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <Articles />
      <Routes>
        <Route path='/articles' element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
