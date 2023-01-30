import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddSpot from './components/AddSpot'
import Nav from './components/Nav'
import SpotsMap from './components/SpotsMap'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Account from './components/Account'
import SpotsList from './components/SpotsList'
import './App.css'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  return (
    <div className='App'>
      <h1>Skate Spots App</h1>
      <BrowserRouter>
        <Nav />
        <AuthContextProvider>
          <Routes>
            <Route path='/' element={<SpotsMap />} />
            <Route path='/add-spot' element={<AddSpot />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/account' element={<Account />} />
            <Route path='/spots-list' element={<SpotsList />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div >
  );
}

export default App;
