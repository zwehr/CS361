import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddSpot from './components/AddSpot'
import Nav from './components/Nav'
import SpotsMap from './components/SpotsMap'
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <div className='App'>
      <h1>Skate Spots App</h1>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<SpotsMap />} />
          <Route path="/add-spot" element={<AddSpot />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
