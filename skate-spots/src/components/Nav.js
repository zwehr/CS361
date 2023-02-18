import { NavLink } from 'react-router-dom'
import '../styles/Nav.css'

export default function Nav() {
  return (
    <nav className='Nav'>
      <h1 className='app-name'>Skate Spots App</h1>
      <NavLink to='/'>Home (Map)</NavLink>
      <NavLink to='/spots-list'>Spots List</NavLink>
      <NavLink to='/add-spot'>Add Spot</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/sign-up'>Sign Up</NavLink>
    </nav>
  )
}